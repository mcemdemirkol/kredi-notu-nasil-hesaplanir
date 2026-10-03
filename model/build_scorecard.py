"""Kredi skorkartı: WoE/IV -> lojistik regresyon -> puan tablosu.

Girdi : data/default of credit card clients.xls  (UCI, Yeh 2009, CC BY 4.0)
Çıktı : docs/scorecard.js  (site bu dosyayı okur)

Çalıştırma:  python model/build_scorecard.py
"""
from __future__ import annotations

import json
import sys
from datetime import date
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score, roc_curve
from sklearn.model_selection import train_test_split

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "default of credit card clients.xls"
OUT = ROOT / "docs" / "scorecard.js"

SEED = 42
TARGET = "default payment next month"
PAY_COLS = ["PAY_0", "PAY_2", "PAY_3", "PAY_4", "PAY_5", "PAY_6"]
BILL_COLS = [f"BILL_AMT{i}" for i in range(1, 7)]
PAID_COLS = [f"PAY_AMT{i}" for i in range(1, 7)]

# Ölçekleme (Siddiqi): 50:1 iyi/kötü oranı = 600 puan, her 20 puanda oran ikiye katlanır.
BASE_SCORE, BASE_ODDS, PDO = 600, 50, 20
FACTOR = PDO / np.log(2)
OFFSET = BASE_SCORE - FACTOR * np.log(BASE_ODDS)

INF = float("inf")

# Limitler veride Yeni Tayvan doları (NT$). Etiketler okunabilirlik için TL'ye çevrilir;
# gruplar NT$ sınırlarıyla aynı kalır. Kur: 3 Ekim 2026, open.er-api.com.
NT_TO_TL, FX_DATE = 1.54, "2026-10-03"
LIMIT_EDGES_NT = [30e3, 50e3, 100e3, 200e3, 300e3]


def _limit_labels() -> list[str]:
    tl = [int(round(e * NT_TO_TL / 5000) * 5) for e in LIMIT_EDGES_NT]  # bin TL, 5 bine yuvarlı
    mid = [f"{a}–{b} bin TL" for a, b in zip(tl, tl[1:])]
    return [f"{tl[0]} bin TL'ye kadar", *mid, f"{tl[-1]} bin TL'den fazla"]


# Grupların etiketleri ve sırası (tek kaynak).
ORDERS = {
    "pay_last": ["Kart kullanılmadı", "Tamamı ödendi", "Asgari ödendi, borç devretti", "1 ay gecikme", "2+ ay gecikme"],
    "n_delay": ["Hiç", "1 ay", "2 ay", "3–5 ay", "6 ayın tamamı"],
    "util": ["Borç yok", "%0–5", "%5–30", "%30–60", "%60–100", "Limit aşıldı"],
    "pay_ratio": ["Ekstre borcu yok", "%4'ten az", "%4–10", "%10–30", "%30–99", "Tamamı veya fazlası"],
    "limit": _limit_labels(),
    "age": ["25 ve altı", "26–30", "31–40", "41–50", "50 üstü"],
    "education": ["Lisansüstü", "Üniversite", "Lise", "Diğer"],
    "sex": ["Kadın", "Erkek"],
    "marriage": ["Evli", "Bekâr", "Diğer"],
}


def cut(series: pd.Series, edges: list[float], labels: list[str]) -> pd.Series:
    """Sağdan kapalı aralıklarla gruplar: (e0, e1], (e1, e2], ..."""
    return pd.cut(series, edges, labels=labels).astype(object)


def build_features(df: pd.DataFrame) -> pd.DataFrame:
    """Ham sütunlardan gruplanmış (kategorik) skorkart değişkenleri üretir."""
    f = pd.DataFrame(index=df.index)

    f["pay_last"] = cut(df["PAY_0"], [-INF, -2, -1, 0, 1, INF], ORDERS["pay_last"])

    n_delay = (df[PAY_COLS] >= 1).sum(axis=1)
    f["n_delay"] = cut(n_delay, [-INF, 0, 1, 2, 5, INF], ORDERS["n_delay"])

    # Tek aylık oran, ödeme oranıyla aynı bilgiyi taşıyıp ters işaretli katsayı verdi; 6 ay ortalaması kullanılır.
    util = df[BILL_COLS].clip(lower=0).mean(axis=1) / df["LIMIT_BAL"]
    f["util"] = cut(util, [-INF, 0, 0.05, 0.30, 0.60, 1.00, INF], ORDERS["util"])

    # PAY_AMT(k) ödemesi BILL_AMT(k+1) ekstresine karşılık yapılır.
    billed = df[BILL_COLS[1:]].clip(lower=0).sum(axis=1)
    paid = df[PAID_COLS[:5]].sum(axis=1)
    ratio = (paid / billed.where(billed > 0)).fillna(-1)  # -1: ödenecek ekstre yok
    f["pay_ratio"] = cut(ratio, [-INF, -0.5, 0.04, 0.10, 0.30, 0.99, INF], ORDERS["pay_ratio"])

    f["limit"] = cut(df["LIMIT_BAL"], [-INF, *LIMIT_EDGES_NT, INF], ORDERS["limit"])

    # Demografik adaylar: IV'leri raporlanır, modele alınmaz.
    f["age"] = cut(df["AGE"], [-INF, 25, 30, 40, 50, INF], ORDERS["age"])
    f["education"] = df["EDUCATION"].map({1: "Lisansüstü", 2: "Üniversite", 3: "Lise"}).fillna("Diğer")
    f["sex"] = df["SEX"].map({1: "Erkek", 2: "Kadın"})
    f["marriage"] = df["MARRIAGE"].map({1: "Evli", 2: "Bekâr"}).fillna("Diğer")
    return f


FEATURES = {
    # anahtar: (etiket, Findeks bileşeni, modele girer mi, açıklama)
    "pay_last": ("Son ay ödeme durumu", "Ödeme alışkanlıkları", True, "Eylül 2005 ekstresinin ödeme durumu"),
    "n_delay": ("Son 6 ayda gecikmeli ay", "Ödeme alışkanlıkları", True, "Nisan–Eylül 2005 arasında gecikmede geçen ay sayısı"),
    "pay_ratio": ("Ödenen / ekstre", "Ödeme alışkanlıkları", True, "Son 5 ayda yapılan ödemelerin ekstre toplamına oranı"),
    "util": ("Ortalama limit kullanımı", "Kredi kullanım yoğunluğu", True, "Son 6 ekstrenin ortalaması / kart limiti"),
    "limit": ("Kart limiti", "Mevcut hesap ve borç durumu", True, "Bankanın tanıdığı toplam limit, yaklaşık TL karşılığı"),
    "age": ("Yaş", "Demografik", False, "Modele alınmadı"),
    "education": ("Eğitim", "Demografik", False, "Modele alınmadı"),
    "sex": ("Cinsiyet", "Demografik", False, "Modele alınmadı"),
    "marriage": ("Medeni durum", "Demografik", False, "Modele alınmadı"),
}


def woe_table(x: pd.Series, y: pd.Series, order: list[str]) -> pd.DataFrame:
    """WoE = ln(iyi payı / kötü payı); pozitif WoE düşük risk demektir."""
    t = pd.crosstab(x, y).rename(columns={0: "good", 1: "bad"})
    t = t.loc[order]
    t["n"] = t["good"] + t["bad"]
    t["bad_rate"] = t["bad"] / t["n"]
    t["pct_good"] = t["good"] / t["good"].sum()
    t["pct_bad"] = t["bad"] / t["bad"].sum()
    t["woe"] = np.log(t["pct_good"] / t["pct_bad"])
    t["iv"] = (t["pct_good"] - t["pct_bad"]) * t["woe"]
    return t


def ks_stat(y: np.ndarray, p: np.ndarray) -> float:
    fpr, tpr, _ = roc_curve(y, p)
    return float(np.max(tpr - fpr))


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")  # Windows konsolunda Türkçe çıktı
    raw = pd.read_excel(DATA, header=1)
    y = raw[TARGET].astype(int)
    X = build_features(raw)

    tr, te = train_test_split(raw.index, test_size=0.30, stratify=y, random_state=SEED)

    # 1) WoE / IV (yalnız eğitim verisinden)
    tables = {k: woe_table(X.loc[tr, k], y.loc[tr], ORDERS[k]) for k in FEATURES}
    model_keys = [k for k, v in FEATURES.items() if v[2]]

    # 2) WoE dönüşümü + lojistik regresyon (hedef: temerrüt = 1)
    W = pd.DataFrame({k: X[k].map(tables[k]["woe"]) for k in model_keys})
    lr = LogisticRegression(C=1e6, max_iter=1000)
    lr.fit(W.loc[tr], y.loc[tr])
    coef = dict(zip(model_keys, lr.coef_[0]))
    b0 = float(lr.intercept_[0])
    assert all(c < 0 for c in coef.values()), f"işaret tutarsızlığı: {coef}"

    p_tr = lr.predict_proba(W.loc[tr])[:, 1]
    p_te = lr.predict_proba(W.loc[te])[:, 1]

    # 3) Puana çevirme: skor = OFFSET + FACTOR * ln(iyi/kötü)
    n = len(model_keys)
    base_pts = (OFFSET - FACTOR * b0) / n
    points = {k: (base_pts - FACTOR * coef[k] * tables[k]["woe"]).round().astype(int) for k in model_keys}
    score = sum(X[k].map(points[k]) for k in model_keys).astype(int)

    # 4) Kıyas: ham değişkenlerle gradient boosting (demografikler hariç)
    raw_cols = ["LIMIT_BAL"] + PAY_COLS + BILL_COLS + PAID_COLS
    gb = HistGradientBoostingClassifier(random_state=SEED)
    gb.fit(raw.loc[tr, raw_cols], y.loc[tr])
    auc_gb = roc_auc_score(y.loc[te], gb.predict_proba(raw.loc[te, raw_cols])[:, 1])

    auc_tr, auc_te = roc_auc_score(y.loc[tr], p_tr), roc_auc_score(y.loc[te], p_te)
    auc_score = roc_auc_score(y.loc[te], -score.loc[te])  # yuvarlanmış puanların gücü

    # ROC (test) — çizim için seyrelt
    fpr, tpr, _ = roc_curve(y.loc[te], p_te)
    idx = np.unique(np.linspace(0, len(fpr) - 1, 80).round().astype(int))
    roc = [[round(float(fpr[i]), 4), round(float(tpr[i]), 4)] for i in idx]

    # Skor dağılımı (test): iyi ve kötü müşteriler ayrı
    s_te, y_te = score.loc[te], y.loc[te]
    lo, hi = int(np.floor(s_te.min() / 10) * 10), int(np.ceil((s_te.max() + 1) / 10) * 10)
    edges = np.arange(lo, hi + 1, 10)
    h_good, _ = np.histogram(s_te[y_te == 0], edges)
    h_bad, _ = np.histogram(s_te[y_te == 1], edges)
    dist = {
        "edges": edges.tolist(),
        "good": (h_good / h_good.sum()).round(4).tolist(),
        "bad": (h_bad / h_bad.sum()).round(4).tolist(),
    }

    # Skor bantları (test): gözlenen temerrüt oranı ile skorun ima ettiği olasılık
    band = pd.qcut(s_te, 8, duplicates="drop")
    implied = 1 / (1 + np.exp((s_te - OFFSET) / FACTOR))
    bands = [
        {
            "lo": int(s_te[band == b].min()), "hi": int(s_te[band == b].max()),
            "n": int((band == b).sum()),
            "bad_rate": round(float(y_te[band == b].mean()), 4),
            "implied": round(float(implied[band == b].mean()), 4),
        }
        for b in band.cat.categories
    ]

    features = []
    for k, (label, comp, in_model, desc) in FEATURES.items():
        t = tables[k]
        features.append({
            "key": k, "label": label, "component": comp, "in_model": in_model, "desc": desc,
            "iv": round(float(t["iv"].sum()), 5),
            "coef": round(float(coef[k]), 4) if in_model else None,
            "bins": [
                {
                    "label": str(b), "n": int(r.n), "good": int(r.good), "bad": int(r.bad),
                    "bad_rate": round(float(r.bad_rate), 4),
                    "pct_good": round(float(r.pct_good), 4), "pct_bad": round(float(r.pct_bad), 4),
                    "woe": round(float(r.woe), 4), "iv": round(float(r.iv), 4),
                    "points": int(points[k][b]) if in_model else None,
                }
                for b, r in t.iterrows()
            ],
        })

    out = {
        "meta": {
            "built": date.today().isoformat(), "seed": SEED,
            "n": int(len(raw)), "n_train": int(len(tr)), "n_test": int(len(te)),
            "bad_rate": round(float(y.mean()), 4),
            "dataset": "Default of Credit Card Clients (Yeh, 2009), UCI ML Repository, CC BY 4.0",
            "doi": "https://doi.org/10.24432/C55S3H",
            "nt_to_tl": NT_TO_TL, "fx_date": FX_DATE,
            "limit_edges_nt": [int(e) for e in LIMIT_EDGES_NT],
        },
        "scaling": {
            "base_score": BASE_SCORE, "base_odds": BASE_ODDS, "pdo": PDO,
            "factor": round(float(FACTOR), 4), "offset": round(float(OFFSET), 4),
            "intercept": round(b0, 4), "base_points": round(float(base_pts), 2),
            "score_min": int(sum(points[k].min() for k in model_keys)),
            "score_max": int(sum(points[k].max() for k in model_keys)),
            "findeks_range": [1, 1900],
        },
        "features": features,
        "metrics": {
            "auc_train": round(float(auc_tr), 5), "auc_test": round(float(auc_te), 5),
            "gini_train": round(float(2 * auc_tr - 1), 5), "gini_test": round(float(2 * auc_te - 1), 5),
            "ks_train": round(ks_stat(y.loc[tr].values, p_tr), 5), "ks_test": round(ks_stat(y.loc[te].values, p_te), 5),
            "auc_points_test": round(float(auc_score), 5),
            "auc_gb_test": round(float(auc_gb), 5), "gini_gb_test": round(float(2 * auc_gb - 1), 5),
        },
        "roc": roc, "dist": dist, "bands": bands,
        "score_stats": {
            "mean": round(float(s_te.mean()), 1), "median": int(s_te.median()),
            "p10": int(s_te.quantile(0.10)), "p90": int(s_te.quantile(0.90)),
        },
    }

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text("window.SCORECARD = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")

    print(f"temerrüt oranı {y.mean():.4f} | eğitim {len(tr)} test {len(te)}")
    for f in features:
        print(f"  IV {f['iv']:.3f}  {'*' if f['in_model'] else ' '} {f['label']}")
    print("katsayılar", {k: round(v, 3) for k, v in coef.items()}, "sabit", round(b0, 3))
    m = out["metrics"]
    print(f"Gini eğitim {m['gini_train']:.3f} test {m['gini_test']:.3f} | KS test {m['ks_test']:.3f} | GB Gini test {m['gini_gb_test']:.3f}")
    print(f"puan aralığı {out['scaling']['score_min']}–{out['scaling']['score_max']} | yazıldı: {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

window.SCORECARD = {
 "meta": {
  "built": "2026-10-03",
  "seed": 42,
  "n": 30000,
  "n_train": 21000,
  "n_test": 9000,
  "bad_rate": 0.2212,
  "dataset": "Default of Credit Card Clients (Yeh, 2009), UCI ML Repository, CC BY 4.0",
  "doi": "https://doi.org/10.24432/C55S3H",
  "nt_to_tl": 1.54,
  "fx_date": "2026-10-03",
  "limit_edges_nt": [
   30000,
   50000,
   100000,
   200000,
   300000
  ]
 },
 "scaling": {
  "base_score": 600,
  "base_odds": 50,
  "pdo": 20,
  "factor": 28.8539,
  "offset": 487.1229,
  "intercept": -1.2524,
  "base_points": 104.65,
  "score_min": 440,
  "score_max": 560,
  "findeks_range": [
   1,
   1900
  ]
 },
 "features": [
  {
   "key": "pay_last",
   "label": "Son ay ödeme durumu",
   "component": "Ödeme alışkanlıkları",
   "in_model": true,
   "desc": "Eylül 2005 ekstresinin ödeme durumu",
   "iv": 0.89395,
   "coef": -0.5845,
   "bins": [
    {
     "label": "Kart kullanılmadı",
     "n": 1933,
     "good": 1689,
     "bad": 244,
     "bad_rate": 0.1262,
     "pct_good": 0.1033,
     "pct_bad": 0.0525,
     "woe": 0.676,
     "iv": 0.0343,
     "points": 116
    },
    {
     "label": "Tamamı ödendi",
     "n": 3971,
     "good": 3297,
     "bad": 674,
     "bad_rate": 0.1697,
     "pct_good": 0.2016,
     "pct_bad": 0.1451,
     "woe": 0.3288,
     "iv": 0.0186,
     "points": 110
    },
    {
     "label": "Asgari ödendi, borç devretti",
     "n": 10285,
     "good": 8985,
     "bad": 1300,
     "bad_rate": 0.1264,
     "pct_good": 0.5494,
     "pct_bad": 0.2799,
     "woe": 0.6744,
     "iv": 0.1818,
     "points": 116
    },
    {
     "label": "1 ay gecikme",
     "n": 2616,
     "good": 1721,
     "bad": 895,
     "bad_rate": 0.3421,
     "pct_good": 0.1052,
     "pct_bad": 0.1927,
     "woe": -0.6049,
     "iv": 0.0529,
     "points": 94
    },
    {
     "label": "2+ ay gecikme",
     "n": 2195,
     "good": 663,
     "bad": 1532,
     "bad_rate": 0.6979,
     "pct_good": 0.0405,
     "pct_bad": 0.3298,
     "woe": -2.0963,
     "iv": 0.6064,
     "points": 69
    }
   ]
  },
  {
   "key": "n_delay",
   "label": "Son 6 ayda gecikmeli ay",
   "component": "Ödeme alışkanlıkları",
   "in_model": true,
   "desc": "Nisan–Eylül 2005 arasında gecikmede geçen ay sayısı",
   "iv": 0.88847,
   "coef": -0.4842,
   "bins": [
    {
     "label": "Hiç",
     "n": 13910,
     "good": 12317,
     "bad": 1593,
     "bad_rate": 0.1145,
     "pct_good": 0.7531,
     "pct_bad": 0.3429,
     "woe": 0.7866,
     "iv": 0.3226,
     "points": 116
    },
    {
     "label": "1 ay",
     "n": 3109,
     "good": 2178,
     "bad": 931,
     "bad_rate": 0.2995,
     "pct_good": 0.1332,
     "pct_bad": 0.2004,
     "woe": -0.4088,
     "iv": 0.0275,
     "points": 99
    },
    {
     "label": "2 ay",
     "n": 1339,
     "good": 808,
     "bad": 531,
     "bad_rate": 0.3966,
     "pct_good": 0.0494,
     "pct_bad": 0.1143,
     "woe": -0.8389,
     "iv": 0.0545,
     "points": 93
    },
    {
     "label": "3–5 ay",
     "n": 1704,
     "good": 769,
     "bad": 935,
     "bad_rate": 0.5487,
     "pct_good": 0.047,
     "pct_bad": 0.2013,
     "woe": -1.4542,
     "iv": 0.2243,
     "points": 84
    },
    {
     "label": "6 ayın tamamı",
     "n": 938,
     "good": 283,
     "bad": 655,
     "bad_rate": 0.6983,
     "pct_good": 0.0173,
     "pct_bad": 0.141,
     "woe": -2.0979,
     "iv": 0.2595,
     "points": 75
    }
   ]
  },
  {
   "key": "pay_ratio",
   "label": "Ödenen / ekstre",
   "component": "Ödeme alışkanlıkları",
   "in_model": true,
   "desc": "Son 5 ayda yapılan ödemelerin ekstre toplamına oranı",
   "iv": 0.14636,
   "coef": -0.1506,
   "bins": [
    {
     "label": "Ekstre borcu yok",
     "n": 971,
     "good": 677,
     "bad": 294,
     "bad_rate": 0.3028,
     "pct_good": 0.0414,
     "pct_bad": 0.0633,
     "woe": -0.4247,
     "iv": 0.0093,
     "points": 103
    },
    {
     "label": "%4'ten az",
     "n": 2861,
     "good": 1919,
     "bad": 942,
     "bad_rate": 0.3293,
     "pct_good": 0.1173,
     "pct_bad": 0.2028,
     "woe": -0.5472,
     "iv": 0.0468,
     "points": 102
    },
    {
     "label": "%4–10",
     "n": 6969,
     "good": 5191,
     "bad": 1778,
     "bad_rate": 0.2551,
     "pct_good": 0.3174,
     "pct_bad": 0.3828,
     "woe": -0.1873,
     "iv": 0.0122,
     "points": 104
    },
    {
     "label": "%10–30",
     "n": 2669,
     "good": 2183,
     "bad": 486,
     "bad_rate": 0.1821,
     "pct_good": 0.1335,
     "pct_bad": 0.1046,
     "woe": 0.2435,
     "iv": 0.007,
     "points": 106
    },
    {
     "label": "%30–99",
     "n": 3460,
     "good": 2874,
     "bad": 586,
     "bad_rate": 0.1694,
     "pct_good": 0.1757,
     "pct_bad": 0.1262,
     "woe": 0.3314,
     "iv": 0.0164,
     "points": 106
    },
    {
     "label": "Tamamı veya fazlası",
     "n": 4070,
     "good": 3511,
     "bad": 559,
     "bad_rate": 0.1373,
     "pct_good": 0.2147,
     "pct_bad": 0.1203,
     "woe": 0.5788,
     "iv": 0.0546,
     "points": 107
    }
   ]
  },
  {
   "key": "util",
   "label": "Ortalama limit kullanımı",
   "component": "Kredi kullanım yoğunluğu",
   "in_model": true,
   "desc": "Son 6 ekstrenin ortalaması / kart limiti",
   "iv": 0.12192,
   "coef": -0.2878,
   "bins": [
    {
     "label": "Borç yok",
     "n": 665,
     "good": 431,
     "bad": 234,
     "bad_rate": 0.3519,
     "pct_good": 0.0264,
     "pct_bad": 0.0504,
     "woe": -0.648,
     "iv": 0.0156,
     "points": 99
    },
    {
     "label": "%0–5",
     "n": 5534,
     "good": 4550,
     "bad": 984,
     "bad_rate": 0.1778,
     "pct_good": 0.2782,
     "pct_bad": 0.2118,
     "woe": 0.2725,
     "iv": 0.0181,
     "points": 107
    },
    {
     "label": "%5–30",
     "n": 4484,
     "good": 3796,
     "bad": 688,
     "bad_rate": 0.1534,
     "pct_good": 0.2321,
     "pct_bad": 0.1481,
     "woe": 0.4492,
     "iv": 0.0377,
     "points": 108
    },
    {
     "label": "%30–60",
     "n": 3845,
     "good": 3003,
     "bad": 842,
     "bad_rate": 0.219,
     "pct_good": 0.1836,
     "pct_bad": 0.1813,
     "woe": 0.0128,
     "iv": 0.0,
     "points": 105
    },
    {
     "label": "%60–100",
     "n": 6029,
     "good": 4287,
     "bad": 1742,
     "bad_rate": 0.2889,
     "pct_good": 0.2621,
     "pct_bad": 0.375,
     "woe": -0.3582,
     "iv": 0.0404,
     "points": 102
    },
    {
     "label": "Limit aşıldı",
     "n": 443,
     "good": 288,
     "bad": 155,
     "bad_rate": 0.3499,
     "pct_good": 0.0176,
     "pct_bad": 0.0334,
     "woe": -0.6392,
     "iv": 0.0101,
     "points": 99
    }
   ]
  },
  {
   "key": "limit",
   "label": "Kart limiti",
   "component": "Mevcut hesap ve borç durumu",
   "in_model": true,
   "desc": "Bankanın tanıdığı toplam limit, yaklaşık TL karşılığı",
   "iv": 0.18392,
   "coef": -0.4486,
   "bins": [
    {
     "label": "45 bin TL'ye kadar",
     "n": 2864,
     "good": 1807,
     "bad": 1057,
     "bad_rate": 0.3691,
     "pct_good": 0.1105,
     "pct_bad": 0.2276,
     "woe": -0.7225,
     "iv": 0.0846,
     "points": 95
    },
    {
     "label": "45–75 bin TL",
     "n": 2513,
     "good": 1842,
     "bad": 671,
     "bad_rate": 0.267,
     "pct_good": 0.1126,
     "pct_bad": 0.1445,
     "woe": -0.2489,
     "iv": 0.0079,
     "points": 101
    },
    {
     "label": "75–155 bin TL",
     "n": 3347,
     "good": 2489,
     "bad": 858,
     "bad_rate": 0.2563,
     "pct_good": 0.1522,
     "pct_bad": 0.1847,
     "woe": -0.1937,
     "iv": 0.0063,
     "points": 102
    },
    {
     "label": "155–310 bin TL",
     "n": 5555,
     "good": 4460,
     "bad": 1095,
     "bad_rate": 0.1971,
     "pct_good": 0.2727,
     "pct_bad": 0.2357,
     "woe": 0.1457,
     "iv": 0.0054,
     "points": 107
    },
    {
     "label": "310–460 bin TL",
     "n": 3554,
     "good": 2999,
     "bad": 555,
     "bad_rate": 0.1562,
     "pct_good": 0.1834,
     "pct_bad": 0.1195,
     "woe": 0.4283,
     "iv": 0.0274,
     "points": 110
    },
    {
     "label": "460 bin TL'den fazla",
     "n": 3167,
     "good": 2758,
     "bad": 409,
     "bad_rate": 0.1291,
     "pct_good": 0.1686,
     "pct_bad": 0.0881,
     "woe": 0.6498,
     "iv": 0.0524,
     "points": 113
    }
   ]
  },
  {
   "key": "age",
   "label": "Yaş",
   "component": "Demografik",
   "in_model": false,
   "desc": "Modele alınmadı",
   "iv": 0.01815,
   "coef": null,
   "bins": [
    {
     "label": "25 ve altı",
     "n": 2711,
     "good": 1980,
     "bad": 731,
     "bad_rate": 0.2696,
     "pct_good": 0.1211,
     "pct_bad": 0.1574,
     "woe": -0.2623,
     "iv": 0.0095,
     "points": null
    },
    {
     "label": "26–30",
     "n": 5017,
     "good": 4002,
     "bad": 1015,
     "bad_rate": 0.2023,
     "pct_good": 0.2447,
     "pct_bad": 0.2185,
     "woe": 0.1132,
     "iv": 0.003,
     "points": null
    },
    {
     "label": "31–40",
     "n": 7520,
     "good": 5974,
     "bad": 1546,
     "bad_rate": 0.2056,
     "pct_good": 0.3653,
     "pct_bad": 0.3328,
     "woe": 0.093,
     "iv": 0.003,
     "points": null
    },
    {
     "label": "41–50",
     "n": 4187,
     "good": 3228,
     "bad": 959,
     "bad_rate": 0.229,
     "pct_good": 0.1974,
     "pct_bad": 0.2065,
     "woe": -0.045,
     "iv": 0.0004,
     "points": null
    },
    {
     "label": "50 üstü",
     "n": 1565,
     "good": 1171,
     "bad": 394,
     "bad_rate": 0.2518,
     "pct_good": 0.0716,
     "pct_bad": 0.0848,
     "woe": -0.1695,
     "iv": 0.0022,
     "points": null
    }
   ]
  },
  {
   "key": "education",
   "label": "Eğitim",
   "component": "Demografik",
   "in_model": false,
   "desc": "Modele alınmadı",
   "iv": 0.03536,
   "coef": null,
   "bins": [
    {
     "label": "Lisansüstü",
     "n": 7379,
     "good": 5942,
     "bad": 1437,
     "bad_rate": 0.1947,
     "pct_good": 0.3633,
     "pct_bad": 0.3094,
     "woe": 0.1607,
     "iv": 0.0087,
     "points": null
    },
    {
     "label": "Üniversite",
     "n": 9833,
     "good": 7513,
     "bad": 2320,
     "bad_rate": 0.2359,
     "pct_good": 0.4594,
     "pct_bad": 0.4995,
     "woe": -0.0837,
     "iv": 0.0034,
     "points": null
    },
    {
     "label": "Lise",
     "n": 3440,
     "good": 2577,
     "bad": 863,
     "bad_rate": 0.2509,
     "pct_good": 0.1576,
     "pct_bad": 0.1858,
     "woe": -0.1648,
     "iv": 0.0047,
     "points": null
    },
    {
     "label": "Diğer",
     "n": 348,
     "good": 323,
     "bad": 25,
     "bad_rate": 0.0718,
     "pct_good": 0.0197,
     "pct_bad": 0.0054,
     "woe": 1.3,
     "iv": 0.0187,
     "points": null
    }
   ]
  },
  {
   "key": "sex",
   "label": "Cinsiyet",
   "component": "Demografik",
   "in_model": false,
   "desc": "Modele alınmadı",
   "iv": 0.01042,
   "coef": null,
   "bins": [
    {
     "label": "Kadın",
     "n": 12675,
     "good": 10053,
     "bad": 2622,
     "bad_rate": 0.2069,
     "pct_good": 0.6147,
     "pct_bad": 0.5645,
     "woe": 0.0852,
     "iv": 0.0043,
     "points": null
    },
    {
     "label": "Erkek",
     "n": 8325,
     "good": 6302,
     "bad": 2023,
     "bad_rate": 0.243,
     "pct_good": 0.3853,
     "pct_bad": 0.4355,
     "woe": -0.1225,
     "iv": 0.0061,
     "points": null
    }
   ]
  },
  {
   "key": "marriage",
   "label": "Medeni durum",
   "component": "Demografik",
   "in_model": false,
   "desc": "Modele alınmadı",
   "iv": 0.00476,
   "coef": null,
   "bins": [
    {
     "label": "Evli",
     "n": 9526,
     "good": 7308,
     "bad": 2218,
     "bad_rate": 0.2328,
     "pct_good": 0.4468,
     "pct_bad": 0.4775,
     "woe": -0.0664,
     "iv": 0.002,
     "points": null
    },
    {
     "label": "Bekâr",
     "n": 11208,
     "good": 8850,
     "bad": 2358,
     "bad_rate": 0.2104,
     "pct_good": 0.5411,
     "pct_bad": 0.5076,
     "woe": 0.0639,
     "iv": 0.0021,
     "points": null
    },
    {
     "label": "Diğer",
     "n": 266,
     "good": 197,
     "bad": 69,
     "bad_rate": 0.2594,
     "pct_good": 0.012,
     "pct_bad": 0.0149,
     "woe": -0.2096,
     "iv": 0.0006,
     "points": null
    }
   ]
  }
 ],
 "metrics": {
  "auc_train": 0.76731,
  "auc_test": 0.75138,
  "gini_train": 0.53461,
  "gini_test": 0.50275,
  "ks_train": 0.41778,
  "ks_test": 0.39418,
  "auc_points_test": 0.75179,
  "auc_gb_test": 0.77423,
  "gini_gb_test": 0.54846
 },
 "roc": [
  [
   0.0,
   0.0
  ],
  [
   0.0029,
   0.0291
  ],
  [
   0.0056,
   0.0658
  ],
  [
   0.0093,
   0.1015
  ],
  [
   0.0114,
   0.119
  ],
  [
   0.0143,
   0.1386
  ],
  [
   0.017,
   0.1572
  ],
  [
   0.0181,
   0.1738
  ],
  [
   0.0211,
   0.1899
  ],
  [
   0.0234,
   0.2054
  ],
  [
   0.0261,
   0.229
  ],
  [
   0.0274,
   0.2411
  ],
  [
   0.0294,
   0.2526
  ],
  [
   0.0312,
   0.2712
  ],
  [
   0.0344,
   0.2828
  ],
  [
   0.038,
   0.2918
  ],
  [
   0.0404,
   0.3024
  ],
  [
   0.0449,
   0.3189
  ],
  [
   0.0482,
   0.326
  ],
  [
   0.0497,
   0.3335
  ],
  [
   0.0528,
   0.344
  ],
  [
   0.0549,
   0.3566
  ],
  [
   0.0588,
   0.3687
  ],
  [
   0.0625,
   0.3827
  ],
  [
   0.0663,
   0.3943
  ],
  [
   0.0702,
   0.4033
  ],
  [
   0.0738,
   0.4083
  ],
  [
   0.0758,
   0.4144
  ],
  [
   0.0803,
   0.4204
  ],
  [
   0.0863,
   0.4304
  ],
  [
   0.0885,
   0.434
  ],
  [
   0.0983,
   0.453
  ],
  [
   0.1006,
   0.4601
  ],
  [
   0.1043,
   0.4626
  ],
  [
   0.1097,
   0.4721
  ],
  [
   0.114,
   0.4912
  ],
  [
   0.1208,
   0.5018
  ],
  [
   0.1244,
   0.5123
  ],
  [
   0.1285,
   0.5168
  ],
  [
   0.1402,
   0.5289
  ],
  [
   0.1441,
   0.5324
  ],
  [
   0.1572,
   0.5465
  ],
  [
   0.1652,
   0.554
  ],
  [
   0.1684,
   0.5615
  ],
  [
   0.1761,
   0.5686
  ],
  [
   0.1838,
   0.5756
  ],
  [
   0.1915,
   0.5826
  ],
  [
   0.196,
   0.5881
  ],
  [
   0.2026,
   0.5927
  ],
  [
   0.2117,
   0.5977
  ],
  [
   0.2174,
   0.6077
  ],
  [
   0.2229,
   0.6143
  ],
  [
   0.2284,
   0.6173
  ],
  [
   0.2343,
   0.6213
  ],
  [
   0.2604,
   0.6424
  ],
  [
   0.2748,
   0.6494
  ],
  [
   0.2881,
   0.6625
  ],
  [
   0.2933,
   0.6685
  ],
  [
   0.3105,
   0.6806
  ],
  [
   0.3289,
   0.6891
  ],
  [
   0.3714,
   0.7147
  ],
  [
   0.3764,
   0.7212
  ],
  [
   0.3925,
   0.7353
  ],
  [
   0.429,
   0.7619
  ],
  [
   0.4711,
   0.7795
  ],
  [
   0.5063,
   0.7956
  ],
  [
   0.5202,
   0.8071
  ],
  [
   0.5531,
   0.8252
  ],
  [
   0.5911,
   0.8458
  ],
  [
   0.6356,
   0.8684
  ],
  [
   0.6564,
   0.8825
  ],
  [
   0.6803,
   0.8955
  ],
  [
   0.6988,
   0.9041
  ],
  [
   0.7563,
   0.9287
  ],
  [
   0.7827,
   0.9342
  ],
  [
   0.8264,
   0.9503
  ],
  [
   0.8645,
   0.9633
  ],
  [
   0.893,
   0.9689
  ],
  [
   0.9479,
   0.9834
  ],
  [
   1.0,
   1.0
  ]
 ],
 "dist": {
  "edges": [
   440,
   450,
   460,
   470,
   480,
   490,
   500,
   510,
   520,
   530,
   540,
   550,
   560,
   570
  ],
  "good": [
   0.0033,
   0.011,
   0.0118,
   0.0184,
   0.0198,
   0.0231,
   0.0322,
   0.0505,
   0.0499,
   0.13,
   0.3364,
   0.3103,
   0.0031
  ],
  "bad": [
   0.0382,
   0.0954,
   0.0929,
   0.0914,
   0.0693,
   0.0452,
   0.0653,
   0.0663,
   0.0477,
   0.0929,
   0.1974,
   0.0974,
   0.0005
  ]
 },
 "bands": [
  {
   "lo": 440,
   "hi": 486,
   "n": 1137,
   "bad_rate": 0.6403,
   "implied": 0.6629
  },
  {
   "lo": 487,
   "hi": 518,
   "n": 1132,
   "bad_rate": 0.333,
   "implied": 0.3536
  },
  {
   "lo": 519,
   "hi": 536,
   "n": 1140,
   "bad_rate": 0.2009,
   "implied": 0.1891
  },
  {
   "lo": 537,
   "hi": 542,
   "n": 1165,
   "bad_rate": 0.1605,
   "implied": 0.1381
  },
  {
   "lo": 543,
   "hi": 547,
   "n": 1403,
   "bad_rate": 0.1361,
   "implied": 0.1177
  },
  {
   "lo": 548,
   "hi": 550,
   "n": 952,
   "bad_rate": 0.1239,
   "implied": 0.1052
  },
  {
   "lo": 551,
   "hi": 553,
   "n": 959,
   "bad_rate": 0.0792,
   "implied": 0.0947
  },
  {
   "lo": 554,
   "hi": 560,
   "n": 1112,
   "bad_rate": 0.0764,
   "implied": 0.0825
  }
 ],
 "score_stats": {
  "mean": 530.1,
  "median": 542,
  "p10": 479,
  "p90": 555
 }
};

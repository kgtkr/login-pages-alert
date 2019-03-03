export interface Site {
  urlPatterns: {
    origin: string,
    pathname: string
  }[],
  kinds: {
    require: string,
    bodyPatterns: string[][]
  }[]
}

const key = "data-1";

export function loadData(): Site[] {
  const json = localStorage.getItem(key);
  if (json !== null) {
    return JSON.parse(json);
  } else {
    return [
      {
        urlPatterns: [
          {
            origin: "https://tech.nikkeibp.co.jp",
            pathname: "*"
          }],
        kinds: [
          {
            require: "有料会員登録",
            bodyPatterns: [["この先は有料会員の登録が必要です。"]]
          },
        ]
      },
      {
        urlPatterns: [
          {
            origin: "https://www.nikkei.com",
            pathname: "*"
          },
          {
            origin: "https://r.nikkei.com",
            pathname: "*"
          }
        ],
        kinds: [
          {
            require: "会員登録",
            bodyPatterns: [["この記事は会員限定です"]]
          }
        ]
      },
      {
        urlPatterns: [
          {
            origin: "https://note.mu",
            pathname: "*"
          }
        ],
        kinds: [
          {
            require: "有料ノートの購入",
            bodyPatterns: [["この続きをみるには", "ノートを購入する"]],
          }
        ]
      },
      {
        urlPatterns: [
          {
            origin: "https://www.kobe-np.co.jp",
            pathname: "*"
          }
        ],
        kinds: [
          {
            require: "有料会員登録",
            bodyPatterns: [["readmore-area"]]
          }
        ]
      },
      {
        urlPatterns: [
          {
            origin: "https://mainichi.jp",
            pathname: "*"
          }
        ],
        kinds: [
          {
            require: "有料会員登録",
            bodyPatterns: [["この記事は有料記事です。"]]
          }
        ]
      },
      {
        urlPatterns: [
          {
            origin: "https://special.sankei.com",
            pathname: "*"
          }
        ],
        kinds: [
          {
            require: "有料会員登録",
            bodyPatterns: [["こちらは有料会員記事です"]]
          }
        ]
      },
      {
        urlPatterns: [
          {
            origin: "https://www.asahi.com",
            pathname: "*"
          }
        ],
        kinds: [
          {
            require: "会員登録",
            bodyPatterns: [["無料登録して全文を読む"]]
          },
          {
            require: "有料会員登録",
            bodyPatterns: [["有料会員になると続きをお読みいただけます。"]]
          }
        ]
      }
    ];

  }
}

export function saveData(sites: Site[]) {
  localStorage.setItem(key, JSON.stringify(sites));
}
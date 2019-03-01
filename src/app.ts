import * as matcher from "matcher";

const list = [
  {
    url: [
      {
        origin: "https://tech.nikkeibp.co.jp",
        pathname: "*"
      }],
    data: [
      {
        prefix: "有料",
        matchs: [["この先は有料会員の登録が必要です。"]]
      },
    ]
  },
  {
    url: [
      {
        origin: "https://www.nikkei.com",
        pathname: "*"
      },
      {
        origin: "https://r.nikkei.com",
        pathname: "*"
      }
    ],
    data: [
      {
        prefix: "",
        matchs: [["この記事は会員限定です"]]
      }
    ]
  },
  {
    url: [
      {
        origin: "https://note.mu",
        pathname: "*"
      }
    ],
    data: [
      {
        prefix: "有料",
        matchs: [["この続きをみるには", "ノートを購入する"]],
      }
    ]
  },
  {
    url: [
      {
        origin: "https://www.kobe-np.co.jp",
        pathname: "*"
      }
    ],
    data: [
      {
        prefix: "有料",
        matchs: [["readmore-area"]]
      }
    ]
  },
  {
    url: [
      {
        origin: "https://mainichi.jp",
        pathname: "*"
      }
    ],
    data: [
      {
        prefix: "有料",
        matchs: [["この記事は有料記事です。"]]
      }
    ]
  },
  {
    url: [
      {
        origin: "https://special.sankei.com",
        pathname: "*"
      }
    ],
    data: [
      {
        prefix: "有料",
        matchs: [["こちらは有料会員記事です"]]
      }
    ]
  },
  {
    url: [
      {
        origin: "https://www.asahi.com",
        pathname: "*"
      }
    ],
    data: [
      {
        prefix: "",
        matchs: [["無料登録して全文を読む"]]
      },
      {
        prefix: "有料",
        matchs: [["有料会員になると続きをお読みいただけます。"]]
      }
    ]
  }
];

let cur = location.href;
//null:開いてない、undefined:閉じた、文字列:type
let isOpen: string | null | undefined = null;

function insertHTML(prefix: string) {
  if (isOpen === undefined) {
    return;
  }

  if (isOpen !== prefix) {
    close();
    isOpen = null;
  }

  if (isOpen === null) {
    const el = document.createElement("div");
    el.className = "login-pages-alert";
    const msg = document.createElement("div");
    msg.className = "msg";
    msg.innerText = `このページは最後まで読むのに${prefix}会員登録が必要です。`;
    el.appendChild(msg);
    const by = document.createElement("div");
    by.className = "by";
    by.innerText = "by Login Pages Alert";
    el.appendChild(by);
    const button = document.createElement("a");
    button.className = "close";
    button.innerText = "[閉じる]";
    button.onclick = close;
    el.appendChild(button);

    document.body.insertAdjacentElement("afterbegin", el);
    isOpen = prefix;
  }
}

function close() {
  if (typeof isOpen === "string") {
    for (let el of Array.from(document.getElementsByClassName("login-pages-alert"))) {
      document.body.removeChild(el);
    }
    isOpen = undefined;
  }
}

function run() {
  console.log("login-pages-alert:run");
  if (cur !== location.href) {
    close();
    cur = location.href;
    isOpen = null;
  }
  const body = document.body.innerHTML;

  for (let site of list) {
    if (site.url.some(url => matcher.isMatch(location.origin, url.origin, { caseSensitive: true }) && matcher.isMatch(location.pathname, url.pathname, { caseSensitive: true }))) {
      for (let data of site.data) {
        if (data.matchs.some(x => x.every(x => body.includes(x)))) {
          insertHTML(data.prefix);
          return;
        }
      }
    }
  }

  close();
}

window.addEventListener("load", () => {
  run();
}, false);

new MutationObserver(mutations => {
  if (mutations.length !== 0) {
    run();
  }
}).observe(document.body, { childList: true });

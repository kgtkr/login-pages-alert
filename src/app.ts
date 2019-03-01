import * as matcher from "matcher";

const list = [
  {
    urlPatterns: [
      {
        origin: "https://tech.nikkeibp.co.jp",
        pathname: "*"
      }],
    kinds: [
      {
        name: "有料",
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
        name: "",
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
        name: "有料",
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
        name: "有料",
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
        name: "有料",
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
        name: "有料",
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
        name: "",
        bodyPatterns: [["無料登録して全文を読む"]]
      },
      {
        name: "有料",
        bodyPatterns: [["有料会員になると続きをお読みいただけます。"]]
      }
    ]
  }
];

let cur = location.href;
//null:開いてない、undefined:閉じた、文字列:type
let isOpen: string | null | undefined = null;

function insertHTML(kind: string) {
  if (isOpen === undefined) {
    return;
  }

  if (isOpen !== kind) {
    close();
    isOpen = null;
  }

  if (isOpen === null) {
    const el = document.createElement("div");
    el.className = "login-pages-alert";
    const msg = document.createElement("div");
    msg.className = "msg";
    msg.innerText = `このページは最後まで読むのに${kind}会員登録が必要です。`;
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
    isOpen = kind;
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
    if (site.urlPatterns.some(url => matcher.isMatch(location.origin, url.origin, { caseSensitive: true }) && matcher.isMatch(location.pathname, url.pathname, { caseSensitive: true }))) {
      for (let kind of site.kinds) {
        if (kind.bodyPatterns.some(x => x.every(x => body.includes(x)))) {
          insertHTML(kind.name);
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

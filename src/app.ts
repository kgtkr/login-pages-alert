import * as matcher from "matcher";

const list = [
  {
    urls: [
      {
        origin: "https://tech.nikkeibp.co.jp",
        pathname: "*"
      }],
    kinds: [
      {
        name: "有料",
        body: [["この先は有料会員の登録が必要です。"]]
      },
    ]
  },
  {
    urls: [
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
        body: [["この記事は会員限定です"]]
      }
    ]
  },
  {
    urls: [
      {
        origin: "https://note.mu",
        pathname: "*"
      }
    ],
    kinds: [
      {
        name: "有料",
        body: [["この続きをみるには", "ノートを購入する"]],
      }
    ]
  },
  {
    urls: [
      {
        origin: "https://www.kobe-np.co.jp",
        pathname: "*"
      }
    ],
    kinds: [
      {
        name: "有料",
        body: [["readmore-area"]]
      }
    ]
  },
  {
    urls: [
      {
        origin: "https://mainichi.jp",
        pathname: "*"
      }
    ],
    kinds: [
      {
        name: "有料",
        body: [["この記事は有料記事です。"]]
      }
    ]
  },
  {
    urls: [
      {
        origin: "https://special.sankei.com",
        pathname: "*"
      }
    ],
    kinds: [
      {
        name: "有料",
        body: [["こちらは有料会員記事です"]]
      }
    ]
  },
  {
    urls: [
      {
        origin: "https://www.asahi.com",
        pathname: "*"
      }
    ],
    kinds: [
      {
        name: "",
        body: [["無料登録して全文を読む"]]
      },
      {
        name: "有料",
        body: [["有料会員になると続きをお読みいただけます。"]]
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
    if (site.urls.some(url => matcher.isMatch(location.origin, url.origin, { caseSensitive: true }) && matcher.isMatch(location.pathname, url.pathname, { caseSensitive: true }))) {
      for (let kind of site.kinds) {
        if (kind.body.some(x => x.every(x => body.includes(x)))) {
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

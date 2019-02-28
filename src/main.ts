let cur = location.href;
//null:開いてない、undefined:閉じた、文字列:type
let isOpen: string | null | undefined = null;

function insertHTML(type: string) {
  if (isOpen === undefined) {
    return;
  }

  if (isOpen !== type) {
    close();
    isOpen = null;
  }

  if (isOpen === null) {
    const el = document.createElement("div");
    el.className = "login-pages-alert";
    const msg = document.createElement("div");
    msg.className = "msg";
    msg.innerText = `このページは最後まで読むのに${type}会員登録が必要です。`;
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
    isOpen = type;
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
    if (location.href.includes(site.url)) {
      for (let data of site.data) {
        if (data.matchs.some(x => x.every(x => body.includes(x)))) {
          insertHTML(data.type);
          return;
        }
      }
    }
  }

  close();
}

const list = [
  {
    url: "https://tech.nikkeibp.co.jp",
    data: [
      {
        type: "有料",
        matchs: [["この先は有料会員の登録が必要です。"]]
      },
    ]
  },
  {
    url: "https://www.nikkei.com",
    data: [
      {
        type: "",
        matchs: [["この記事は会員限定です。"]]
      }
    ]
  },
  {
    url: "https://note.mu",
    data: [
      {
        type: "有料",
        matchs: [["この続きをみるには", "ノートを購入する"]],
      }
    ]
  },
  {
    url: "https://www.kobe-np.co.jp",
    data: [
      {
        type: "有料",
        matchs: [["readmore-area"]]
      }
    ]
  },
  {
    url: "https://mainichi.jp",
    data: [
      {
        type: "有料",
        matchs: [["この記事は有料記事です。"]]
      }
    ]
  },
  {
    url: "https://special.sankei.com",
    data: [
      {
        type: "有料",
        matchs: [["こちらは有料会員記事です"]]
      }
    ]
  },
  {
    url: "https://www.asahi.com",
    data: [
      {
        type: "",
        matchs: [["無料登録して全文を読む"]]
      },
      {
        type: "有料",
        matchs: [["有料会員になると続きをお読みいただけます。"]]
      }
    ]
  }
];

window.addEventListener("load", () => {
  run();
}, false);

new MutationObserver(mutations => {
  if (mutations.length !== 0) {
    run();
  }
}).observe(document.body, { childList: true });

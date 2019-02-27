(() => {
  function insertHTML(type) {
    close();
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
  }

  function close() {
    for (let el of document.getElementsByClassName("login-pages-alert")) {
      document.body.removeChild(el);
    }
  }

  function pageLoad() {
    setTimeout(() => {
      close();
      const body = document.body.innerHTML;

      loop: for (let site of list) {
        if (location.href.includes(site.url)) {
          for (let data of site.data) {
            if (data.matchs.every(x => body.includes(x))) {
              insertHTML(data.type);
              break loop;
            }
          }
        }
      }
    }, 1000);
  }

  const list = [
    {
      url: "https://tech.nikkeibp.co.jp",
      data: [
        {
          type: "有料",
          matchs: ["この先は有料会員の登録が必要です。"]
        },
      ]
    },
    {
      url: "https://www.nikkei.com",
      data: [
        {
          type: "",
          matchs: ["この記事は会員限定です。"]
        }
      ]
    },
    {
      url: "https://note.mu",
      data: [
        {
          type: "有料",
          matchs: ["この続きをみるには"]
        }
      ]
    }
  ];

  window.addEventListener("load", () => {
    pageLoad();
  }, false);

  function addCallback(cons, name, f) {
    cons.prototype[name] = function (...params) {
      console.log(cons, name);
      const res = this[name](...params);
      f(params, res);
      return res;
    };
  }
  addCallback(History, "pushState", () => {
    pageLoad();
  });
  addCallback(History, "replaceState", () => {
    pageLoad();
  });
  addCallback(History, "back", () => {
    pageLoad();
  });
  addCallback(History, "forward", () => {
    pageLoad();
  });
  addCallback(History, "go", () => {
    pageLoad();
  });
})();
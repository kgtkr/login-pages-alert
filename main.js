(() => {
  function insertHTML(type) {
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
    button.onclick = () => {
      for (let el of document.getElementsByClassName("login-pages-alert")) {
        document.body.removeChild(el);
      }
    };
    el.appendChild(button);

    document.body.insertAdjacentElement("afterbegin", el);
  }

  const list = [
    {
      url: "https://tech.nikkeibp.co.jp",
      data: [
        {
          type: "有料",
          matchs: ["この先は有料会員の登録が必要です。"]
        }
      ]
    }
  ];

  window.addEventListener("load", () => {
    const body = document.body.innerHTML;

    loop: for (let site of list) {
      if (location.href.includes(site.url)) {
        for (let data of site.data) {
          if (data.matchs.some(x => body.includes(x))) {
            insertHTML(data.type);
            break loop;
          }
        }
      }
    }
  }, false);
})();
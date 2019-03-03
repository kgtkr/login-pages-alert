import * as matcher from "matcher";
import { loadData } from "./common";

const list = loadData().filter(site => site.urlPatterns.some(x => matcher.isMatch(location.origin, x.origin, { caseSensitive: true })));
function main() {
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
      msg.innerText = `このページは最後まで読むのに${kind}が必要です。`;
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
      if (site.urlPatterns.some(url => matcher.isMatch(location.pathname, url.pathname, { caseSensitive: true }))) {
        for (let kind of site.kinds) {
          if (kind.bodyPatterns.some(x => x.every(x => body.includes(x)))) {
            insertHTML(kind.require);
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

}

if (list.length !== 0) {
  main();
}


import { browser } from 'webextension-polyfill-ts';

Array.from(document.getElementsByTagName("a"))
  .forEach(x => {
    const href = x.href;
    x.addEventListener("click", () => {
      browser.tabs.create({ active: true, url: href });
    });
  });

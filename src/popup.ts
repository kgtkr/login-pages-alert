if (navigator.userAgent.includes("Chrome")) {
  Array.from(document.getElementsByTagName("a"))
    .forEach(x => {
      const href = x.href;
      x.addEventListener("click", () => {
        chrome.tabs.create({ active: true, url: href });
      });
    });
}
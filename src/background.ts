const MENU_ID = "copyText";

chrome.contextMenus.create({
  id: MENU_ID,
  title: "Copy text from images",
  contexts: ["selection"],
}, () => {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId !== MENU_ID) return;
    chrome.tabs.executeScript({
      file: "contentScript.js",
    });
  });
});

const selection = document.getSelection();
let altString = "";
if (selection) {
  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i);
    const iter = document.createNodeIterator(range.commonAncestorContainer);
    let inRange = false;
    let node: Node | null;
    while (node = iter.nextNode()) {
      let start = 0;
      let end = (node.textContent ?? "").length;
      if (node === range.startContainer) {
        start = range.startOffset;
        inRange = true;
      }
      if (node === range.endContainer) {
        end = range.endOffset;
      }
      if (inRange) {
        if (node.nodeType === Node.TEXT_NODE) {
          altString += (node.textContent ?? "").substring(start, end);
        } else if (node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement) {
          if (node.tagName.toLowerCase() === "img") {
            altString += node.getAttribute("alt") ?? "";
          }
        }
      }
      if (node === range.endContainer) {
        inRange = false;
      }
    }
  }
}
navigator.clipboard.writeText(altString);

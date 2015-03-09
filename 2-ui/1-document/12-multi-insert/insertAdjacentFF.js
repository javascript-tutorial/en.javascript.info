// http://learn.javascript.ru/files/tutorial/browser/dom/insertAdjacentFF.js
// Добавляет поддержку insertAdjacent* в Firefox

if (typeof HTMLElement != "undefined" && !HTMLElement.prototype.insertAdjacentElement) {
  HTMLElement.prototype.insertAdjacentElement = function(where, parsedNode) {
    switch (where) {
      case 'beforeBegin':
        this.parentNode.insertBefore(parsedNode, this)
        break;
      case 'afterBegin':
        this.insertBefore(parsedNode, this.firstChild);
        break;
      case 'beforeEnd':
        this.appendChild(parsedNode);
        break;
      case 'afterEnd':
        if (this.nextSibling) this.parentNode.insertBefore(parsedNode, this.nextSibling);
        else this.parentNode.appendChild(parsedNode);
        break;
    }
  }

  HTMLElement.prototype.insertAdjacentHTML = function(where, htmlStr) {
    var r = this.ownerDocument.createRange();
    r.setStartBefore(this);
    var parsedHTML = r.createContextualFragment(htmlStr);
    this.insertAdjacentElement(where, parsedHTML)
  }


  HTMLElement.prototype.insertAdjacentText = function(where, txtStr) {
    var parsedText = document.createTextNode(txtStr)
    this.insertAdjacentElement(where, parsedText)
  }
}
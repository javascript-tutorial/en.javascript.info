let elems = document.querySelectorAll('form,div,p');

for (let i = 0; i < elems.length; i++) {
  elems[i].addEventListener("click", highlightThis, true);
}

function highlightThis() {
  this.style.backgroundColor = 'yellow';
  alert(this.tagName);
  this.style.backgroundColor = '';
}
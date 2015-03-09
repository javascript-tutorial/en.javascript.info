var form = document.querySelector('form');

form.onclick = function(event) {
  event.target.style.backgroundColor = 'yellow';

  alert("target = " + event.target.tagName + ", this=" + this.tagName);

  event.target.style.backgroundColor = '';
};
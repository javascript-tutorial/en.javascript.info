Родителя `parentNode` можно получить из `elem`.

Вот так выглядит решение:
```html
//+ run
<div>Это</div>
<div>Все</div>
<div>Элементы DOM</div>

<script>
  if (!Element.prototype.remove) {
    Element.prototype.remove = function remove() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

  var elem = document.body.children[0];

  elem.remove();  
</script>
```
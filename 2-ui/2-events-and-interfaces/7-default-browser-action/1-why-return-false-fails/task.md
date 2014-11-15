# Почему не работает return false?

[importance 3]

Почему в этом документе `return false` не работает?

```html
<!--+ autorun run -->
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="http://w3.org" onclick="handler()">w3.org</a>
```

По замыслу, переход на `w3.org` при клике должен отменяться. Однако, на самом деле он происходит.

В чём дело и как поправить, сохранив `onclick` в HTML?
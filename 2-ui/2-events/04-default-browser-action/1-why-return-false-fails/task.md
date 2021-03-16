importance: 3

---

# Why "return false" doesn't work?

Why in the code below `return false` doesn't work at all?

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">the browser will go to w3.org</a>
```

The browser follows the URL on click, but we don't want it.

How to fix?

# Проверка синтаксиса

[importance 2]

Каков будет результат этого кода?

```js
//+ no-beautify
var obj = {
  go: function() { alert(this) }
}

(obj.go)()
```

P.S. Есть подвох :)
# HEAD

Два способа:

```js
document.documentElement.children[0]
document.documentElement.firstChild
```

Второй способ работает, так как пробелы перед `<head>` игнорируются.

# UL

Два варианта:

```js
document.getElementById('user-list')
document.body.children[1]
```

Предпочтителен первый вариант, так как он не зависит от положении узла в документе. Мало ли, вдруг мы решим вставить какую-то ещё информацию перед ним.

# LI

Два варианта:

```js
document.getElementById('user-list').children[1];
document.body.children[1].children[1]; // LI
```

Если комментарий переместить между элементами списка, то в IE8- он станет одним из `children`, в результате последний код станет работать некорректно.

Чтобы это обойти, нужно либо не ставить комментарии в те места HTML, где планируются такие выборки, либо использовать другие методы поиска в HTML, которые мы рассмотрим [далее](/searching-elements-dom).

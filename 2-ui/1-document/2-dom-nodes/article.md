libs:
  - d3
  - domtree

---

# DOM tree

When we look at HTML we see nested tags, right? According to Document Object Model (DOM), every HTML-tag is an object. Nested tags are his "children". And the text inside it is an object as well. All these objects are accessible using Javascript.

## An example of DOM

For instance, let's see the DOM tree for this document:

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
  <title>About elks</title>
</head>
<body>
  The truth about elks.
</body>
</html>
```

Here's how it looks:

<div class="domtree"></div>

<script>
var node = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elks"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n  "},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elks."}]}]}

drawHtmlTree(node, 'div.domtree', 690, 300);
</script>

There are two types of tree nodes in the example:

1. Tags are called *element nodes* (or just elements). Naturally, nested tags become children of the enclosing ones. Because of that we have a tree.
2. The text inside elements forms *text nodes*, labelled as `#text`. A text node contains only a string. It may not have children and is always a leaf of the tree.

```online
**On the picture above element nodes you can click on element nodes. Their children will open/collapse.**
```

Please note the special characters in text nodes:

- a newline: `↵` (in Javascript known as `\n`)
- a space: `␣`

**Spaces and newlines -- are all valid characters, they form text nodes and become a part of the DOM.**

For instance, in the example above `<html>` contains not only elements `<head>` and `<body>`, but also the `#text` (spaces, line breaks) between them.

However, on the topmost level there are exclusions of that rule: spaces and newlines before `<head>` are ignored for historical reasons, and if we put something after `</body>`, then it is considered a malformed HTML, and that text is moved inside the `body`, at the end (there may be nothing after the `body`).

In other cases everything's honest -- if there are spaces (just like any character) in the document, then they text nodes in DOM, and if we remove them, then there won't be any in DOM, like here:

```html no-beautify
<!DOCTYPE HTML>
<html><head><title>About elks</title></head><body>The truth about elks.</body></html>
```

<div class="domtree"></div>

<script>
var node = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elks"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"The truth about elks."}]}]}

drawHtmlTree(node, 'div.domtree', 690, 210);
</script>

```smart
From here on, spaces and line-breaks on DOM pictures will only be shown for "space-only" nodes that have no other text.
```

## Autocorrection

If the browser encounters malformed HTML, it automatically corrects it when making DOM.

For instance, the top tag is always `<html>`. Even if it doesn't exist in the document -- it will be in DOM, the browser will create it. The same about `<body>`.

Like, if the HTML file is a single word `"Hello"`, the browser will wrap it into `<html>` and `<body>`.

**While generating DOM, browser automatically processes errors in the document, closes tags and so on.**

Such a document:

```html no-beautify
<p>Hello
<li>Mom
<li>and
<li>Dad
```

...Will make a respectable DOM, as the browser knows how to read tags (from the spec):

<div class="domtree"></div>

<script>
var node = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Mom"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"and"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Dad"}]}]}]}

drawHtmlTree(node, 'div.domtree', 690, 400);
</script>

````warn header="Tables always have `<tbody>`"
An interesting "special case" is tables. By the DOM specification they must have `<tbody>`, but HTML text may omit it. Then the browser creates `<tbody>` on it's own.

For the HTML:

```html no-beautify
<table id="table"><tr><td>1</td></tr></table>
```

DOM-structure will be:
<div class="domtree"></div>

<script>
var node = {"name":"TABLE","nodeType":1,"children":[{"name":"TBODY","nodeType":1,"children":[{"name":"TR","nodeType":1,"children":[{"name":"TD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"1"}]}]}]}]};

drawHtmlTree(node,  'div.domtree', 600, 200);
</script>

Do you see? The `<tbody>` has appeared out of nowhere. Should keep in mind while working with tables to evade surprises.
````

## Other node types

Let's add more tags and a comment to the page:

```html
<!DOCTYPE HTML>
<html>
<body>
  The truth about elks.
  <ol>
    <li>An elk is a smart</li>
*!*
    <!-- comment -->
*/!*
    <li>...and cunning animal!</li>
  </ol>
</body>
</html>
```

<div class="domtree"></div>

<script>
var node = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elks.\n    "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"An elk is a smart"}]},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"#comment","nodeType":8,"content":"comment"},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...and cunning animal!"}]},{"name":"#text","nodeType":3,"content":"\n    "}]},{"name":"#text","nodeType":3,"content":"\n  \n"}]}]};

drawHtmlTree(node, 'div.domtree', 690, 500);
</script>

Here we see a new tree node type -- *comment node*.

We may think -- why a comment is added to the DOM? It doesn't affect the visual representation anyway. But there's a rule -- if something's in HTML, then it also must be in the DOM tree.

**Everything in HTML has its place in DOM.**

Even the `<!DOCTYPE...>` directive at the very beginning of HTML is also a DOM node. It's in the DOM tree right before `<html>`. The pictures above don't show that fact, because we are not going to touch that node, but it's there.

The `document` object that represents the whole document is, formally, a DOM node as well.

There are 12 node types. In practice we only work with 4 of them:

1. `document` -- the "entry point" into DOM.
2. element nodes -- HTML-tags, the tree building blocks.
3. text nodes -- they contain text.
4. comments -- sometimes we can put the information there, that won't be shown, but JS can read it from DOM.

If you want to explore how DOM changes with the document, please consider the [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Just type in/modify the document, and it will show up DOM at instant.

## Power of DOM

Why besides nice pictures do we need DOM? To manipulate the page -- read the information from HTML, create and modify elements.

The `<html>` node is accessible as `document.documentElement`, and `<body>` -- as `document.body`.

Then we can do something with the node.

Like changing the color:
```js run
document.body.style.background = 'yellow';
alert('The body is now yellow');

// return back in 3 seconds
setTimeout(() => document.body.style.background = '', 3000);
```

...But actually much more.

In the next chapters we're going to learn it.

## Summary

- DOM-модель -- это внутреннее представление HTML-страницы в виде дерева.
- Все элементы страницы, включая теги, текст, комментарии, являются узлами DOM.
- У элементов DOM есть свойства и методы, которые позволяют изменять их.
- IE8- не генерирует пробельные узлы.

Кстати, DOM-модель используется не только в JavaScript, это известный способ представления XML-документов.

В следующих главах мы познакомимся с DOM более плотно.

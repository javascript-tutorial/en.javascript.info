# DOM: attributes and properties [todo]

The browser "reads" HTML text and generates DOM objects from it. For element nodes most standard HTML attributes automatically become properties of DOM objects.

For instance, if the tag is `<body id="page">`, then the DOM object will have `body.id="page"`.

But the mapping is not one-to-one! In this chapter we'll see that DOM properties and attributes are linked, but they are still different things.

[cut]

## DOM properties

We've already seen built-in DOM properties. But technically no one limits us -- we can add own own.

DOM nodes are regular Javascript objects. We can alter them.

For instance, let's create a new property in `document.body`:

```js run
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

We can add a method as well:

```js run
document.body.sayHi = function() {
  alert(this.tagName);
};

document.body.sayHi(); // BODY (the value of "this" in the method is document.body)
```

We can also modify built-in prototypes like `Element.prototype` and add new methods to all elements:

```js run
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

So, DOM properties:

- Can have any value.
- Are case-sensitive (`elem.nodeType`, not `elem.NoDeTyPe`).
- Work, because DOM nodes are objects.

## HTML attributes

In HTML language, tags may have attributes. When the browser reads HTML text and creates DOM objects for tags, it recognizes *standard* attributes and creates DOM properties from them.

So when an element has `id` or another standard attribute, the corresponding property gets created. But that doesn't happen if the attribute is non-standard.

For instance:
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    // non-standard attribute does not yield a property
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

Please note that a standard attribute for one element can be unknown for another one.

Standard attributes are described in the specification for the corresponding class. For instance, `"type"` is standard for `<input>` ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), but not for `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)):
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined: DOM property not created, because it's non-standard
*/!*
  </script>
</body>
```

So, if an attribute is non-standard, there won't be DOM-property for it. Is there a way to access such attributes?

Sure. All attributes are accessible using following methods:

- `elem.hasAttribute(name)` -- checks for existance.
- `elem.getAttribute(name)` -- gets the value.
- `elem.setAttribute(name, value)` -- sets the value.
- `elem.removeAttribute(name)` -- removes the attribute.

Also one can read all attributes using `elem.attributes`. It's a collection of [Attr](https://dom.spec.whatwg.org/#attr) objects, each one with `name` and `value`.

These methods operate exactly with what's written in HTML.

Here's a demo of reading a non-standard property:

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // non-standard
*/!*
  </script>
</body>
```

HTML attributes have following features:

- Their name is case-insensitive (that's HTML: `id` is same as `ID`).
- They are always strings.

Here's an extended demo of working with attributes:

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', reading

    elem.setAttribute('Test', 123); // (2), writing

    alert( elem.outerHTML ); // (3), see it's there

    for (let attr of elem.attributes) { // (4) list all
      alert( attr.name + " = " + attr.value );
    }
  </script>
</body>
```

Please note:

1. `getAttribute('About')` -- the first letter is uppercase here, and in HTML it's all lowercase. But that doesn't matter: attribute names are case-insensitive.
2. We can assign anything to an attribute, but that becomes a string. So here we have `"123"` as the value.
3. All attributes including ones that we set are seen in `innerHTML`.
4. The `attributes` collection is iterable and has all attributes with `name` and `value`.

## Property-attribute sync

When a standard attribute changes, the corresponding property is auto-updated, and (with some exceptions) vise-versa.

In the example below `id` is modified as an attribute, and we can see the property change too. And then the same backwards:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('id', 'id');
  alert(input.id); // id (updated)

  // property => attribute
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (updated)
</script>
```

But there are exclusions, for instance `input.value` synchronizes only from attribute to property:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // NOT property => attribute
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (not updated!)
*/!*
</script>
```

In the example above:
- Changing the attribute `value` updates the property.
- But the property change does not affect the attribute.

Speaking about `value`, that actually can come in handy, because the user may modify `value` as he wants, and so do we. Then, if we want to recover the "original" value from HTML, it's in the attribute.

## DOM properties are typed

DOM properties are not always strings. For instance, `input.checked` property (for checkboxes) and other similar properties are boolean:

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // empty string
  alert(input.checked); // true
</script>
```

Javascript enforces the right type for a DOM property.

**But even if a DOM property type is a string, it may differ from the attribute.**

For instance, the `href` DOM property is always a full URL (by the standard), even if the attribute has a relative URL or just a `#hash` part.

Here we can see that:

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // attribute
  alert(a.getAttribute('href')); // #hello

  // property
  alert(a.href ); // full URL like http://site.com/page#hello
</script>
```

Let's note again: if we need the value exactly as written in the HTML, we need to use `getAttribute`.


## className and classList

The `"class"` attribute is truly special, as there are two properties that correspond to it:
1. `className` -- the string, same value as in the attribute. In the old times, there was a problem to use a reserved word such as `"class"` as an object property (now it's ok). So `className` was chosen instead.
2. `classList` -- a special object with methods to `add/remove/toggle` classes. That's for better convenience.

For instance:

```html run
<body class="main page">
  <script>
    // className: get the classes
    alert( document.body.className ); // main page

    // className: change the classes
    document.body.className = "class1 class2";

    // classList: add one more class
    document.body.classList.add('class3');
    alert(document.body.className); // class1 class2 class 3
  </script>
</body>
```

So we can operate both on the full class string using `className` or on individual classes using `classList`. What we choose depends on our needs.

Methods of `classList`:

- `elem.classList.contains("class")` -- returns `true/false`, checks for the given class.
- `elem.classList.add/remove("class")` -- adds/removes the class.
- `elem.classList.toggle("class")` -- if the class exists, then removes it, otherwise adds it.

Besides that, `classList` is iterable, so we can list all classes like this:

```html run
<body class="main page">
  <script>
    for(let name of document.body.classList) {
      alert(name); // main, then page
    }
  </script>
</body>
```

## Non-standard attributes, dataset

When writing HTML, we use a lot of standard attributes. But what about non-standard, custom ones? May they be useful? What for?

Sometimes they are used to pass custom data from HTML to Javascript, or "mark" elements like this:

```html run
<!-- marking to show the "name" here -->
<div *!*show-info="name"*/!*></div>

<script>
  // the code finds an element with the mark and shows what's requested
  let info = {
    name: "Pete"
  };

  let div = document.querySelector('[show-info]');

  // insert info.name into the div
  div.innerHTML = info[div.getAttribute('show-info')]; // Pete
</script>
```

Also, they can be used to style the element.

For instance, here for the order state the attribute `order-state` is used:

```html run
<style>
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  A new order.
</div>

<div class="order" order-state="pending">
  A pending order.
</div>

<div class="order" order-state="canceled">
  A canceled order.
</div>
```

Why the attribute was chosen in the example above, not classes like `.order-state-new`, `.order-state-pending`, `order-state-canceled`?

That's because an attribute is more convenient to manage. If we want to change the order state, we can modify it like this:

```js
div.setAttribute('order-state', 'canceled');
```

For classes we would have to clean the current state and add the new one. More cumbersome:

```js
// two lines, and we need to know the old class to clean it
div.classList.remove('order-state-new');
div.classList.add('order-state-canceled');
```

...But there's a problem here. What if we use a non-standard attribute for our purposes and later the standard introduces it and makes it do something? The HTML language is alive, it grows, more attributes appear to suit the needs of developers. There may be unexpected side-effects.

To evade conflicts, there exist [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) attributes.

**All attributes starting with "data-" are reserved for programmers' use. They are available in `dataset` property.**

So, if an `elem` has an attribute named `"data-about"`, it's available as `elem.dataset.about`.

Like this:

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

Multiword attributes like `data-order-state` become camel-cased: `dataset.orderState`.

Here's a rewritten "order state" example:

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  A new order.
</div>

<script>
  alert(order.dataset.orderState); // new
  order.dataset.orderState = "pending";
</script>
```

Using `data-*` attributes for custom purposes is a valid, safe way.

Please note that we can not only read, but modify data-attributes. Then CSS updates the view accordingly: in the example above the last line changes the color to blue.

## Summary

- Attributes -- is what's written in HTML.
- Properties -- is what's in DOM objects.

<table>
<thead>
<tr>
<th></th>
<th>Properties</th>
<th>Attributes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Type</td>
<td>Any value, standard properties have types described in the spec</td>
<td>A string</td>
</tr>
<tr>
<td>Name</td>
<td>Name is case-sensitive</td>
<td>Name is case-insensitive</td>
</tr>
</tbody>
</table>

Methods to work with attributes are:

- `elem.hasAttribute(name)` -- to check for existance.
- `elem.getAttribute(name)` -- to get the value.
- `elem.setAttribute(name, value)` -- to set the value.
- `elem.removeAttribute(name)` -- to remove the attribute.
- `elem.attributes` is a collection of all attributes.

We use those in cases when DOM properties do not suit us and we need exactly attributes for some reasons.

Some use cases:

- We want to access a non-standard attribute. But if it starts with `data-`, then we should use `dataset`.
- We want to read the value "as written" in HTML. The value of the DOM property may be different, for instance `href` property is always a full URL, and we may want to get the "original" value.

Also please note that for `class` attribute there are two DOM properties:
- `className` -- the string value.
- `classList` -- the object for easier management of individual classes.

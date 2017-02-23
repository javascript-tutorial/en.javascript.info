# Styles and classes

Before we get to Javascript ways of dealing with styles and classes -- here's an important rule.

There are generally two ways to style an element, both in HTML and Javascript:

1. Create a class in CSS and add it: `<div class="...">`
2. Write properties directly into `style`: `<div style="...">`.

[cut]

CSS is always the preferred way, both in HTML and Javascript. We should only use `style` if classes "can't handle it".

For instance, `style` is acceptable if we calculated coordinates for an element dynamically and want to set them from Javascript, like here:

```js
let top = /* complex calculations */;
let left = /* complex calculations */;
elem.style.left = left; // e.g '123px'
elem.style.top = top; // e.g '456px'
```

For other cases, like making the text red, adding a background icon -- describe that in CSS and then apply the class. That's more flexible and easier to support.

## className and classList

Changing a class is one of the most often actions in scripts.

In the ancient time, there was a limitation in Javascript: a reserved word like `"class"` could not be an object property. That limitation does not exist now, but at that time it was impossible to use `elem.class`.

So instead of `elem.class` we have `elem.className` property. It's the string with all classes, the same value as in the `"class"` attribute.

For instance:

```html run
<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
```

Adding/removing a class is a widespread operation. Using a string for such purpose is cumbersome, so there's another property for that: `elem.classList`.

The `elem.classList` is a special object with methods to `add/remove/toggle` classes.

For instance:

```html run
<body class="main page">
  <script>
    document.body.classList.add('article');
    alert(document.body.className); // main page article
  </script>
</body>
```

So we can operate both on the full class string using `className` or on individual classes using `classList`. What we choose depends on our needs.

Methods of `classList`:

- `elem.classList.add/remove("class")` -- adds/removes the class.
- `elem.classList.toggle("class")` -- if the class exists, then removes it, otherwise adds it.
- `elem.classList.contains("class")` -- returns `true/false`, checks for the given class.

Besides that, `classList` is iterable, so we can list all classes like this:

```html run
<body class="main page">
  <script>
    for(let name of document.body.classList) {
      alert(name); // main, and then page
    }
  </script>
</body>
```

## Element style

The property `elem.style` is an object that corresponds to what's written in the `"style"` attribute. Setting `elem.style.width="100px"` works as if we had in the attribute `style="width:100px"`.

For multi-word property the camelCase is used:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

For instance:

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="Prefixed properties"
Browser-prefixed properties like `-moz-border-radius`, `-webkit-border-radius` also follow the same rule, for instance:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```

That is: a dash `"-"` becomes an uppercase.
````

## Resetting the style

To "reset" the style property, we should assign an empty line to it. For instance, if we set a `width` and now want to remove it, then `elem.style.width=""`.

For instance, to hide an element, we can set `elem.style.display = "none"`.

And to show it back, we should not set another `display` like `elem.style.display = "block"`. To return the "default" `display`: `elem.style.display = ""`.

```js run
// if we run this code, the <body> would "blink"
document.body.style.display = "none";

setTimeout(() => document.body.style.display = "", 1000);
```

If we set `display` to an empty string, then the browser applies CSS classes and its built-in styles normally, as if there were no such `style` property.

````smart header="Full rewrite with `style.cssText`"
Normally, `style.*` assign individual style properties. We can't set the full style like `div.style="color: red; width: 100px"`, because `div.style` is an object.

To set the full style as a string, there's a special property `style.cssText`:

```html run
<div id="div">Button</div>

<script>
  // we can set special style flags like "important" here
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

We rarely use it, because such a setting removes all existing styles: not adds, but rather replaces them. But still can be done for new elements when we know we don't delete something important.

The same can be accomplished by setting an attribute: `div.setAttribute('style', "color: red...")`.
````

## Mind the units

CSS units must exist in values. We should not set `elem.style.top` to `10`, but rather to `10px`. Otherwise it wouldn't work.

For instance:

```html run height=100
<body>
  <script>
  *!*
    // won't work!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (empty string)
  */!*

    // now the right way
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

Please note how the browser "unpacks" the property `style.margin` and infers `style.marginLeft` and `style.marginTop` (and other partial margins) from it.

## Computed styles: getComputedStyle

Modifying a style is easy. But how to *read* it?

For instance, we want to know the size, margins, the color of an element. How to do it?

**The `style` property contains only the style in the `"style"` attribute, without any CSS cascade.**

So we can't read anything that comes from CSS classes.

For instance, here `style` won't see the margin:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
*!*
    alert(document.body.style.color); // empty
    alert(document.body.style.marginTop); // empty
*/!*
  </script>
</body>
```

...But what if we need, say, increase the margin by 20px? We want the current value for that.

There's another method for that: `getComputedStyle`.

The syntax is:

```js
getComputedStyle(element[, pseudo])
```

element
: Element to read the value for.

pseudo
: A pseudo-element if required, for instance `::before`. An empty string or no argument mean the element itself.

The result is an object with style properties, like `elem.style`, but now with respect to all CSS classes.

For instance:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // now can read the margin and the color from it

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="Computed and resolved values"
There are two concepts in [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1. A *computed* style value is the one after all CSS rules and CSS inheritance is applied. If can look like `width: auto` or `font-size: 125%`.
2. A *resolved* style value is the one finally applied to the element. The browser takes the computed value and makes all units fixed and absolute, for instance: `width: 212px` or `font-size: 16px`. In some browsers values can have a floating point.

Long time ago `getComputedStyle` was created to get computed values, but it turned out that resolved values are much more convenient.

So nowadays `getComputedStyle` actually returns the final, resolved value.
```

````warn header="`getComputedStyle` requires the full property name"
We should always ask for the exact property that we want, like `paddingLeft` or `marginTop` or `borderTopWidth`. Otherwise the correct result is not guaranteed.

For instance, if properties `paddingLeft/paddingTop` come from the different CSS classes, then what should we get for `getComputedStyle(elem).padding`?

Some browsers (Chrome) show `10px` in the document below, and some of them (Firefox) --  do not:

```html run
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  let style = getComputedStyle(document.body);
  alert(style.margin); // empty string in Firefox
</script>
```
````

```smart header="\"Visited\" links styles are hidden!"
Visited links may be colored using `:visited` CSS pseudoclass.

But `getComputedStyle` does not give access to that color, because otherwise an arbitrary page could find out whether the user visited a link by creating it on the page and checking the styles.

Javascript we may not see the styles applied by `:visited`. And also, there's a limitation in CSS that forbids to apply geometry-changing styles in `:visited`. That's to guarantee that there's no side way for an evil page to see if a link was visited and hence to break the privacy.
```

## Summary

To manage classes, there are two DOM properties:
- `className` -- the string value, good to manage the whole set of classes.
- `classList` -- the object with methods `add/remove/toggle/contains`, good for individual classes.

To change the styles:

- The `style` property is an object with camelCased styles. Reading and writing to it has the same meaning as modifying individual properties in the `"style"` attribute. To see how to apply `important` and other rare stuff -- there's a list of methods at [MDN](mdn:api/CSSStyleDeclaration).

- The `style.cssText` property corresponds to the whole `"style"` attribute, the full string of styles.

To read the resolved styles (after all CSS is applied and final values are calculated):

- The `getComputedStyles(elem[, pseudo])` returns the style-like object with them. Read-only.

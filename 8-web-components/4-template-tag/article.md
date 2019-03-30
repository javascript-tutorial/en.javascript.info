
# Template tags

A built-in `<template>` element serves as a storage for markup. The browser ignores it contents, only checks for syntax validity.

Of course, there are many ways to create an invisible element somewhere in HTML for markup purposes. What's special about `<template>`?

First, as the content is ignored, it can be any valid HTML.

For example, we can put there a table row `<tr>`:
```html
<template>
  <tr>
    <td>Contents</td>
  </tr>
</template>
```

Usually, if we try to put `<tr>` inside, say, a `<div>`, the browser detects the invalid DOM structure and "fixes" it, adds `<table>` around. That's not what we want. On the other hand, `<template>` keeps exactly what we place there.

We can put there styles:

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
</template>
```

The browser considers `<template>` content "out of the document", so the style is not applied.

More than that, we can also have `<video>`, `<audio>` and even `<script>` in the template. It becomes live (the script executes) when we insert it.

## Inserting template

The template content is available in its `content` property as a `DocumentFragment` -- a special type of DOM node.

We can treat it as any other DOM node, except one special property: when we insert it somewhere, its children are inserted instead.

For example, let's rewrite a Shadow DOM example from the previous chapter using `<template>`:

```html run untrusted autorun="no-epub" height=60
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <script> alert("I am alive!"); </script>
  <p id="message"></p>
</template>

<div id="elem">Click me</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
  };
</script>
```

In the line `(*)` when we clone and insert `tmpl.content`, its children (`<style>`, `<p>`) are inserted instead, they form the shadow DOM:

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <script> alert("I am alive!"); </script>
    <p id="message"></p>
</div>
```

Please note that the template `<script>` runs exactly when it's added into the document. If we clone `template.content` multiple times, it executes each time.

## Summary

To summarize:

- `<template>` content can be any syntactically correct HTML.
- `<template>` content is considered "out of the document", so it doesn't affect anything.
- We can access `template.content` from JavaScript, clone it to render new component or for other purposes.

The `<template>` tag is quite unique, because:

- The browser checks the syntax inside it (as opposed to using a template string inside a script).
- ...But still allows to use any top-level HTML tags, even those that don't make sense without proper wrappers (e.g. `<tr>`).
- The content becomes interactive: scripts run, `<video autoplay>` plays etc, when the insert it into the document (as opposed to assigning it with `elem.innerHTML=` that doesn't do that).

The `<template>` tag does not feature any sophisticated iteration mechanisms or variable substitutions, making it less powerful than frameworks. But it's built-in and ready to serve.

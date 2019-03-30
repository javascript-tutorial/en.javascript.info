# Shadow DOM styling

Shadow DOM may include both `<style>` and `<link rel="stylesheeet" href="…">` tags. In the latter case, stylesheets are HTTP-cached, so they are not redownloaded.

As a general rule, CSS selectors in local styles work only inside the shadow tree. But there are few exceptions.

## :host

The `:host` selector allows to select the shadow host: the element containing the shadow tree.

For instance, we're making `<custom-dialog>` element that should be centered. For that we need to style not something inside `<custom-dialog>`, but the element itself.

That's exactly what `:host` selects:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Hello!
</custom-dialog>
```

## Cascading

The shadow host (`<custom-dialog>` itself) is a member of the outer document, so it's affected by the main CSS cascade.

If there's a property styled both in `:host` locally, and in the document, then the document style takes precedence.

For instance, if in the outer document we had:
```html
<style>
custom-dialog {
  padding: 0;
}
</style>
```
...Then the dialog would be without padding.

It's very convenient, as we can setup "default" styles in the component `:host` rule, and then easily override them in the document.

The exception is when a local property is labelled `!important`. For important properties, local styles take precedence.


## :host(selector)

Same as `:host`, but the shadow host also must the selector.

For example, we'd like to center the custom dialog only if it has `centered` attribute:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
*!*
    :host([centered]) {
*/!*
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>


<custom-dialog centered>
  Centered!
</custom-dialog>

<custom-dialog>
  Not centered.
</custom-dialog>
```

Now the additional centering styles are only applied to the first dialog `<custom-dialog centered>`.

## :host-context(selector)

Same as `:host`, the shadow host or any of its ancestors in the outer document must match the selector.

E.g. if we add a rule `:host-context(.top)` to the example above, it matches for following cases if an ancestor matches `.top`:

```html
<header class="top">
  <div>
    <custom-dialog>...</custom-dialog>
  <div>
</header>
```

...Or when the dialog matches `.top`:

```html
<custom-dialog class="top">...</custom-dialog>
```

```smart
The `:host-context(selector)` is the only CSS rule that can somewhat test the outer document context, outside the shadow host.
```

## Styling slotted content

Now let's consider the situation with slots.

Elements, that come from light DOM, keep their document styles. Local styles do not affect them, as they are physically not in the shadow DOM.

For example, here `<span>` takes the document style, but not the local one:
```html run autorun="no-epub" untrusted height=80
<style>
*!*
  span { font-weight: bold }
*/!*
</style>

<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      span { background: red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

The result is bold, but not red.

If we'd like to style slotted elements, there are two choices.

First, we can style the `<slot>` itself and rely on style inheritance:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      slot[name="username"] { font-weight: bold; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Here `<p>John Smith</p>` becomes bold, because of CSS inheritance from it's "flattened parent" slot. But not all CSS properties are inherited.

Another option is to use `::slotted(selector)` pseudo-class. It allows to select elements that are inserted into slots and match the selector.

In our example, `::slotted(div)` selects exactly `<div slot="username">`:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      ::slotted(div) { display: inline; border: 1px solid red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Please note, we can't descend any further. These selectors are invalid:

```css
::slotted(div span) {
  /* our slotted <div> does not match this */
}

::slotted(div) p {
  /* can't go inside light DOM */
}
```

Also, `::slotted` can't be used in JavaScript `querySelector`. That's CSS only pseudo-class.

## Using CSS properties

How do we style a component in-depth?

Naturally, we can style its main element, `<custom-dialog>` or `<user-card>`, etc.

But how can we affect its internals? For instance, in `<user-card>` we'd like to allow the outer document change how user fields look.

Just as we expose methods to interact with our component, we can expose CSS variables (custom CSS properties) to style it.

**Custom CSS properties exist on all levels, both in light and shadow.**

For example, in shadow DOM we can use `--user-card-field-color` CSS variable to style fields:

```html
<style>
  .field {
    /* if --user-card-field-color is not defined, use black */
    color: var(--user-card-field-color, black);
  }
</style>
<div class="field">Name: <slot name="username"></slot></div>
<div class="field">Birthday: <slot name="birthday"></slot></div>
</style>
```

Then, we can declare this property in the outer document for `<user-card>`:

```css
user-card {
  --user-card-field-color: green;
}
```

Custom CSS properties pierce through shadow DOM, they are visible everywhere, so the inner `.field` rule will make use of it.

Here's the full example:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    .field {
      color: var(--user-card-field-color, black);
    }
  </style>
  <div class="field">Name: <slot name="username"></slot></div>
  <div class="field">Birthday: <slot name="birthday"></slot></div>
</template>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
  }
});
</script>

<style>
  user-card {
    --user-card-field-color: green;
  }
</style>
<user-card>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```



## Summary

Shadow DOM can include styles, such as `<style>` or `<link rel="stylesheet">`.

Local styles can affect:
- shadow tree,
- shadow host (from the outer document),
- slotted elements (from the outer document).

Document styles can affect:
- shadow host (as it's in the outer document)
- slotted elements and their contents (as it's physically in the outer document)

When CSS properties intersect, normally document styles have precedence, unless the property is labelled as `!important`. Then local styles have precedence.

CSS custom properties pierce through shadow DOM. They are used as "hooks" to style the component:

1. The component uses CSS properties to style key elements, such as `var(--component-name-title, <default value>)` for a title.
2. Component author publishes these properties for developers, they are same important as other public component methods.
3. When a developer wants to style a title, they assign `--component-name-title` CSS property for the shadow host (as in the example above) or one of its parents.
4. Profit!

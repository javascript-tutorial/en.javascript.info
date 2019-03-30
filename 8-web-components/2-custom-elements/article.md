
# Custom elements

We can create our own class for a custom HTML element with its own methods and properties, events and so on.

There are two kinds of custom elements:

1. **Autonomous custom elements** -- "all-new" elements, extending the abstract `HTMLElement` class.
2. **Customized built-in elements** -- extending built-in elements, like customized `HTMLButtonElement` etc.

First we'll see how autonomous elements are made, and then the customized built-in ones.

For a class to describe an element, it should support so-called "custom element reactions" -- methods that the browser calls when our element is created/added/removed from DOM.

That's easy, as there are only few of them. Here's a sketch with the full list:

```js
class MyElement extends HTMLElement {
  constructor() {
    // element created
  }

  connectedCallback() {
    // browser calls it when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    // browser calls it when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return [/* array of attribute names to monitor for changes */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }
}
```

Then we need to register the element:

```js
// let the browser know that <my-element> is served by our new class
customElements.define("my-element", MyElement);
```

Now for any new elements with tag `my-element`, an instance of `MyElement` is created, and the aforementioned methods are called.

```smart header="Custom element name must contain a hyphen `-`"
Custom element name must have a hyphen `-`, e.g. `my-element` and `super-button` are valid names, but `myelement` is not.

That's to ensure that there are no name conflicts between built-in and custom HTML elements.
```

## Example: "time-formatted"

For example, there already exists `<time>` element in HTML, for date/time. But it doesn't do any formatting by itself.

Let's create `<time-formatted>` element that does the formatting:


```html run height=50 autorun="no-epub"
<script>
class TimeFormatted extends HTMLElement {

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted
  datetime="2019-12-01"
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
```

As the result, `<time-formatted>` shows a nicely formatted time, according to the browser timezone and locale. We use the built-in [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) data formatter, well-supported across the browsers.

```smart header="Custom elements upgrade"
If the browser encounters any `<time-formatted>` elements before `customElements.define` call, they are yet unknown, just like any non-standard tag.

They can be styled with CSS selector `:not(:defined)`.

When `customElement.define` is called, they are "upgraded": a new instance of `TimeFormatted`
is created for each, and `connectedCallback` is called. They become `:defined`.

To track custom elements from JavaScript, there are methods:
- `customElements.get(name)` -- returns the class for a defined custom element with the given `name`,
- `customElements.whenDefined(name)` -- returns a promise that resolves (without value) when a custom element with the given `name` is defined.
```



```smart header="Rendering in `connectedCallback`, not in `constructor`"
In the example above, element content is rendered (created) in `connectedCallback`.

Why not in the `constructor`?

The reason is simple: when `constructor` is called, it's yet too early. The element instance is created, but not populated yet. We don't have attributes at this stage: calls to `getAttribute` always return `null`. So we can't really render there.

Besides, if you think about it, that's be tter performance-wise -- to delay the work until it's really needed.

The `connectedCallback` triggers when the element is in the document, not just appended to another element as a child. So we can build detached DOM, create elements and prepare them for later use. They will only be actually rendered when they make it into the page.
```

## Observing attributes

Please note that in the current implementation, after the element is rendered, further attribute changes don't have any effect. That's strange for an HTML element. Usually, when we change an attribute, like `a.href`, the change is immediately visible. So let's fix this.

We can observe attributes by providing their list in `observedAttributes()` static getter, and then update the element in `attributeChangedCallback`. It's called for changes only in the listed attributes for performance reasons.

```html run autorun="no-epub" height=50
<script>
class TimeFormatted extends HTMLElement {

*!*
  render() { // (1)
*/!*
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

*!*
  attributeChangedCallback(name, oldValue, newValue) { // (4)
*/!*
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
*!*
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
*/!*
</script>
```

1. The rendering logic is moved to `render()` helper method.
2. We call it once when the element is inserted into page.
3. For a change of an attribute, listed in `observedAttributes()`, `attributeChangedCallback` triggers.
4. ...and re-renders the element.
5. At the end, we can easily make a live timer.

## Rendering order

When HTML parser builds the DOM, elements are processed one after another, parents before children. E.g. is we have `<outer><inner></inner></outer>`, then `<outer>` is created and connected to DOM first, and then `<inner>`.

That leads to important side effects for custom elements.

For example, if a custom element tries to access `innerHTML` in `connectedCallback`, it gets nothing:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
    alert(this.innerHTML);
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

If you run it, the `alert` is empty.

That's exactly because there are no children on that stage, the DOM is unfinished yet. So, if we'd like to pass information to custom element, we can use attributes. They are available immediately.

Or, if we really need the children, we can defer access to them with zero-delay `setTimeout`.

This works:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    setTimeout(() => alert(this.innerHTML));
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Now in `setTimeout` we can get the contents of the element and finish the initialization.

On the other hand, this solution is also not perfect. If nested custom elements also use `setTimeout` to initialize themselves, then they queue up: the outer `setTimeout` triggers first, and then the inner one.

So the outer element finishes the initialization before the inner one.

For example:

```html run height=0
<script>
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} connected.`);
    setTimeout(() => alert(`${this.id} initialized.`));
  }
});
</script>

*!*
<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
*/!*
```

Output order:

1. outer connected.
2. inner connected.
2. outer initialized.
4. inner initialized.

If we'd like the outer element to wait for inner ones, then there's no built-in reliable solution. But we can invent one. For instance, inner elements can dispatch events like `initialized`, and outer ones can listen and react on them.

## Customized built-in elements

New custom elements like `<time-formatted>` don't have any associated semantics. They are totally new to search engines and accessibility devices.

We could use special [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes to describe the semantic. But if we're going to make a special button, why not extend a `<button>` element itself?

Built-in elements can be customized by inheriting from their classes. HTML buttons are instances of `HTMLButtonElement`, so let's extend it:

```html run autorun="no-epub"
<script>
// The button that says "hello" on click
class HelloButton extends HTMLButtonElement {
*!*
  constructor() { // (1)
*/!*
    super();
    this.addEventListener('click', () => alert("Hello!"));
  }
}

*!*
customElements.define('hello-button', HelloButton, {extends: 'button'}); // 2
*/!*
</script>

<!-- 3 -->
*!*
<button is="hello-button">Click me</button>
*/!*

<!-- 4 -->
*!*
<button is="hello-button" disabled>Disabled</button>
*/!*
```

1. We constructor add an event listener to the element. Please note: we must call `super()` before anything else (that's pure JS requirement).
2. To extend a built-in element, we must specify `{extends: '<tag>'}` in the define. Some tags share the same HTML class, so we need to be precise here.
3. Now we can use a regular `<button>` tag, labelled with `is="hello-button"`.
4. Our buttons extend built-in ones, so they retain the standard features like `disabled` attribute.


## Итого

Мы рассмотрели, как создавать свои DOM-элементы при помощи стандарта [Custom Elements](http://www.w3.org/TR/custom-elements/).

POLYFILL
Edge is a bit lagging behind, but there's a polyfill <https://github.com/webcomponents/webcomponentsjs> that covers

Далее мы перейдём к изучению дополнительных возможностей по работе с DOM.

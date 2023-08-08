# Introduction to browser events

*An event* is a signal that something has happened. All DOM nodes generate such signals (but events are not limited to DOM).

Here's a list of the most useful DOM events, just to take a look at:

**Mouse events:**
- `click` -- when the mouse clicks on an element (touchscreen devices generate it on a tap).
- `contextmenu` -- when the mouse right-clicks on an element.
- `mouseover` / `mouseout` -- when the mouse cursor comes over / leaves an element.
- `mousedown` / `mouseup` -- when the mouse button is pressed / released over an element.
- `mousemove` -- when the mouse is moved.

**Keyboard events:**
- `keydown` and `keyup` -- when a keyboard key is pressed and released.

**Form element events:**
- `submit` -- when the visitor submits a `<form>`.
- `focus` --  when the visitor focuses on an element, e.g. on an `<input>`.

**Document events:**
- `DOMContentLoaded` -- when the HTML is loaded and processed, DOM is fully built.

**CSS events:**
- `transitionend` -- when a CSS-animation finishes.

There are many other events. We'll get into more details of particular events in upcoming chapters.

## Event handlers

To react on events we can assign a *handler* -- a function that runs in case of an event.

Handlers are a way to run JavaScript code in case of user actions.

There are several ways to assign a handler. Let's see them, starting from the simplest one.

### HTML-attribute

A handler can be set in HTML with an attribute named `on<event>`.

For instance, to assign a `click` handler for an `input`, we can use `onclick`, like here:

```html run
<input value="Click me" *!*onclick="alert('Click!')"*/!* type="button">
```

On mouse click, the code inside `onclick` runs.

Please note that inside `onclick` we use single quotes, because the attribute itself is in double quotes. If we forget that the code is inside the attribute and use double quotes inside, like this:  `onclick="alert("Click!")"`, then it won't work right.

An HTML-attribute is not a convenient place to write a lot of code, so we'd better create a JavaScript function and call it there.

Here a click runs the function `countRabbits()`:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Rabbit number " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Count rabbits!">
```

As we know, HTML attribute names are not case-sensitive, so `ONCLICK` works as well as `onClick` and `onCLICK`... But usually attributes are lowercased: `onclick`.

### DOM property

We can assign a handler using a DOM property `on<event>`.

For instance, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Click me">
<script>
*!*
  elem.onclick = function() {
    alert('Thank you');
  };
*/!*
</script>
```

If the handler is assigned using an HTML-attribute then the browser reads it, creates a new function from the attribute content and writes it to the DOM property.

So this way is actually the same as the previous one.

These two code pieces work the same:

1. Only HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Click!')"*/!* value="Button">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Button">
    <script>
    *!*
      button.onclick = function() {
        alert('Click!');
      };
    */!*
    </script>
    ```

In the first example, the HTML attribute is used to initialize the `button.onclick`, while in the second example -- the script, that's all the difference.

**As there's only one `onclick` property, we can't assign more than one event handler.**

In the example below adding a handler with JavaScript overwrites the existing handler:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Before')" value="Click me">
<script>
*!*
  elem.onclick = function() { // overwrites the existing handler
    alert('After'); // only this will be shown
  };
*/!*
</script>
```

To remove a handler -- assign `elem.onclick = null`.

## Accessing the element: this

The value of `this` inside a handler is the element. The one which has the handler on it.

In the code below `button` shows its contents using `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Click me</button>
```

## Possible mistakes

If you're starting to work with events -- please note some subtleties.

We can set an existing function as a handler:

```js
function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
```

But be careful: the function should be assigned as `sayThanks`, not `sayThanks()`.

```js
// right
button.onclick = sayThanks;

// wrong
button.onclick = sayThanks();
```

If we add parentheses, then `sayThanks()` becomes a function call. So the last line actually takes the *result* of the function execution, that is `undefined` (as the function returns nothing), and assigns it to `onclick`. That doesn't work.

...On the other hand, in the markup we do need the parentheses:

```html
<input type="button" id="button" onclick="sayThanks()">
```

The difference is easy to explain. When the browser reads the attribute, it creates a handler function with body from the attribute content.

So the markup generates this property:
```js
button.onclick = function() {
*!*
  sayThanks(); // <-- the attribute content goes here
*/!*
};
```

**Don't use `setAttribute` for handlers.**

Such a call won't work:

```js run no-beautify
// a click on <body> will generate errors,
// because attributes are always strings, function becomes a string
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM-property case matters.**

Assign a handler to `elem.onclick`, not `elem.ONCLICK`, because DOM properties are case-sensitive.

## addEventListener

The fundamental problem of the aforementioned ways to assign handlers is that we *can't assign multiple handlers to one event*.

Let's say, one part of our code wants to highlight a button on click, and another one wants to show a message on the same click.

We'd like to assign two event handlers for that. But a new DOM property will overwrite the existing one:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // replaces the previous handler
```

Developers of web standards understood that long ago and suggested an alternative way of managing handlers using the special methods `addEventListener` and `removeEventListener` which aren't bound by such constraint.

The syntax to add a handler:

```js
element.addEventListener(event, handler, [options]);
```

`event`
: Event name, e.g. `"click"`.

`handler`
: The handler function.

`options`
: An additional optional object with properties:
    - `once`: if `true`, then the listener is automatically removed after it triggers.
    - `capture`: the phase where to handle the event, to be covered later in the chapter <info:bubbling-and-capturing>. For historical reasons, `options` can also be `false/true`, that's the same as `{capture: false/true}`.
    - `passive`: if `true`, then the handler will not call `preventDefault()`, we'll explain that later in <info:default-browser-action>.

To remove the handler, use `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="Removal requires the same function"
To remove a handler we should pass exactly the same function as was assigned.

This doesn't work:

```js no-beautify
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

The handler won't be removed, because `removeEventListener` gets another function -- with the same code, but that doesn't matter, as it's a different function object.

Here's the right way:

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Please note -- if we don't store the function in a variable, then we can't remove it. There's no way to "read back" handlers assigned by `addEventListener`.
````

Multiple calls to `addEventListener` allow it to add multiple handlers, like this:

```html run no-beautify
<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Thanks!');
  };

  function handler2() {
    alert('Thanks again!');
  }

*!*
  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
*/!*
</script>
```

As we can see in the example above, we can set handlers *both* using a DOM-property and `addEventListener`. But generally we use only one of these ways.

````warn header="For some events, handlers only work with `addEventListener`"
There exist events that can't be assigned via a DOM-property. Only with `addEventListener`.

For instance, the `DOMContentLoaded` event, that triggers when the document is loaded and the DOM has been built.

```js
// will never run
document.onDOMContentLoaded = function() {
  alert("DOM built");
};
```

```js
// this way it works
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built");
});
```
So `addEventListener` is more universal. Although, such events are an exception rather than the rule.
````

## Event object

To properly handle an event we'd want to know more about what's happened. Not just a "click" or a "keydown", but what were the pointer coordinates? Which key was pressed? And so on.

When an event happens, the browser creates an *event object*, puts details into it and passes it as an argument to the handler.

Here's an example of getting pointer coordinates from the event object:

```html run
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Some properties of `event` object:

`event.type`
: Event type, here it's `"click"`.

`event.currentTarget`
: Element that handled the event. That's exactly the same as `this`, unless the handler is an arrow function, or its `this` is bound to something else, then we can get the element from  `event.currentTarget`.

`event.clientX` / `event.clientY`
: Window-relative coordinates of the cursor, for pointer events.

There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events - another one, we'll study them later when as we move on to the details of different events.

````smart header="The event object is also available in HTML handlers"
If we assign a handler in HTML, we can also use the `event` object, like this:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

That's possible because when the browser reads the attribute, it creates a handler like this:  `function(event) { alert(event.type) }`. That is: its first argument is called `"event"`, and the body is taken from the attribute.
````


## Object handlers: handleEvent

We can assign not just a function, but an object as an event handler using `addEventListener`. When an event occurs, its `handleEvent` method is called.

For instance:


```html run
<button id="elem">Click me</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

As we can see, when `addEventListener` receives an object as the handler, it calls `obj.handleEvent(event)` in case of an event.

We could also use objects of a custom class, like this:


```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Here the same object handles both events. Please note that we need to explicitly setup the events to listen using `addEventListener`. The `menu` object only gets `mousedown` and `mouseup` here, not any other types of events.

The method `handleEvent` does not have to do all the job by itself. It can call other event-specific methods instead, like this:

```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Mouse button pressed";
    }

    onMouseup() {
      elem.innerHTML += "...and released.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Now event handlers are clearly separated, that may be easier to support.

## Summary

There are 3 ways to assign event handlers:

1. HTML attribute: `onclick="..."`.
2. DOM property: `elem.onclick = function`.
3. Methods: `elem.addEventListener(event, handler[, phase])` to add, `removeEventListener` to remove.

HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can't write lots of code in there.

DOM properties are ok to use, but we can't assign more than one handler of the particular event. In many cases that limitation is not pressing.

The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance `transitionend` and `DOMContentLoaded` (to be covered). Also `addEventListener` supports objects as event handlers. In that case the method `handleEvent` is called in case of the event.

No matter how you assign the handler -- it gets an event object as the first argument. That object contains the details about what's happened.

We'll learn more about events in general and about different types of events in the next chapters.

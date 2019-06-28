# Dispatching custom events

We can not only assign handlers, but also generate events from JavaScript.

Custom events can be used to create "graphical components". For instance, a root element of the menu may trigger events telling what happens with the menu: `open` (menu open),  `select` (an item is selected) and so on.

Also we can generate built-in events like `click`, `mousedown` etc, that may be good for testing.

## Event constructor

Events form a hierarchy, just like DOM element classes. The root is the built-in [Event](http://www.w3.org/TR/dom/#event) class.

We can create `Event` objects like this:

```js
let event = new Event(event type[, options]);
```

Arguments:

- *event type* -- may be any string, like `"click"` or our own like `"hey-ho!"`.
- *options* -- the object with two optional properties:
  - `bubbles: true/false` -- if `true`, then the event bubbles.
  - `cancelable: true/false` -- if `true`, then the "default action"  may be prevented. Later we'll see what it means for custom events.

  By default both are false: `{bubbles: false, cancelable: false}`.

## dispatchEvent

After an event object is created, we should "run" it on an element using the call  `elem.dispatchEvent(event)`.

Then handlers react on it as if it were a regular built-in event. If the event was created with the `bubbles` flag, then it bubbles.

In the example below the `click` event is initiated in JavaScript. The handler works same way as if the button was clicked:

```html run no-beautify
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
There is a way to tell a "real" user event from a script-generated one.

The property `event.isTrusted` is `true` for events that come from real user actions and `false` for script-generated events.
```

## Bubbling example

We can create a bubbling event with the name `"hello"` and catch it on `document`.

All we need is to set `bubbles` to `true`:

```html run no-beautify
<h1 id="elem">Hello from the script!</h1>

<script>
  // catch on document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });

  // ...dispatch on elem!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);
</script>
```

Notes:

1. We should use `addEventListener` for our custom events, because `on<event>` only exists for built-in events, `document.onhello` doesn't work.
2. Must set `bubbles:true`, otherwise the event won't bubble up.

The bubbling mechanics is the same for built-in (`click`) and custom (`hello`) events. There are also capturing and bubbling stages.

## MouseEvent, KeyboardEvent and others

Here's a short list of classes for UI Events from the [UI Event specification](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

We should use them instead of `new Event` if we want to create such events. For instance, `new MouseEvent("click")`.

The right constructor allows to specify standard properties for that type of event.

Like `clientX/clientY` for a mouse event:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

Please note: the generic `Event` constructor does not allow that.

Let's try:

```js run
let event = new Event("click", {
  bubbles: true, // only bubbles and cancelable
  cancelable: true, // work in the Event constructor
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, the unknown property is ignored!
*/!*
```

Technically, we can work around that by assigning directly `event.clientX=100` after creation. So that's a matter of convenience and following the rules. Browser-generated events always have the right type.

The full list of properties for different UI events is in the specification, for instance  [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).

## Custom events

For our own, custom events like `"hello"` we should use `new CustomEvent`. Technically [CustomEvent](https://dom.spec.whatwg.org/#customevent) is the same as `Event`, with one exception.

In the second argument (object) we can add an additional property `detail` for any custom information that we want to pass with the event.

For instance:

```html run refresh
<h1 id="elem">Hello for John!</h1>

<script>
  // additional details come with the event to the handler
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  }));
</script>
```

The `detail` property can have any data. Technically we could live without, because we can assign any properties into a regular `new Event` object after its creation. But `CustomEvent` provides the special `detail` field for it to evade conflicts with other event properties.

The event class tells something about "what kind of event" it is, and if the event is custom, then we should use `CustomEvent` just to be clear about what it is.

## event.preventDefault()

We can call `event.preventDefault()` on a script-generated event if `cancelable:true` flag is specified.

Of course, if the event has a non-standard name, then it's not known to the browser, and there's no "default browser action" for it.

But the event-generating code may plan some actions after `dispatchEvent`.

The call of `event.preventDefault()` is a way for the handler to send a signal that those actions shouldn't be performed.

In that case the call to `elem.dispatchEvent(event)` returns `false`. And the event-generating code knows that the processing shouldn't continue.

For instance, in the example below there's a `hide()` function. It generates the `"hide"` event on the element `#rabbit`, notifying all interested parties that the rabbit is going to hide.

A handler set by `rabbit.addEventListener('hide',...)` will learn about that and, if it wants, can prevent that action by calling `event.preventDefault()`. Then the rabbit won't hide:

```html run refresh
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>

<script>
  // hide() will be called automatically in 2 seconds
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // without that flag preventDefault doesn't work
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('the action was prevented by a handler');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });

  // hide in 2 seconds
  setTimeout(hide, 2000);

</script>
```


## Events-in-events are synchronous

Usually events are processed asynchronously. That is: if the browser is processing `onclick` and in the process a new event occurs, then it awaits till `onclick` processing is finished.

The exception is when one event is initiated from within another one.

Then the control jumps to the nested event handler, and after it goes back.

For instance, here the nested `menu-open` event is processed synchronously, during the `onclick`:

```html run
<button id="menu">Menu (click me)</button>

<script>
  // 1 -> nested -> 2
  menu.onclick = function() {
    alert(1);

    // alert("nested")
    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```    

Please note that the nested event `menu-open` bubbles up and is handled on the `document`. The propagation of the nested event is fully finished before the processing gets back to the outer code (`onclick`).

That's not only about `dispatchEvent`, there are other cases. JavaScript in an event handler can call methods that lead to other events -- they are too processed synchronously.

If we don't like it, we can either put the `dispatchEvent` (or other event-triggering call) at the end of `onclick` or wrap it in zero-delay `setTimeout`:

```html run
<button id="menu">Menu (click me)</button>

<script>
  // Now the result is: 1 -> 2 -> nested
  menu.onclick = function() {
    alert(1);

    // alert(2)
    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```    

Now `dispatchEvent` runs asynchronously after the current code execution is finished, including `mouse.onclick`, so event handlers are totally separate.

## Summary

To generate an event, we first need to create an event object.

The generic `Event(name, options)` constructor accepts an arbitrary event name and the `options` object with two properties:
  - `bubbles: true` if the event should bubble.
  - `cancelable: true` if the `event.preventDefault()` should work.

Other constructors of native events like `MouseEvent`, `KeyboardEvent` and so on accept properties specific to that event type. For instance, `clientX` for mouse events.

For custom events we should use `CustomEvent` constructor. It has an additional option named `detail`, we should assign the event-specific data to it. Then all handlers can access it as `event.detail`.

Despite the technical possibility to generate browser events like `click` or `keydown`, we should use with the great care.

We shouldn't generate browser events as it's a hacky way to run handlers. That's a bad architecture most of the time.

Native events might be generated:

- As a dirty hack to make 3rd-party libraries work the needed way, if they don't provide other means of interaction.
- For automated testing, to "click the button" in the script and see if the interface reacts correctly.

Custom events with our own names are often generated for architectural purposes, to signal what happens inside our menus, sliders, carousels etc.

# Events: change, input, cut, copy, paste

Let's cover various events that accompany data updates.

## Event: change

The `change` event triggers when the element has finished changing.

For text inputs that means that the event occurs when it loses focus.

For instance, while we are typing in the text field below -- there's no event. But when we move the focus somewhere else, for instance, click on a button -- there will be a `change` event:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

For other elements: `select`, `input type=checkbox/radio` it triggers right after the selection changes:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```


## Event: input

The `input` event triggers every time after a value is modified by the user.

Unlike keyboard events, it triggers on any value change, even those that does not involve keyboard actions: pasting with a mouse or using speech recognition to dictate the text.

For instance:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

If we want to handle every modification of an `<input>` then this event is the best choice.

On the other hand, `input` event doesn't trigger on keyboard input and other actions that do not involve value change, e.g. pressing arrow keys `key:⇦` `key:⇨` while in the input.

```smart header="Can't prevent anything in `oninput`"
The `input` event occurs after the value is modified.

So we can't use `event.preventDefault()` there -- it's just too late, there would be no effect.
```

## Events: cut, copy, paste

These events occur on cutting/copying/pasting a value.

They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is cut/copied/pasted.

We also can use `event.preventDefault()` to abort the action, then nothing gets copied/pasted.

For instance, the code below prevents all `cut/copy/paste` events and shows the text we're trying to cut/copy/paste:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>
```

Please note: inside `cut` and `copy` event handlers a call to  `event.clipboardData.getData(...)` returns an empty string. That's because technically the data isn't in the clipboard yet. If we use `event.preventDefault()` it won't be copied at all.

So the example above uses `document.getSelection()` to get the selected text. You can find more details about document selection in the article <info:selection-range>.

It's possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's a bit beyond our scope now, but you can find its methods in the [DataTransfer specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Also, there's an additional asynchronous API of accessing the clipboard: `navigator.clipboard`. More about it in the specification [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [not supported by Firefox](https://caniuse.com/async-clipboard).

### Safety restrictions

The clipboard is a "global" OS-level thing. A user may switch between various applications, copy/paste different things, and a browser page shouldn't see all that.

So most browsers allow seamless read/write access to the clipboard only in the scope of certain user actions, such as copying/pasting etc.

It's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such "syntetic" events must not provide access to the clipboard.

Even if someone decides to save `event.clipboardData` in an event handler, and then access it later -- it won't work.

To reiterate, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) works solely in the context of user-initiated event handlers.

On the other hand, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) is the more recent API, meant for use in any context. It asks for user permission, if needed.

## Summary

Data change events:

| Event | Description | Specials |
|---------|----------|-------------|
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives access to the clipboard. All browsers except Firefox also support `navigator.clipboard`. |

# Events: change, input, cut, copy, paste

Let's discuss various events that accompany data updates.

## Event: change

The [change](http://www.w3.org/TR/html5/forms.html#event-input-change) event triggers when the element has finished changing.

For text inputs that means that the event occurs when it loses focus.

For instance, while we are typing in the text field below -- there's no event. But when we move the focus somewhere else, for instance, click on a button -- there will be a `change` event:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

For other elements: `select`, `input type=checkbox/radio` it triggers right after the selection changes.

## Event: input

The `input` event triggers every time a value is modified.

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

They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is copied/pasted.

We also can use `event.preventDefault()` to abort the action.

For instance, the code below prevents all such events and shows what we are trying to cut/copy/paste:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

Technically, we can copy/paste everything. For instance, we can copy a file in the OS file manager, and paste it.

There's a list of methods [in the specification](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) to work with different data types, read/write to the clipboard.

But please note that clipboard is a "global" OS-level thing. Most browsers allow read/write access to the clipboard only in the scope of certain user actions for the safety. Also it is forbidden to create "custom" clipboard events in all browsers except Firefox.

## Summary

Data change events:

| Event | Description | Specials |
|---------|----------|-------------|
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives read/write access to the clipboard. |

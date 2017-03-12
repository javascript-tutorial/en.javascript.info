# Keyboard: keydown and keyup

Let's study keyboard events now.

Before we start, please note that on modern devices there are other ways to "input something" then just a keyboard. For instance, people use speech recognition (tap microphone, say something, see it entered) or copy/paste with a mouse.

So if we want to track any input into an `<input>` field, then keyboard events is not enough. There's another event named `input` to handle changes of an `<input>` field, by any means. And it may be a better choice for such task. We'll cover it a bit later [todo link].

Keyboard events should be used when we want to handle keyboard actions (virtual keyboard usually also counts). For instance, to react on arrow keys `key:Up` and `key:Down` or hotkeys (including combinations of keys).

[cut]


## Teststand [#keyboard-test-stand]

```offline
To better understand keyboard events, you can use the [teststand](sandbox:keyboard-dump).
```

```online
To better understand keyboard events, you can use the teststand below.

Try different key combinations in the text field.

[codetabs src="keyboard-dump" height=480]
```

As you read on, if you want to try things out -- return to the stand and press keys.


## Keydown and keyup

The `keydown` events happens when a key is pressed, and then `keyup` -- when it's released.

### event.code and event.key

The `key` property of the event object allows to get the character, while the `code` property of the event object allows to get the "physical key code".

For instance, the same key `key:Z` can be pressed with or without `Shift`. That gives us two different characters: a lowercase and uppercase `z`, right?

The `event.key` is exactly the character, and it will be different. But `event.code` is the same:

| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:Z`      |`z` (lowercase)         |`KeyZ`        |
| `key:Shift+Z`|`Z` (uppercase)          |`KeyZ`        |

```smart header="\"KeyZ\" and other key codes"
Key codes like `"KeyZ"` in the example above are described in the [UI Events code specification](https://www.w3.org/TR/uievents-code/).

For instance:
- Letter keys have codes `"Key<letter>"`
- Special keys are coded by their names: `"Enter"`, `"Backspace"`, `"Tab"` etc.

See [alphanumeric section](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section) for more examples, or just try the [teststand](#keyboard-test-stand) above.
```

```warn header="Case matters: `\"KeyZ\"`, not `\"keyZ\"`"
Seems obvious, but people still make mistakes.

Please evade mistypes: it's `KeyZ`, not `keyZ`. The check like `event.code=="keyZ"` won't work: the first letter of `"Key"` must be uppercase.
```

If a user works with different languages, then switching to another language would make a totally different character instead of `"Z"`. That will become the value of `event.key`, while `event.code` is always the same: `"KeyZ"`.

What is a key does not give any character? For instance, `key:Shift` or `key:Tab` or others. For those keys `event.key` is approximately the same as `event.code`:


| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:Tab`      |`Tab`          |`Tab`        |
| `key:F1`      |`F1`          |`F1`        |
| `key:Backspace`      |`Backspace`          |`Backspace`        |
| `key:Shift`|`Shift`          |`ShiftRight` or `ShiftLeft`        |

Please note that `event.code` specifies exactly which key is pressed. For instance, most keyboards have two `key:Shift` keys: on the left and on the right side. The `event.code` tells us exactly which one was pressed, and `event.key` is responsible for the "meaning" of the key: what it is (a "Shift").

Let's say, we want to handle a hotkey: `key:Ctrl+Z` (or `key:Cmd+Z` for Mac). That's an "undo" action in most text editors. We can set a listener on `keydown` and check which key is pressed -- to detect when we have the hotkey.

How do you think, should we check the value of `event.key` or `event.code`?

Please, pause and answer.

Made up your mind?

If you've got an understanding, then the answer is, of course, `event.code`, and we don't want `event.key` here. The value of `event.key` can change depending on the language or `CapsLock` enabled. The value of `event.code` is strictly bound to the key, so here we go:

```js run
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Undo!')
  }
});
```

## Auto-repeat

If a key is being pressed for a long enough time, it starts to repeat: the `keydown` triggers again and again, and then when it's released we finally get `keyup`. So it's kind of normal to have many `keydown` and a single `keyup`.

For all repeating keys the event object has `event.return=true`.


## Default actions

Default actions vary, as there are many possible things that may be initiated by keyboard:

For instance:

- A character appears on the screen (the most obvious one).
- A character is deleted (`key:Delete` key).
- The page is scrolled (`key:PageDown` key).
- The browser opens the "Save Page" dialog (`key:Ctrl+S`)
-  ...and so on.

Preventing the default actions cancels most of them, with the sole exception of OS-based special keys.

For instance, on Windows `key:Alt+F4` closes the current browser window. And there's no way to stop it by preventing the default action in JavaScript.

For instance, we can't use keyboard to enter something into the `<input>` below:

```html run
<input *!*onkeydown="return false"*/!* placeholder="No keyboard input" type="text">
```

If we type-in something, it's just ignored. Please note that special combinations like `Ctrl+V` (paste) also don't work. But using a mouse and right-click + Paste still can add the text. So checking in `keydown` doesn't work as a 100% reliable filter.

## Legacy

In the past, there was a `keypress` event, and also `keyCode`, `charCode`, `which` properties of the event object.

But there were so many incompatibilities between browsers that all of them are deprecated and removed from the standard. So the old code still works (and sometimes works around a bunch of quirks), but there's totally no need to use those any more.

There was time when this chapter included their detailed description. But as of now we can forget about those.


## Summary

All keys yield keyboard events -- be it symbol keys or special keys like `key:Shift` or `key:Ctrl`.

The only exception is `key:Fn` key that is sometimes present on laptop keyboards. There's no keyboard event for it, because it's often implemented on lower-level than OS.

Keyboard events:

- `keydown` -- on press the key (auto-repeats if the key is pressed for long),
- `keyup` -- on releasing the key.

Main keyboard event properties:

- `code` -- the "key code", specific to the physical location of the key on keyboard.
- `key` -- the character, for non-character keys a "code value", usually same as `code`.

In the past, keyboard events were sometimes used to track user input in form fields. That's not the case any more, because we have `input` and `change` events for that (to be covered later). They are better, because they work for all ways of input, including mouse or speech recognition.

We still should use them when we really want keyboard. For example, to react on hotkeys or special keys.

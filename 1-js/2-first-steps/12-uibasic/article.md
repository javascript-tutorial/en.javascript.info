# Interaction: alert, prompt, confirm

This chapter covers basic UI operations: `alert`, `prompt` and `confirm`. They allow to ask a visitor for the input and show the results.

They are browser-specific. For other environments like Node.JS there are other ways of getting the information. Also they are very simple, so we can use them for the start.

[cut]

## alert

Syntax:

```js
alert(message)
```

This shows a message and pauses the script execution until the user presses "OK".

For example:

```js run
alert( "Hello" );
```

The small window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons etc, until he deals with the window. In this case -- until he presses "OK".

## prompt

Function `prompt` accepts two arguments:

```js no-beautify
result = prompt(title, default);
```

It shows a modal window with the given `title`, a field for text, initially filled with the `default` string and buttons OK/CANCEL.

The visitor may type something in the field and press OK. Or he can cancel the input by pressing a CANCEL button or the `key:Esc` key.

The call to `prompt` returns the text from the field or `null` if te input is canceled.

```warn header="Safari does not return `null`"
Safari returns an empty string instead of `null` on cancellation. So we can't be sure whether the user actually entered an empty line or he cancelled the input.

A compatible practice is to treat both an empty line and `null` the same, as a cancellation.
```

As with `alert`, the `prompt` window is modal.

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old! 
```

````warn header="IE: always supply a `default`"
The second parameter is optional. But if we don't supply it, Internet Explorer would insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see that:

```js run
let test = prompt("Test");
```

So, to look good in IE, it's recommended to always provide the second argument:

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

The syntax:

```js
result = confirm(question);
```

Function `confirm` shows a modal window with a `question` and two buttons: OK and CANCEL.

The result is `true` if OK is pressed and `false` otherwise.

For example:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true is OK is pressed
```

## Summary

`alert`
: shows a message.

`prompt`
: shows a message asking the user to input text. It returns the text or, if CANCEL or `key:Esc` is clicked, all browsers except Safari return `null`.

`confirm` 
: shows a message and waits the user to press "OK" or "CANCEL". It returns `true` for OK and `false` for CANCEL/`key:Esc`.

There are two limitations shared by all the methods above:

1. The exact location of the modal window is determined by the browser. Usually it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.

That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, but if "bells and whistles" do not matter much, these methods work just fine.

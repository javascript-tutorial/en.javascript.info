importance: 5

---

# Modal form

Create a function `showPrompt(html, callback)` that shows a form with the message `html`, an input field and buttons `OK/CANCEL`.

- A user should type something into a text field and press `key:Enter` or the OK button, then `callback(value)` is called with the value they entered.
- Otherwise if the user presses `key:Esc` or CANCEL, then `callback(null)` is called.

In both cases that ends the input process and removes the form.

Requirements:

- The form should be in the center of the window.
- The form is *modal*. In other words, no interaction with the rest of the page is possible until the user closes it.
- When the form is shown, the focus should be inside the `<input>` for the user.
- Keys `key:Tab`/`key:Shift+Tab` should shift the focus between form fields, don't allow it to leave for other page elements.

Usage example:

```js
showPrompt("Enter something<br>...smart :)", function(value) {
  alert(value);
});
```

A demo in the iframe:

[iframe src="solution" height=160 border=1]

P.S. The source document has HTML/CSS for the form with fixed positioning, but it's up to you to make it modal.

importance: 3

---

# Check the login

Write the code which asks for a login with `prompt`.

If the visitor enters `"Admin"`, then `prompt` for a password, if the input is an empty line or `key:Esc` -- show "Canceled", if it's another string -- then show "I don't know you".

The password is checked as follows:

- If it equals "TheMaster", then show "Welcome!",
- Another string -- show "Wrong password",
- For an empty string or cancelled input, show "Canceled"

The schema:

![](ifelse_task.svg)

Please use nested `if` blocks. Mind the overall readability of the code.

Hint:  passing an empty input to a prompt returns an empty string `''`. Pressing `key:ESC` during a prompt returns `null`.

[demo]

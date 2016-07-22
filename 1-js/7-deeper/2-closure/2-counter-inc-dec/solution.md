
The solution is to write addition methods right into the `counter`. They share the same outer lexical environment and also can access the current `count`.

This trick is often used for Javascript libraries like lodash, jQuery and others. They provide a function that has other functions as properties.

Actually, they do it to less pollute the global space, so that a single library gives only one global variable. That lowers the chance of possible naming conflicts.
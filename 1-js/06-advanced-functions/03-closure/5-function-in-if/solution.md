The result is **an error**.

The function `sayHi` is declared inside the `if`, so it only lives inside it. There is no `sayHi` outside.

However, in non-strict mode and some browsers, you may have different behavior of block-scoped functions as they have a rather complicated history. See more in MDN: ["Block-level functions"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#Block-level_functions) and ["Conditionally created functions"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#Conditionally_created_functions).

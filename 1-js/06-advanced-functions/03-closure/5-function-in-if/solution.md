With `'use strict'`:

An error occurs: `ReferenceError: sayHi is not defined`.
The function `sayHi` is declared inside the block (`if`), so it only exists within that block.
In strict mode, functions declared inside a block have block-level scope, similar to variables declared with let or const.

Without `'use strict'`:

The function `sayHi` is accessible outside the block. This is because, in non-strict mode (and older JavaScript specifications before ES6), functions declared inside blocks like `if`, `for`, etc.,
are hoisted to the nearest function or global scope, making them accessible outside the block.

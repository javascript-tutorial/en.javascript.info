The result might or might not throw **an error**.

According to JS decalaration - 
The function `sayHi` is declared inside the `if`, so it only lives inside it(block scoped). There is no `sayHi` outside but, block scoping was introduced in ES6 and engines like V8 were written much prior to that where function and var hoisting is almost similar that is they are function scoped and not block scoped. These engines are not changing this behaviour as they think it may cause issues to exisiting applications.

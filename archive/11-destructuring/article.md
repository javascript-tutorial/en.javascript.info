# Destructuring

Destructuring assignment is a special syntax for assignments that allows to immediately split an array or a complex object into variables.

[cut]

## Array destructuring

An example of how the array is destructured into variables:

```js
// we have an array with the name and surname
let arr = ["Ilya", "Kantor"]

*!*
// destructuring assignment
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

The destructuring assignment puts the first value of the array into the variable `firstName` and the second one into `surname`. Any other array elements (if exist) are ignored. 

Note that the array itself is not modified in the process. 

````smart header="Ignore first elements"
Unwanted elements of the array can also be thrown away via an extra comma:

```js run
*!*
// first and second elements are not needed
let [, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Imperator
```

In the code above, the first and second elements of the array are skipped, the third one is assigned to `title`, and the rest is also skipped.
````

### The rest operator

If we want to get all following values of the array, but are not sure of their number -- we can add one more parameter that gets "the rest" using the rest operator `"..."` (three dots):

```js run
*!*
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert(name1); // Julius
alert(name2); // Caesar
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic 
```

The value of `rest` is the array of the remaining array elements. We can use any other variable name in place of `rest`, the operator is three dots. It must be the last element of the destructuring assignment.

### The default values

The there are less values in the array than variables in the assignment -- there will be no error, absent values are considered undefined:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
```

If we want a "default" value to take place of the absent one, we can provide it using `=`:

```js run
*!*
// default values
let [name="Guest", surname="Anonymous"] = [];
*/!*

alert(name); // Guest
alert(surname);  // Anonymous
```

Note that default values can be more complex expressions. They are evaluated only if the value is not provided.

## Object destructuring

The destructuring assignment also works with objects. 

The basic syntax is:

```js
let {var1, var2} = {var1:…, var2…}
```

We have an existing object at the right side, that we want to split into variables. To the left side is the list of variables for corresponding properties.

For instance:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Properties `options.title`, `options.width` and `options.height` are automcatically assigned to the corresponding variables. The order of propertiies does not matter, that works too:

```js
// let {title, width, height}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

If we want to assign a property to a variable with another name, for instance, `options.width` to go into the variable named `w`, then it should be set after a colon:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { source property: target variable }
let {width: w, height: h, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

The colon shows "what : goes where". In the example above the property `width` goes to `w`, property `height` goes to `h`, and `title` is assigned to the same name.

If some properties are absent, we can set default values using `=`, like this:

```js run
let options = {
  title: "Menu"
};

*!*
let {width=100, height=200, title} = options;
*/!*

alert(title);  // Меню
alert(width);  // 100
alert(height); // 200
```

We also can combine both the colon and equality:

```js run
let options = {
  title: "Menu"
};

*!*
let {width:w=100, height:h=200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

What if the object has more properties than we have variables? Can we assign the "rest" somewhere, like we do with arrays?

Unfortunately, the current specification does not support that feature. There is a proposal, but it's not in the standard yet.

````smart header="Destructuring without `let`"
In the examples above variables were declared right before the assignment: `let {…} = {…}`. Of course, we could use the existing variables too. But there's a catch.

This won't work:
```js run
let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

The problem is that Javascript treats `{...}` in the main code flow (not inside another expression) as a code block. Such standalone code blocks are rarely used, but in theory can group statements, like this:

```js run
{
  // a code block
  let message = "Hello";
  // ...
  alert( message ); 
}
```

To show Javascript that it's not a code block, we can wrap the whole assignment in brackets `(...)`:


```js run
let title, width, height;

// okay now
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Nested destructuring

If an object or an array contain other objects and arrays, we can go deeper in the destructuring assignment.

In the code below `options` has another object in the property `size` and an array in the property `items`. The destructuring assignment has the same structure:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"]
}

// destructuring assignment on multiple lines for clarity
let { 
  size: { // put size here
    width, 
    height
  }, 
  items: [item1, item2], // assign items here
  title = "Menu" // an extra property (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

As we can see, the whole `options` object is correctly assigned to variables.

The left part of the destructuring assignment can combine and nest things as needed.

## Summary

- Destructuring assignment allows to instantly map an object or array into many variables.
- The object syntax:
    ```js
    let {prop : varName = default, ...} = object
    ```

    This means that property `prop` should go into the variable `varName` and, if no such property exists, then `default` value should be used. 

- The array syntax:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    The first item goes to `item1`, the second goes into `item2`, all the rest makes the array `rest`.

- For more complex cases, the left side must have the same structure as the right one.





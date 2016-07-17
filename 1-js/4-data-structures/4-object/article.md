# Objects as dictionaries

Objects in JavaScript combine two functionalities.

1. First -- they are "associative arrays": a structure for storing keyed data. 
2. Second -- they provide features for object-oriented programming like inheritance. 

Here we concentrate on the first part: using objects as a data store, and we will study it in-depth. That's the required base for studying the second part.

Let's recap what we know about objects and add a bit more.


[cut]

## Object literals

We can imagine it as a cabinet with signed files. Every piece of data is stored in it's file. It's easy to find a file by it's name or add/remove a file.

![](object.png)

An empty object ("empty cabinet") can be created using one of two syntaxes:

```js
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax
```

![](object-user-empty.png)

Usually, the figure brackets `{...}` are used, they are more powerful shorter. The declaration is called an *object literal*.

We can set properties immediately:

```js 
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // multiword property name must be quoted
}; 
```

![](object-user-props.png)

In real code we quite often want to create an object with a property from a variable.

For instance:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age;
  }
}

let user = makeUser("John", 30);
alert(user.name); // John
```

There's a *property value shorthand* to make it shorter. 

Instead of `name: name` we can just write `name`, like this:

```js
function makeUser(name, age) {
  return {
    name,
    age;
  }
}
```

We can also combine normal properties and shorthands:

```js
let user = { 
  name,  // same as name:name
  age: 30 
};
```


````smart header="Trailing comma"
The last property may end with a comma:
```js 
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
That is called a "trailing" or "hanging" comma. Makes it easier to add/move/remove properties, because all lines become alike.
````

## Accessing a property

To access a property, there are two syntaxes:

- The dot notation: `user.name`
- Square brackets: `user["name"]`

The dot notation requires the name to be a valid variable identifier, that is: no spaces, special chracters etc. Square brackets are more powerful, because they allow to specify an arbitrary string as a property name. Also, square brackets is the only choice when the name of the property is in a variable.

For instance:

```js run
let user = {
  name: "John", 
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// access by variable
alert( user[key] ); // John (if enter "name")
```

The square brackets mean: "take the property name from the variable".

Square brackets also can be used in an object literal.

That's called a *computed property*:

```js run
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
};

alert( bag.apple ); // 5 if fruit="apple"
```

Here, the object `bag` is created with a property with the name from `fruit` variable and the value `5`.

Essentially, that works the same as:
```js
let bag = {};
bag[fruit] = 5; 
```

We could have used a more complex expression inside square brackets or a quoted string. Anything that would return a property name:

```js
let fruit = 'apple';
let bag = {
  [ fruit.toUpperCase() ]: 5 // bag.APPLE = 5
};
```


````smart header="Property name must be either a string or a symbol"
We can only use strings or symbols as property names.

Other values are converted to strings, for instance:

```js run
let obj = {
  0: "test" // same as "0": "test"
}

// bot alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```
````


````smart header="Reserved words are allowed as property names"
A variable cannot have a name equal to one of language-reserved words like "for", "let", "return" etc.

But for an object property, there's no such restruction. Any name is fine:

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
}

alert( obj.for + obj.let + obj.return );  // 6
```

Basically, any name is allowed, with one exclusion: `__proto__`. 

The built-in property named `__proto__` has a special functionality (we'll cover it later), and it can't be set to a non-object value:

```js run
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); // [object Object], didn't work as intended
```

As you we see from the code, an assignment to a primitive is ignored. If we want to store *arbitrary* (user-provided) keys, then such behavior can be the source of bugs and even vulnerabilities, because it's unexpected. There's another data structure [Map](info:map-set-weakmap-weakset), that we'll learn in the chapter <info:map-set-weakmap-weakset>, which supports arbitrary keys.
````

## Removing a property

There's a `delete` operator for that:

```js
delete user.name;
```

## Existance check

A notable objects feature is that it's possible to access any property. There will be no error if the property doesn't exist! Accessing a non-existing property just returns `undefined`. It provides a very common way to test whether the property exists -- to get it and compare vs undefined:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true means "no such property"
```

There also exists a special operator `"in"` to check for the existance of a property. 

The syntax is: 
```js
"key" in object
```

For instance:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist
```

Please note that at the left side of `in` there must be a *property name*. That's usually a quoted string. 

If we omit quotes, that would mean a variable containing the actual name to be tested. For instance:

```js run
let user = { age: 30 };

let key = "age";
alert( key in user ); // true, takes the value of key and checks for such property
```

````smart header="Using \"in\" for properties that store `undefined`"
There is a case when `"=== undefined"` check fails, but the `"in"` operator works correctly.

It's when an object property stores `undefined`:

```js run
let obj = { 
  test: undefined 
}; 

alert( obj.test ); // undefined, no such property?

alert( "test" in obj ); // true, the property does exist!
```


In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` is usually not assigned. We mostly use `null` for "unknown" or "empty" values. So the `in` operator is an exotic guest in the code.
````



## Loops

We've already seen one of the most popular loops: `for..in`

```js
for(let key in obj) {
  // key iterates over object keys
}
```

But there are also ways to get keys, values or or key/value pairs as arrays:

- [Object.keys(obj)](mdn:js/Object/keys) -- returns the array of keys.
- [Object.values(obj)](mdn:js/Object/values) -- returns the array of values.
- [Object.entries(obj)](mdn:js/Object/entries) -- returns the array of `[key, value]` pairs.

For instance:

```js 
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = [name, age]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`


We can use `Object.values` to iterate over object values:

```js
for(let value of Object.values(obj)) {
  // value iterates over object values
}
```

Here `Object.values(obj)` returns the array of properties, and `for..of` iterates over the array.

Also we can combine destructuring with `Object.entries` to iterate over key/value pairs:

```js
for(let [key, value] of Object.entries(obj)) {
  // key,value iterate over properties
}
```

The example of all 3 loops:

```js run
let user = { 
  name: "John", 
  age: 30 
};

// over keys
for(let key in user) {
  alert(key); // name, then age
  // can get the values with user[key]
}

// over values
for(let value of Object.values(user)) {
  alert(value); // John, then 30
}

// over key/value pairs
for(let [key, value] of Object.entries(user)) {
  alert(key + ':' + value); // name:John, then age:30
}
```


```smart header="The loops ignore symbolic properties"
All 3 forms of loops (and the given `Object` methods) ignore properties that use `Symbol(...)` as keys. 

That's actually a wise thing, because symbols are created to make sure that the property can not be accessed accidentaly. There is a separate method named [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys (if we really know what we're doing and insist on that).
```


## Copying by reference

One of fundamental differences of objects vs primitives is that they are stored and copied "by reference".

Primitive values: strings, numbers, booleans -- are assigned/copied "as a whole value".

For instance:

```js
let message = "Hello!";
let phrase = message;
```

As a result we have two independant variables, each one is storing the string `"Hello!"`.

![](variable-copy-value.png)

Objects are not like that.

**A variable stores not the object itself, but it's "address in memory", in other words "a reference" to it.**

Here's the picture for the object:

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.png)

Note that the object itself is stored somewhere in memory. The variable `user` has a "reference" to it.

**When an object variable is copied -- the reference is copied, the object is still single.**

We can easily grasp it if imagine an object as a cabinet, and a variable is a key to it. We can copy that key to another variable, the cabinet is still single.

For instance:

```js no-beautify
let user = { name: "John" }; 

let admin = user; // copy the reference
```

Now we have two variables, each one with the reference to the same object:

![](variable-copy-reference.png)

Compare it with the primitives' picture. There's only one object, it's not copied. 

Now can use any variable to access the cabinet and modify its contents:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // changed by the "admin" reference
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

Quite obvious, if we used one of the keys (`admin`) and changed something inside the cabinet, then if we use another key later (`user`), we find things modified.

### Comparison by reference

Two object variabls are equal only when reference the same object:

```js run
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
```

We can also think of it like: the variables are "papers with address" of the objects. We copied the address from `a` to `b`. Then when we compare `a == b`, we compare the adresses. If they match, the equality is truthy.

In all other cases objects are non-equal, even if their content is the same.

For instance:

```js run
let a = {};
let b = {}; // two independents object

alert( a == b ); // false
```

For unusual equality checks like: object vs a primitive (`obj == 5`), or an object less/greater than another object (`obj1 > obj2`), objects are converted to numbers. To say the truth, such comparisons occur very rarely in real code and usually are a result of a coding mistake.

## Cloning and Object.assign

What if we need to duplicate an object? Create an independant copy, a clone?

That's also doable, but a little bit more difficult, because there's no such method in Javascript. Actually, copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// now clone is a fully independant clone
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John
```

Also we can use the method [Object.assign](mdn:js/Object/assign) for that.

The syntax is:

```js
Object.assign(dest[, src1, src2, src3...])
```

- `dest` and other arguments (can be as many as needed) are objects

It copies the properties of all arguments starting from the 2nd (`src1`, `src2` etc) into the `dest`. Then it returns `dest`.

For instance:
```js 
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
```

If `dest` already has the property with the same name, it's overwritten:

```js 
let user = { name: "John" };

// overwrite name, add isAdmin
Object.assign(user, { name: "Pete", isAdmin: true });

// now user = { name: "Pete", isAdmin: true }
```


Here we can use it to replace the loop for cloning:

```js 
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user); 
*/!*
```

It copies all properties of `user` into the empty object and returns it. Actually, the same as the loop, but shorter.

Up to now we assumed that all properties of `user` are primitive. But actually properties can be references to other objects. What to do with them?

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` will be copied by reference. So `clone` and `user` will share the same sizes.

To fix that, we should examine the value of `user[key]` in the cloning loop and if it's an object, then replicate it's structure as well. That is called a "deep cloning". 

There's a standard algorithm for deep cloning that handles the case above and more complex cases, called the [Structured cloning algorithm](w3c.github.io/html/infrastructure.html#internal-structured-cloning-algorithm). We can use a ready implementation of it from the Javascript library [lodash](https://lodash.com). The method is called [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).


## Ordering

Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order that they are added in it?

The short answer is: "no" for integer properties, "yes" for others. The details follow.

As an example, let's consider an object with the phone codes:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for(let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

The object may be used to suggest a list of options to the user. If we're making a site mainly for German audience then we probably want `49` to be the first.

But if we run the code, we see a totally different picture: 

- USA (1) goes first
- then Switzerland (41) and so on.

That's because the iteration order is:

1. Integer properties in the ascending sort order go first.
2. String properties in the orders of their creation.
3. Symbol properties in the order of their creation.

The phone codes were sorted, because they are integer. That's why we see `1, 41, 44, 49`.

````smart header="Integer properties? What's that?"
By specification object property names are either strings or symbols. So an "integer property" actually means a string that can be converted to-from integer without a change.

So, "49" is an integer string, because when it's transformed to an integer number and back, it's still the same. But "+49" and "1.2" are not:

```js run
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same ⇒ not integer property
```
````

On the other hand, if the keys are non-integer, then they are listed as they appear, for instance:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more

*!*
// non-integer properties are listed in the creation order
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

So, to fix the issue with the phone codes, we can "cheat" by making the codes non-integer. Adding a plus `"+"` sign before each code is enough.

Like this:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for(let code in codes) {
  alert( +code ); // 49, 41, 44, 1 
}
```

Now it works as intended. 



## Summary

Objects are associative arrays with several special features.

- Property keys are either strings or symbols.
- Values can be of any type.

Property access:

- Read/write uses the dot notation: `obj.property` or square brackets `obj["property"]/obj[varWithKey]`.
- The deletion is made via the `delete` operator.
- Existance check is made by the comparison vs `undefined` or via the `in` operator.
- Three forms of looping:
  - `for(key in obj)` for the keys.
  - `for(value of Object.values(obj))` for the values.
  - `for([key,value] of Object.entries(obj))` for both.

- Ordering:
  - Integer properties in sorted order first, then strings in creation order, then symbols in creation order.
  - To keep the order for numeric properties, we can prepend them with `+` to make them look like non-numeric.

- Objects are assigned and copied by reference. 


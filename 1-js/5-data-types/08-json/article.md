# JSON methods, toJSON 

The [JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) format is used to represent an object as a string.

When we need to send an object over a network -- from the client to server or in the reverse direction, this format is the most widespread.

Javascript provides built-in methods to convert objects into JSON and back, which also allow a few tricks that make them even more useful.

[cut]

## JSON.stringify

JSON, despite its name (JavaScript Object Notation) is an independent standard. It is described as [RFC 4627](http://tools.ietf.org/html/rfc4627). Most programming languages have libraries to encode objects in it. So it's easy to use JSON for data exchange when the client uses Javascript and the server is written on Ruby/PHP/Java/Whatever.

In Javascript, the native method [JSON.stringify(value)](mdn:js/JSON/stringify) accepts a value and returns it's representation as a string in JSON format.

The syntax:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: A value to encode.

replacer
: Array of properties to encode or a mapping function `function(key, value)`.

space
: Amount of space to use for formatting

Most of time, `JSON.stringify` is used with first argument only.

For instance:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};

let json = JSON.stringify(student);

alert(typeof json); // we've got a string!

alert(json); 
*!*
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
*/!*
```

The resulting `json` string is a called *JSON-encoded* or *serialized* or *stringified* object. We are ready to send it over the wire or put into plain data store.

JSON-encoded object has several important differences from the original variant:

- Strings use double quotes. No single quotes or backticks in JSON. So `'John'` becomes `"John"`.
- Object property names are double-quoted also. Also obligatory. So `age:30` becomes `"age":30`.

`JSON.stringify` can be applied not only to objects, but to other values: 

```js run
// a number in JSON is just a number
alert( JSON.stringify(1) ) // 1

// a string in JSON is still a string, but double-quoted
alert( JSON.stringify('test') ) // "test"

// double quotes are escaped 
alert( JSON.stringify('"quoted"') ) // "\"quoted\"" (inner quotes are escaped with \")

// array of objects 
alert( JSON.stringify([{name: "John"},{name: "Ann"}]) ); // [{"name":"John"},{"name":"Ann"}]
```

The supported JSON types are:

- Objects `{ ... }` 
- Arrays `[ ... ]` 
- Primitives:
    - strings,
    - numbers,
    - boolean values `true/false`,
    - `null`.

In the examples above we can see them all.

JSON format does not support any other types. It is data-only cross-language specification, so some Javascript-specific things like function properties, `undefined` values and symbolic properties are just skipped by `JSON.stringify`:

```js run
let user = {
  sayHi() { // ignored
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignored
  something: undefined // ignored 
};

alert( JSON.stringify(user) ); // {} (empty object)
```

From the other hand, nested objects that reference other objects and arrays are supported. 

For instance:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  room,
  participants: [{
    name: "John"
  }, {
    name: "Alice"
  }]
};

alert( JSON.stringify(meetup) );
/* The whole structure is stringified:
{
  "title":"Conference",
  "room":{"number":23},
  "participants":[
    {"name":"John"},{"name":"Alice"}
  ]
}
*/
```

The only limitation for `JSON.stringify`: there must be no circular references.

For instance:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

*!*
JSON.stringify(meetup); // Error: Converting circular structure to JSON
*/!*
```

Here, the conversion fails, because of circular reference: `room.occupiedBy` references `meetup`, and `meetup.place` references `room`: 

![](json-meetup.png)


## Excluding and transforming: replacer

One of the ways to deal with circular references is to use the second, optional argument of `JSON.stringify`.

If we pass an array of properties to it, only these properties will be encoded.

For instance:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) ); 
// {"title":"Conference","participants":[{},{}]}
```

Here we are probably too strict. The property list is applied to the whole object structure. So participants are empty, because `name` is not in the list.

We are safe to include every property except `room.occupiedBy` that would cause the circular reference:


```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) ); 
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Now everything excepts `occupiedBy` is serialized.

Another way would be to provide a function instead the array as `replacer`.

The function will be called for every `(key,value)` pair and should return the "replaced" value, which will be used instead of the original one.

In our case, we can return `value` "as is" for everything except `occupiedBy`. To ignore `occupiedBy`, the code below returns `undefined`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`); // to see what replacer gets
  return (key == 'occupiedBy') ? undefined : value;
}));

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
*/
```

Please note that `replacer` function gets every key/value pair including nested objects and array items. It is applied recursively. The value of `this` inside `replacer` is the object that contains the current property.

The first call is made using a special "wrapper object": `{"": meetup}`, the first `(key,value)` pair is an empty key and the target object as a whole. That's why the first line is `":[object Object]"`.

## Formatting: spacer

The third argument of `JSON.stringify(value, replacer, spaces) is the number of spaces to use for pretty formatting.

Previously, all objects had no indents and extra spaces. 

Here they will have them:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

alert(JSON.stringify(user, null, 4));
/* four-space indents:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

The `spaces` parameter is used solely for logging and nice-output purposes.

## Custom "toJSON"

Previously, we used `replacer` to serialize objects "the smart way" and ignore circular links.

But if object is not satisfied with the default behavior of `JSON.stringify`, it can provide its own by implementing method `toJSON`. 

For instance:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

Here we can see that `date` `(1)` became a string. That's because all dates have a built-in `toJSON` method which returns such kind of string. 

Now let's add a custom `toJSON` for our object `room`:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

As we can see, `toJSON` is used both for the direct call `JSON.stringify(room)` and for the nested object.


## JSON.parse

To decode a JSON-string, we need another method named [JSON.parse](mdn:js/JSON/parse).

The syntax:
```js
let value = JSON.parse(str[, reviver]);
```

str
: JSON-string to parse.

reviver
: Optional function(key,value) that will be called for each `(key,value)` pair and can transform the value.

For instance:

```js run
// stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Or for nested objects:

```js run
let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

user = JSON.parse(user);

alert( user.friends[1] ); // 1
```

The JSON may be as complex as necessary, objects and arrays can include other objects and arrays. But they must obey the format.

Here are typical mistakes in hand-written JSON (sometimes we have to write it for debugging purposes):

```js
let json = `{
  *!*name*/!*: "John",                     // mistake: property name without quotes
  "surname": *!*'Smith'*/!*,               // mistake: single quotes in value (must be double)
  *!*'isAdmin'*/!*: false                  // mistake: single quotes in key (must be double)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // mistake: no "new" is allowed, only bare values
  "friends": [0,1,2,3]              // here all fine
}`;
```

Besides, JSON does not support comments. Adding a comment to JSON makes it invalid. 

There's another format named [JSON5](http://json5.org/), which allows unquoted keys, comments etc. But this is a standalone library, not in the specification of the language.

The regular JSON is that strict not because its developers are lazy, but to allow easy, reliable and very fast implementations of the parsing algorithm.

## Using reviver

Imagine, we got a stringified `meetup` object from the server.

It looks like this:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...And now we reed to *deserialize* it, to turn back into Javascript object.

Let's do it by calling `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Error!
*/!*
```

Wops! An error!

The value of `meetup.date` is a string, not a `Date` object. How `JSON.parse` may know that it should transform that string into a `Date`?

Let's pass to `JSON.parse` the reviving function that returns all values "as is", but `date` wll become a `Date`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // now works!
```

By the way, that works for nested objects as well:

```js run
let schedule = `{ 
  "meetups": [ 
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"}, 
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"} 
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // works!
*/!*
```



## Summary

- JSON is a data format that has its own independent standard and libraries for most programming languages.
- JSON supports plain objects, arrays, strings, numbers, booleans and `null`.
- Javascript provides methods [JSON.stringify](mdn:js/JSON/stringify) to serialize into JSON and [JSON.parse](mdn:js/JSON/parse) to read from JSON.
- Both methods support transformer functions for smart reading/writing.
- If an object has `toJSON`, then it is called by `JSON.stringify`.


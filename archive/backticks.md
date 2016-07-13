
Backticks allow to specify a "template function" before the first backtick. 

The syntax is: 
```js
let str = func`my string`;
```

The function `func` is automatically called and receives the array of string pieces split by `${...}` embeds and the list of embedded `${...}` values.

It's better to see the example:

```js run
function love(s, v1, v2) {
  alert( s[0] ); // Hello:
  alert( s[1] ); //  and 
  alert( s[2] ); // !

  alert( v1 ); // Ilya
  alert( v2 ); // Julia

  alert( s.raw[0] ); // Hello:\n

  return v1 + ' ♥ ' + v2;
}

let mom = "Julia";
let dad = "Ilya";

//              s[0]    | v1 |  s[1] | v2 | s[2]
let str = love`Hello:\n ${mom}  and  ${dad}!`;

alert(str); // 'Julia ♥ Ilya'
```

The string inside <code>love&#96;string&#96;</code> is split into pieces by embeds. The result is passed to `love`:

- The first parameter `s` stores the pieces, here `s = ["Hello:\n ", " and ", "!"]`.
- The special proeprty `s.raw` contains unparsed values, the special characters are not processes.
- Then follow the values of embeds: `v1 = mom`, `v2 = data`.

Templating functions allow to 




- The first parameter `strings` is a

In the example above, `love` is the name for the function. It is called with an array 



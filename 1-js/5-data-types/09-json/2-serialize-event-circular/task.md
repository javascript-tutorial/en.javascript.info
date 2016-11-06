importance: 5

---

# Exclude backreferences

In simple cases of circular references, we can exclude an offending property from serialization by its name.

But sometimes there are many backreferences. And names may be used both in circular references and normal properties.

Write `replacer` function to stringify everything, but remove properties that reference `meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// circular references 
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* your code */
}));

/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```


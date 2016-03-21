The sane choice here is a `WeakSet`:

```js
let messages = [
  {title: "Hello"},
  {title: "I'm Mary"}
  {title: "Bye!"} 
];

let readMessages = new WeakSet();

// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages has 2 elements

// ...let's read the first message again!
readMessages.add(messages[0]);
// readMessages still has 2 unique elements

// answer: was the message[0] read?
alert("Read message 0: " + readMessages.has(messages[0]));

messages.shift();
// now readMessages has 1 element (or will be cleaned soon)
```

The `WeakSet` allows to store a set of messages and easily check for the existance of a message in it.

It cleans up itself automatically. The tradeoff is that we can't iterate over it. That's not needed here though.


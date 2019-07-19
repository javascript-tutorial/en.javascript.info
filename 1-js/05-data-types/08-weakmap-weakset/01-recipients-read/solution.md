Let's store read messages in `WeakSet`:

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
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
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)
```

The `WeakSet` allows to store a set of messages and easily check for the existance of a message in it.

It cleans up itself automatically. The tradeoff is that we can't iterate over it,  can't get "all read messages" from it directly. But we can do it by iterating over all messages and filtering those that are in the set.

Another, different solution could be to add a property like `message.isRead=true` to a message after it's read. As messages objects are managed by another code, that's generally discouraged, but we can use a symbolic property to avoid conflicts.

Like this:
```js
// the symbolic property is only known to our code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Now third-party code probably won't see our extra property.

Although symbols allow to lower the probability of problems, using `WeakSet` is better from the architectural point of view.

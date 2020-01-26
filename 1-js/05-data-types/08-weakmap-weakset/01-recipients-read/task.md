importance: 5

---

# Store "unread" flags

There's an array of messages:

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

Your code can access it, but the messages are managed by someone else's code. New messages are added, old ones are removed regularly by that code, and you don't know the exact moments when it happens.

Now, which data structure could you use to store information about whether the message "has been read"? The structure must be well-suited to give the answer "was it read?" for the given message object.

P.S. When a message is removed from `messages`, it should disappear from your structure as well.

P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.

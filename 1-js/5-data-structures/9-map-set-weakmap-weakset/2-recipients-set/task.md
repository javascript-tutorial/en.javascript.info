importance: 5

---

# A set of messages

There's an array of messages:

```js
let messages = [
  {title: "Hello"},
  {title: "I'm Mary"}
  {title: "Bye!"} 
];
```

Your code can access it, but the messages are managed by someone else's code. New messages are added, old ones are removed regularly by that code, and you don't know the exact moments when it happens.

Now, which data structure you could use to store only messages that are "have been read"? The structure must be well-suited to give the answer "was it read?" for the given message object.

P.S. When a message is removed from the collection, it should disappear from your structure as well.

P.P.S. What you'd use to store the information about "when it was read?"
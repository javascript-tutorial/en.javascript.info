importance: 5

---

# Store read dates

There's an array of messages as in the [previous task](info:task/recipients-read). The situation is similar.

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];
```

The question now is: which data structure you'd suggest to store the information: "when the message was read?".

In the previous task we only needed to store the "yes/no" fact. Now we need to store the date and it, once again, should disappear if the message is gone.

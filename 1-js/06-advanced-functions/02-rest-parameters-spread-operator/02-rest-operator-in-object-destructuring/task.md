importance: 3

---

# Use rest operator with destructuring

Let's say we have this object 'user':

```js no-beautify
let user = {
	name: 'John',
	lastname: 'Smith',
	age: 32,
	isAdmin: false,
}
```

How could you use the rest operator with destructuring assignment in order to do this:
```js
let fullName = name + ' ' + lastname; // 'John Smith'
alert(otherProps.age); // 32
alert(otherProps.isAdmin); // false
```

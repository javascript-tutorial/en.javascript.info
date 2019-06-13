The solution using destructuring assignment and rest operator:

```js run
let user = {
	name: 'John',
	lastname: 'Smith',
	age: 32,
	isAdmin: false,
}

let {name, lastname, ...otherProps} = user;

let fullName = name + ' ' + lastname; // 'John Smith'
alert(otherProps.age); // 32
alert(otherProps.isAdmin); // false
```

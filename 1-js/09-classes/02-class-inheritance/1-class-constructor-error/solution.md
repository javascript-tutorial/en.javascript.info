That's because the child constructor must call `super()`.

Here's the corrected code:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // ok now
*/!*
alert(rabbit.name); // White Rabbit
```

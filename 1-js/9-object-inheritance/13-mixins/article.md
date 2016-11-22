# Mixins

In JavaScript we can only inherit from a single object. There can be only one `[[Prototype]]`.

But sometimes we need such kind of thing. For instance, we have a code that implements events exchange or templating, and we'd like to be able to add these capabilities to any class easily.

What can help here is *mixins* or *traits*.

A *mixin* is a class or an object that implements a certain behavior. We do not use it alone, but rather use to complement other classes.
[cut]

## A mixin example

The simplest way to make a mixin -- is to make an object with useful methods, that we can just copy into the prototype.

For instance:

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert("Hello " + this.name);
  },
  sayBye() {
    alert("Bye " + this.name);
  }
};

*!*
// usage:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hi Dude!
```

Mixins also can inherit from each other.

For instance, here `sayHiMixin` inherits from `sayMixin`:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // can use other prototype-setting methods instead
*!*
  // call parent method
*/!*
  sayHi() {
    super.say("Hello " + this.name);
  },
  sayBye() {
    super.say("Bye " + this.name);
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hi Dude!
```

Please note that the call to `super.say()` from a mixin looks for the method in the prototype of that mixin, not the class.

That's because methods from `sayHiMixin` have `[[HomeObject]]` set to `sayHiMixin`. So `super` actually means `sayHiMixin.__proto__`, that is `sayMixin`.

## EventMixin

Now a mixin for the real life.

The important feature of many objects is working with events.

That is: an object should have a method to "generate an event" when something important happens to him, and other objects should be able to "subscribe" to receive such notifications.

An event must have a name and, if necessary, the attached data.

For instance, an object `user` can generate an event `"login"` when the visitor logs in. And an object `calendar` may want to receive such notifications and load the information about that visitor.

Or, the object `menu` can generate the event `"select"` when a menu item is selected, and other objects may want to get that information and react on that event.

Events is a way to "share information" with anyone who wants it.

The `eventMixin` to implement the corresponding methods:

```js run
let eventMixin = {

  /**
   * Subscribe to event, usage:
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Cancel the subscription, usage:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers && this._eventHandlers[eventName];
    if (!handlers) return;
    for(let i = 0; i < handlers.length; i++) {
      if (handlers[i] == handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Generate the event and attach the data to it
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // no handlers for that event name
    }

    // call the handlers
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

There are 3 methods here:

1. `.on(eventName, handler)` -- assigns the function `handler` to run when the event with that name happens. The handlers are stored in `_eventHandlers` property.
2. `.off(eventName, handler)` -- removes the function from the handlers list.
3. `.trigger(eventName, ...args)` -- generates the event: all assigned handlers are called and `args` are passed as arguments to them.


Usage:

```js run
// Make a class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// Add the mixin
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// call the handler on selection:
*!*
menu.on("select", value => alert("Value selected: " + value));
*/!*

// the choice has happened!
menu.choose("123"); // value selected
```

Now if we have the code interested to react on user selection, we can bind it with `menu.on(...)`.

And the mixin can be added to as many classes as we'd like.

## Summary [todo]

- Примесь -- объект, содержащий методы и свойства для реализации конкретного функционала.
Возможны вариации этого приёма проектирования. Например, примесь может предусматривать конструктор, который должен запускаться в конструкторе объекта. Но как правило просто набора методов хватает.
- Для добавления примеси в класс -- её просто "подмешивают" в прототип.
- "Подмешать" можно сколько угодно примесей, но если имена методов в разных примесях совпадают, то возможны конфликты. Их уже разрешать -- разработчику. Например, можно заменить конфликтующий метод на свой, который будет решать несколько задач сразу. Конфликты при грамотно оформленных примесях возникают редко.

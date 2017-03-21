**The answer: `rabbit`.**

That's because `this` is an object before the dot, so `rabbit.eat()` naturally means `rabbit`.

Property lookup and execution are two successive things. The method is found in the prototype, but then is run in the context of `rabbit`.

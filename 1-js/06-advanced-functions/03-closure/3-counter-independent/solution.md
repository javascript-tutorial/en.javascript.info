The answer: **0,1.**

Functions `counter` and `counter2` are created by different invocations of `makeCounter`.

So they have independent outer Lexical Environments, each one has its own `count`.

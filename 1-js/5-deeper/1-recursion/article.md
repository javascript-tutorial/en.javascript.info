# Recursion and stack

A function solves a task. In the process it can call many other functions. A partial case of this is when a function calls *itself*.

That's called *a recursion*.

Recursion is useful in situations when a task can be naturally split into several tasks of the same kind, but simpler. Or when a task can be simplified into an easy action plus a simpler variant of the same task. 

Soon we'll see examples.

Recursion is a common programming topic, not specific to Javascript. If you developed in other languages or studied algorithms, then you probably already know what's this.

The chapter is mostly meant for those who are unfamiliar with the topic and want to study better how functions work.

[cut]

## Recursive thinking

For something simple to start with -- let's consider a task of raising `x` into a natural power of `n`. In other words, we need `x` multiplied by itself `n` times.

There are two ways to solve it.

1. Iterative thinking -- the `for` loop:

    ```js  run
    function pow(x, n) {
      let result = 1;

      // multiply result by x n times in the loop
      for(let i = 0; i < n; i++) {
        result *= x;
      }

      return result
    }

    alert( pow(2, 3) ); // 8
    ```

2. Recursive thinking -- simplify the task:

    ```js run
    function pow(x, n) {
      if (n == 1) {
        return x;
      } else {
        return x * pow(x, n - 1);
      }
    }

    alert( pow(2, 3) ); // 8
    ```

The recursive variant represents the function as a simple action plus a simplified task:

```js
            if n==1  = x
             /
pow(x, n) = 
             \       = x * pow(x, n - 1)
            else
```


Here we have two branches. 

1. The `n==1` is the trivial variant. It is called *the base* of recursion, because it immediately produces the obvious result: `pow(x, 1)` equals `x`.
2. Otherwise, we can represent `pow(x, n)` as `x * pow(x, n-1)`. In maths, one would write <code>x<sup>n</sup> = x * x<sup>n-1</sup></code>. This is called *a recursive step*, because we transform the task into a simpler action (multiplication by `x`) and a simpler call of the same task (`pow` with lower `n`). Next steps simplify it further and further untill `n` reaches `1`.

We can also say that `pow` *recursively calls itself* till `n == 1`.

For example, to calculate `pow(2, 4)` the recursive variant does these steps:

1. `pow(2, 4) = 2 * pow(2, 3)` 
2. `pow(2, 3) = 2 * pow(2, 2)`
3. `pow(2, 2) = 2 * pow(2, 1)`
4. `pow(2, 1) = 2`

````smart header="Recursion is usually shorter"
A recursive solution is usually shorter.

Here we can write the same using the ternary `?` operator instead of `if` to make it even more terse and still very readable:

```js run
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n-1));
}
```
````

So, the recursion can be used when a function call can be reduced to a simpler call, and then -- to even more simpler, and so on, until the result becomes obvious.

The maximal number of nested calls (including the first one) is called *recursion depth*. In our case, it there will be exactly `n`.

The maximal recursion depth is limited by Javascript engine. We can make sure about 10000, some engines allow more, but 100000 is probably out of limit for the majority of them. There are automatic optimizations that help to alleviate this ("tail calls optimizations"), but they are not yet supported everywhere and work only in simple cases.

That limits the application of recursion, but it still remains very wide. There are many tasks where a recursive way of thinking gives simpler code, easier to maintain.

## The execution stack

Now let's examine how recursive calls work. For that we'll look under the hood of functions, how they work.
The information about a function run is stored in its *execution context*.

The [execution context](https://tc39.github.io/ecma262/#sec-execution-contexts) is an internal data structure that contains details about where the execution flow is now, current variables, the value of `this` (we don't use it here) and few other internal details. 

### pow(2, 3)

For instance, for the beginning of the call `pow(2, 3)` the execution context will store variables: `x = 2, n = 3`, the execution flow is at line `1` of the function. 

We can sketch it as:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

That's when the function starts to execute. The condition `n == 1` is falsy, so the flow continues into the second branch of `if`:

```js run
function pow(x, n) {
  if (n == 1) { 
    return x;
  } else {
*!*
    return x * pow(x, n - 1);
*/!*
  } 
}

alert( pow(2, 3) );
```

The line changes, so the context is now:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

To calculate `x * pow(x, n-1)`, we need to run `pow` witn new arguments.

### pow(2, 2)

To do a nested call, Javascript remembers the current execution context in the *execution context stack*.

Here we call the same function `pow`, but it absolutely doesn't matter. The process is the same for all functions:

1. The current context is "laid away" on top of the stack.
2. The new context is created for the subcall.
3. When the subcall is finished -- the previous context is popped from the stack, and its execution continues.

The context stack as a list where the current execution context is always on-top, and previous remembered contexts are below:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Here, the new current execution context is also made bold for clarity. 

Note that the context of the previous call not only includes the variables, but also the place in the code, so when the new call finishes -- it would be easy to resume. We use a word "line" in the illustrations for that, but of course in fact it's more precise.


### pow(2, 1)

The process repeats: a new subcall is made at line `5`, now with arguments `x=2`, `n=1`.

A new execution context is created, the previous one is pushed on top of the stack:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 1, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 1)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

The stack has 2 old contexts now.

### The exit

During the execution of `pow(2, 1)`, unlike before, the condition `n == 1` is truthy, so the first branch of `if` works:

```js
function pow(x, n) {
  if (n == 1) { 
*!*
    return x;
*/!*
  } else {
    return x * pow(x, n - 1);
  } 
}
```

There are no more nested calls, so the function finishes, returning `2`. 

As the function finishes, its execution context is not needed any more, so it's removed from the memory. The previous one is restored off-top of the stack:


<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

The execution of `pow(2, 2)` is resumed. It has the result of the subcall `pow(2, 1)`, so it also can finish the evaluation of `x * pow(x, n-1)`, returning `4`.

Then the previous context is restored:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

When it finishes, we have a result of `pow(2, 3) = 8`.

The recursion depth in this case was: **3**.

As we can see from the illustrations above, recursion depth equals the maximal number of context in the stack.

Note the memory requirements. Contexts take memory. In our case, raising to the power of `n` actually requires the memory for `n` contexts, for all lower values of `n`.

A loop-based algorithm is much memory-saving:

```js
function pow(x, n) {
  let result = 1;

  for(let i = 0; i < n; i++) {
    result *= x;
  }

  return result
}
```

The iterative `pow` uses a single context changing `i` and `result` in the process.

**Any recursion can be rewritten as a loop. The loop variant is usually more effective.**

...But sometimes the rewrite can be non-trivial, especially when function uses different recursive subcalls, when the branching is more intricate. And the optimization benefits may be unneeded and totally not worth that.

## Итого

Рекурсия -- это когда функция вызывает сама себя, как правило, с другими аргументами.

Существуют много областей применения рекурсивных вызовов. Здесь мы посмотрели на один из них -- решение задачи путём сведения её к более простой (с меньшими аргументами), но также рекурсия используется для работы с "естественно рекурсивными" структурами данных, такими как HTML-документы, для "глубокого" копирования сложных объектов.

Есть и другие применения, с которыми мы встретимся по мере изучения JavaScript.

Здесь мы постарались рассмотреть происходящее достаточно подробно, однако, если пожелаете, допустимо временно забежать вперёд и открыть главу <info:debugging-chrome>, с тем чтобы при помощи отладчика построчно пробежаться по коду и посмотреть стек на каждом шаге. Отладчик даёт к нему доступ.


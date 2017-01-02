# How to write bad code?

Programmer ninjas of the past used these tricks to make code maintainers cry. Code review gurus search for signs of them in test tasks. Novice developers sometimes use them even better than programmer ninjas (indeed there's power in being a newbie!).

Read them carefully and find who you are -- a ninja, a novice, or maybe a code reviewer?

[cut]

## Brevity is the soul of wit

Make the code as short as possible. Show how smart you are.

Let subtle language features guide you.

For instance, take a look at the ternary operator `'?'`:

```js
// taken from a well-known javascript library
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

The developer who comes across such line and tries to understand the value of `i` will probably come to you seeking for an answer.

Tell him that the shorter is the better. Initiate him into the paths of ninja. Don't forget to give him [Tao Te Ching](http://www.w66.eu/elib/html/ttk.html).

## One-letter variables

```quote author="Laozi (Tao Te Ching)"
The Dao hides in wordlessness. Only the Dao is well begun and well
completed.
```

Another way to code faster (and much worse!) is to use single-letter variable names everywhere. Like `a`, `b` or `c`.

That makes the variable blend in the code like a real ninja in the forest. No one will be able to find it using the "search" of the editor. And even if someone does, he won't be able to "decipher" what it means.

...But there's an exception. A real ninja will never use `i` as the counter in a `"for"` loop. Anywhere, but not there. Look, there's so much more exotic letters. For instance, `x` or `y`.

The approach is even more effective when the loop body takes 1-2 pages (make it longer? yes, if you can). Then it becomes impossible to guess that the variable is the loop counter, when looking in the middle of the code.

## Can't one-letter? Then shorten

If the team rules forbid to use one-letter and vague names -- shorten them.

Like this:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...etc

Only the one with a truly good intuition will be able to understand all such names. Try to shorten everything. Only a worthy person will be able to uphold development of such code.

## Soar high. Be abstract.

```quote author="Laozi (Tao Te Ching)"
The great square is cornerless<br>
The great vessel is last complete,<br>
The great note is rarified sound,<br>
The great image has no form.
```

While choosing a name try to use the most abstract word. Like `obj`, `data`, `value`, `item`, `elem` and so on.

- **The ideal variable for a variable is `data`.** Use it everywhere where you can. Indeed, every variable holds *data*, right?

    ...But what to do if `data` is already taken? Try `value`, it's also universal. A variable always has a *value*, correct?

    Taken as well? An experienced ninja should find a way.

- **Name the variable by its type: `str`, `num`, `list`...**

    ...But will that make the code worse? Actually, yes!

    From the one hand, the variable name still means something. It says what's inside the variable: a string, a number or an list. But when a person unfamiliar to the Dao will try to understand the code -- he'll be surprised to see that there's actually no information at all!

    Actually, the value type is easy to see by debugging. But what's the meaning of the variable? Which string/number it stores? There's just no way to figure out without a good meditation!

- **...But what if there's no more such names?** Just add a letter: `item1, item2, elem5, data1`...

## Attention test

Only a truly attentive programmer should be able to understand the code. But how to check that?

**One of the ways -- is to use similar variable names, like `date` and `data`.**

Mix them where you can.

A quick read of such code becomes impossible. And when there's a typo... Ummm... We're stuck for long, time to drink some tea.


## Smart synonyms

```quote author="Confucius"
The hardest thing of all is to find a black cat in a dark room, especially if there is no cat.
```

Don't be bored. Use *similar* names for *same* things.

For instance, the function prefixes. If a function shows something on the screen -- start it with `display..` (like `displayMessage`), and the similar function that shows a question should start with `show...` (like `showName`).

**Insinuate that there's a subtle difference difference between such functions, while there is none.**

Make a pact with fellow ninjas of the team: if John starts "showing" functions with `display...` in his code, then Peter could use `render..`, and Ann -- `paint...`.

...And now the hat trick!

**For two functions with important differences -- use the same word!**

For instance, the function `printPage(page)` will use a printer. And the function `printText(text)` will put the text on-screen.

Let an unfamiliar reader think well over things: "Where does `printMessage(message)` put the message?". To make it really shine, `printMessage(message)` should output it in the new window!

## Reuse names

```quote author="Laozi (Tao Te Ching)"
Once the whole is divided, the parts<br>
need names.<br>
There are already enough names.<br>
One must know when to stop.
```

Add a new variable only when absolutely necessary.

Instead, reuse existing names. Just write new values into them.

In a function try to use only variables passed as parameters.

That would make it impossible to identify what's exactly in the variable *now*. And also where it comes from. A person without a skill would have to analyze the code line-by-line and track the changes through every code branch.

**An advanced variant of the approach is to covertly (!) replace the value with something alike, for instance:**

```js
function ninjaFunction(elem) {
  // 20 lines of code working with elem

  elem = clone(elem);

  // 20 more lines, now working with the new elem!
}
```

A fellow programmer who wants to work with `elem` in the second half of the function will be surprised... Only during the debugging, after examining the code he will find out that he worked with he's working with the clone!

Deadly effective even against an experienced ninja. Met in the code regularly.

## Underscores for fun

Put underscores `_` and `__` before variable names. Like `_name` or `__value`. It would be great if only you know their meaning. Or, better, without meaning at all.

You kill two rabbits with one shot. First, the code becomes longer and less readable, and the second, a fellow developer may spend a long time trying to figure out what the underscores mean.

A smart ninja puts underscores at one spot of code and evades them at other places. That makes the code even more fragile and increases the probability of future errors.

## Show your love

Let everyone see how magnificent your entities are! Names like `superElement`, `megaFrame` and `niceItem` will definitely enlighten the reader.

Indeed, from one hand, something is written: `super..`, `mega..`, `nice..` But from the other hand -- that brings no details. The reader may decide to look for a hidden meaning and meditate for an hour or two.

## Overlap outer variables

```quote author="Guan Yin Zi"
When in the light, can't see anything in the darkness.<br>
When in the darkness, can see everything in the light.
```

Use same names for variables inside and outside a function. As simple. No efforts required.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...many lines...
  ...
  ... // <-- a programmer wants to work with user here and...
  ...
}
```

A programmer who jumps inside the `render` will probably miss to notice that the local `user` overlaps the outer one. Then he'll try to work with it assuming that it's the resulf of `authenticateUser()`... The trap is sprung! Hello, debugger...

## Powerful functions!

```quote author="Laozi (Tao Te Ching)"
The great Tao flows everywhere,<br>
both to the left and to the right.
```

Don't limit the function by what's written in its name. Be wider.

For instance, a function `validateEmail(email)` could, besides checking the email for correctness, to show an error message and ask to re-enter the email.

**Add at least two more actions to the main purpose of the function.**

They should not be obvious from the function name. A true ninja coder will make them not obvious from the code as well.

**Joining several actions into one protects your code from reuse.**

Imagine, another developer wants only to check the email, and not output any message. Your function  `validateEmail(email)` that does both will not suit him. So he will not break your meditation by asking anything about it.


## Side-effects everywhere!

There are functions that look like they don't change anything. Like `isReady()`, `checkPermission()`, `findTags()`... They are assumed to carry out calculations, find and return the data, without changing anything outside of them. That's called "no side-effects".


**A really beautiful trick -- is to add a "useful" action to them, besides the main task.**

The expression of dazed surprise on the face of your colleague when he see a function named `is..`, `check..` or `find...` changing something -- will definitely broaden your boundaries of reason.

**Another way to surprise -- is to return a non-standard result.**

Show your original thinking! Let the call of `checkPermission` return not `true/false`, but a complex object with the results of the check.

Those developers who try to write `if (checkPermission(..))`, will wonder why it doesn't work. Tell them: "Read the docs!". And give this article.

## Summary

All "pieces of advice" above are from the real code... Sometimes, written by experienced developers. Maybe even more experienced than you are ;)

- Follow some of them -- and your code will become full of surprises.
- Follow many of them -- and your code will become truly yours, no one would want to change it.
- Follow all -- and your code will become a valuable lesson for young developers looking for enlightment.

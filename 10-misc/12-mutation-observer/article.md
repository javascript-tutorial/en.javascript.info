
# Mutation observer

`MutationObserver` is a built-in object that observes a DOM element and fires a callback in case of changes.

We'll first see syntax, and then explore a real-world use case.

## Syntax

`MutationObserver` is easy to use.

First, we create an observer with a callback-function:

```js
let observer = new MutationObserver(callback);
```

And then attach it to a DOM node:

```js
observer.observe(node, config);
```

`config` is an object with boolean options "what kind of changes to react on":
- `childList` -- changes in the direct children of `node`,
- `subtree` -- in all descendants of `node`,
- `attributes` -- attributes of `node`,
- `attributeOldValue` -- record the old value of attribute (infers `attributes`),
- `characterData` -- whether to observe `node.data` (text content),
- `characterDataOldValue` -- record the old value of `node.data` (infers `characterData`),
- `attributeFilter` -- an array of attribute names, to observe only selected ones.

Then after any changes, the `callback` is executed, with a list of [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects as the first argument, and the observer itself as the second argument.

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects have properties:

- `type` -- mutation type, one of
    - `"attributes"` (attribute modified)
    - `"characterData"` (data modified)
    - `"childList"` (elements added/removed),
- `target` -- where the change occured: an element for "attributes", or text node for "characterData", or an element for a "childList" mutation,
- `addedNodes/removedNodes`  -- nodes that were added/removed,
- `previousSibling/nextSibling` -- the previous and next sibling to added/removed nodes,
- `attributeName/attributeNamespace` -- the name/namespace (for XML) of the changed attribute,
- `oldValue` -- the previous value, only for attribute or text changes.


For example, here's a `<div>` with `contentEditable` attribute. That attribute allows us to focus on it and edit.

```html run
<div contentEditable id="elem">Edit <b>me</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});
observer.observe(elem, {
  // observe everything except attributes
  childList: true,
  subtree: true,
  characterDataOldValue: true
});
</script>
```

If we change the text inside `<b>me</b>`, we'll get a single mutation:

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "me",
  target: <text node>,
  // other properties empty
}];
```

If we select and remove the `<b>me</b>` altogether, we'll get multiple mutations:

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // other properties empty
}, {
  type: "characterData"
  target: <text node>
  // ...details depend on how the browser handles the change
  // it may coalesce two adjacent text nodes "Edit " and ", please" into one node
  // or it can just delete the extra space after "Edit".
  // may be one mutation or a few
}];
```

## Observer use case

When `MutationObserver` is needed? Is there a scenario when such thing can be useful?

Sure, we can track something like `contentEditable` and create "undo/redo" stack, but here's  an example where `MutationObserver` is good from architectural standpoint.

Let's say we're making a website about programming, like this one. Naturally, articles and other materials may contain source code snippets.

An HTML code snippet looks like this:
```html
...
<pre class="language-javascript"><code>
  // here's the code
  let hello = "world";
</code></pre>
...
```

There's also a JavaScript highlighting library, e.g. [Prism.js](https://prismjs.com/). A call to `Prism.highlightElem(pre)` examines the contents of such `pre` elements and adds colored syntax highlighting, similar to what you in examples here, this page.

Generally, when a page loads, e.g. at the bottom of the page, we can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:

```js
// highlight all code snippets on the page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Now the `<pre>` snippet looks like this (without line numbers by default):

```js
// here's the code
let hello = "world";
```

Everything's simple so far, right? There are `<pre>` code snippets in HTML, we highlight them.

Now let's go on. Let's say we're going to dynamically fetch materials from a server. We'll study methods for that [later in the tutorial](info:fetch-basics). For now it only matters that we fetch an HTML article from a webserver and display it on demand:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;
```

The new `article` HTML may contain code snippets. We need to call `Prism.highlightElem` on them, otherwise they won't get highlighted.

**Who's responsibility is to call `Prism.highlightElem` for a dynamically loaded article?**

We could append that call to the code that loads an article, like this:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

...But imagine, we have many places where we load contents with code: articles, quizzes, forum posts. Do we need to put the highlighting call everywhere? Then we need to be careful, not to forget about it.

And what if we load the content into a third-party engine? E.g. we have a forum written by someone else, that loads contents dynamically, and we'd like to add syntax highlighting to it. No one likes to patch third-party scripts.

Luckily, there's another option.

We can use `MutationObserver` to automatically detect code snippets inserted in the page and highlight them.

So we'll handle the highlighting functionality in one place, relieving us from the need to integrate it.

## Dynamic highlight demo

Here's the working example.

If you run this code, it starts observing the element below and highlighting any code snippets that appear there:

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // examine new nodes

    for(let node of mutation.addedNodes) {
      // skip newly added text nodes
      if (!(node instanceof HTMLElement)) continue;

      // check the inserted element for being a code snippet
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // search its subtree for code snippets
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

<p id="highlight-demo" style="border: 1px solid #ddd">Demo element with <code>id="highlight-demo"</code>, obverved by the example above.</p>

The code below populates `innerHTML`. If you've run the code above, snippets will get highlighted:

```js run
let demoElem = document.getElementById('highlight-demo');

// dynamically insert content with code snippets
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

Now we have `MutationObserver` that can track all highlighting in observed elements or the whole `document`. We can add/remove code snippets in HTML without thinking about it.


## Garbage collection

Observers use weak references to nodes internally. That is: if a node is removed from DOM, and becomes unreachable, then it becomes garbage collected, an observer doesn't prevent that.

Still, we can release observers any time:

- `observer.disconnect()` -- stops the observation.

Additionally:

- `mutationRecords = observer.takeRecords()` -- gets a list of unprocessed mutation records, those that happened, but the callback did not handle them.

```js
// we're going to disconnect the observer
// it might have not yet handled some mutations
let mutationRecords = observer.takeRecords();
// process mutationRecords

// now all handled, disconnect
observer.disconnect();
```

## Summary  

`MutationObserver` can react on changes in DOM: attributes, added/removed elements, text content.

We can use it to track changes introduced by other parts of our own or 3rd-party code.

For example, to post-process dynamically inserted content, as demo `innerHTML`, like highlighting in the example above.

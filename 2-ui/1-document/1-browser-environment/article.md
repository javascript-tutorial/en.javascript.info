# Browser environment, specs

The Javascript language was born for web browsers. But as of now, it evolved and became a language with many use cases, not tied to browsers.

The Javascript standard though assumes that the execution happens in a *host environment*, say Node.JS server, or a web-browser.

That host environment may provide additional objects and functions though. Web browsers provide means to control web pages. Node.JS provides server-side features. There are other host environments too.

[cut]

Here's a bird-eye view of what we have when Javascript runs in a web-browser:

![](windowObjects.png)

On the top, there's `window` -- the object has two meanings:

1. First, it is a [global object](info:global-object) in terms of Javascript.
2. Second, it represents the "browser window" object, supports methods to control it and read its parameters.

For instance, to see the window height:

```js run
alert(window.innerHeight); // some number
```

Now we go from left to right.

## Document Object Model (DOM)

The `document` object gives access to a webpage contents. We can change or create literally anything.

For instance:
```js run
document.body.style.background = 'red';
alert('The <body> element became red! In 1 second it will become normal.');
setTimeout(() => document.body.style.background = '', 1000);
```

There are two working groups who develop the standard:

1. [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium) -- the documentation is at <https://www.w3.org/TR/dom>.
2. [WhatWG](https://en.wikipedia.org/wiki/WHATWG), publishing at <https://dom.spec.whatwg.org>.

About 99.9% of time these two groups agree, so the actual documentation is almost the same. There are very minor differences that you shouldn't even notice that in practice.

I find <https://dom.spec.whatwg.org> more pleasant to use.

Historically, once there was no standard at all -- each browser did whatever it wanted. So different browsers had different methods and properties, and we had to find different code for each of them. Yeah, terrible, please don't remind.

Then the DOM standard appeared, in an attempt to bring them to an agreement. The first version is now called DOM Level 1. Then it was extended by DOM Level 2, new methods got added, then DOM Level 3, and now DOM Level 4.

People from WhatWG got tired of version and are calling that just "DOM", without a number. So will do we.

```smart header="DOM is not only for browsers"
The DOM specification explains the tree structure of a document and methods to manipulate it. There are non-browser instruments that use it as well. For instance, server-side tools that download HTML pages and process them. They may support only a part of the specification though.
```

```smart header="CSSOM for styling"
CSS styles and stylesheets are organized not like HTML. They form a standalone domain.

So there's a separate specification [CSSOM](https://www.w3.org/TR/cssom-1/) that explains how CSS styles and rules can be read and modified as objects, how to read and write them in the document.

If you're interested to read about general document structure, creating and modifying elements -- then it's DOM. But if it's about styles, then it's CSSOM.
```

## BOM (part of HTML spec)

Browser Object Model (BOM) are objects to work with anything except the document.

For instance:

- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operation system. There are many properties, but two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differ between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows to read the current URL and redirect the browser to a new one.
- Functions `alert/confirm/prompt` -- are also a part of BOM, they are not related to "document".
- ...and so on.

Here's how we can use the `location`:

```js run
alert(location.href); // shows current URL
```

```smart header="HTML specification"
BOM is the part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, right. The HTML spec at <https://html.spec.whatwg.org> covers not only the "HTML language" (tags, attributes), but also a bunch of objects, methods and browser-specific DOM extensions, including those listed above.
```

## Summary

So, talking about general standards, we have:

DOM specification
: Describes the document structure, manipulations and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes styles, manipulations with them and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.

HTML specification
: Describes HTML language (tags etc) and also BOM (browser object model) -- various browser functions: `setTimeout`, `alert`, `location` and so on, see <https://html.spec.whatwg.org>. It takes DOM specification and extends it with many additional properties and methods.

Now we'll get down to learning DOM, because the document plays the central role in the UI, and working with it is the most complex part.

Please note the links above, because there's so many stuff to learn, it's impossible to cover and remember everything. When you'd like to read about a property or a method -- can go <https://developer.mozilla.org/en-US/search>, but looking up the corresponding spec may be better. Longer to read, but will make your fundamental knowledge stronger.

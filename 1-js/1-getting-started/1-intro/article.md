# JavaScript Introduction

Let's see what's so special about JavaScript, what we can achieve with it and what other technologies coexist with it.

## What is JavaScript?   

*JavaScript* was initially created to *"make webpages alive"*.

The programs in this language are called *scripts*. They are put directly into HTML and execute automatically as it loads.

Scripts are provided and executed a plain text. They don't need a special preparation or compilation to run.

In this aspect, JavaScript is very different from another language called [Java](http://en.wikipedia.org/wiki/Java).

[smart header="Why <u>Java</u>Script?"]
When JavaScript was created, it initially had another name: "LiveScript". But Java language was very popular at that time, so it was decided that positioning a new language as a "younger brother" of Java would help.

But as it evolved, JavaScript became a fully independent language, with its own specification called [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), and now it has no relation to Java altogether.

It has quite a few special features that make mastering a bit hard at first, but we'll nicely deal with them later.
[/smart]

JavaScript can execute not only in the browser, but anywhere, with the help of a special program called [an interpreter]("http://en.wikipedia.org/wiki/Interpreter_(computing)"). The execution process is called "an interpretation".

[smart header="Compilation and interpretation"]
There are in fact two general approaches to execute programs: "compilers" and "interpreters".

<ul>
<li>*Compilers* convert the program text (source code) to another language, usually the machine language (binary code) without executing it. This is done by the developer and then the binary code is distributed to the system which actually runs it.</li>
<li>*Interpreters*, and in particular the one embedded in the browser -- get the source code and execute it "as is". The source code (script) is distributed to the system as a plain text.</li>
</ul>

Modern interpreters actually combine these approaches into one: the script is distributed as a plain text, but prior to execution is converted to the machine language. That's why JavaScript is very fast.
[/smart]

All major browsers have an embedded JavaScript interpreter, that's why they are capable of script execution. But naturally JavaScript can be used not only in-browser. It's a full-fledged language usable at the server too and even in a washing machine if it gets a chip with the interpreter installed.

[warn header="Let's talk about browsers"]
Further in the chapter we talk about capabilities and limitaitons of JavaScript in the browser.
[/warn]

## What JavaScript can do?   

The modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or CPU, because it was initially created for browsers which do not require it.

Other capabilities depend on the environment which runs JavaScript. In the browser JavaScript is able to do everything related to webpage manipulation, talk to the visitor and, to some extent, talk to the internet.

Or, in more details, it is able to:

<ul>
<li>Create new HTML tags, remove the existing ones, change styles, hide/show elements...</li>
<li>React on user actions, run on mouse clicks, pointer movements, key presses...</li>
<li>Send requests over the network to remote servers, download and upload data without reloading the page (a so-called "AJAX" technology)...</li>
<li>Get and set cookies, ask for data, show messages...</li>
<li>...and can do much more with the page and it's content!</li> 
</ul>

## What JavaScript can NOT do?

JavaScript abilities in the browser are limited for user safety, mainly not to let an evil webpage access private information or harm the user's data.

Such limits do not exist if JavaScript is used outside of the browser, for example on a server. Besides, modern browsers allow to install plugins and extensions which get extended permissions, but require actions from the user to accept that.

JavaScript abilities are also limited when it tries to access things outside of the current window/page.

<img src="limitations.svg">

<ul>
<li>JavaScript may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to the OS.

Modern browsers allow it to work with files, but limit the access to a specially created directory called "a sandbox". There is a work going on to allow access to devices, with the user's permission.
</li>
<li>JavaScript from a browser tab may not access other tabs and windows with the exception when they were opened by this script and come from the same origin (domain, port, protocol).

There are ways to workaround this, and they are explained in the tutorial, but they require a special code on both documents which reside in different tabs/windows. Without it, for the sake of safety, JavaScript is disallowed to delve into another tab contents.
</li>
<li>JavaScript can easily interact over the net to the server where the current page came from. But it's ability to receive data from other sites/domains is crippled. Though possible, it requires the explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's safety limitations.
</li>
</ul>

## Why JavaScript is unique?   

There are at least *three* great things about JavaScript:

[compare]
+Full integration with HTML/CSS.
+Simple things done simply.
+Supported by all major browsers and enabled by default.
[/compare]

Combined, these 3 things only exist in JavaScript and no other browser technology. 

That's what makes JavaScript unique. That's why it is the most widespread way of creating browser interfaces.

## The Trends

While planning to learn a new technology, it's beneficial to check it's trends and perspectives.

JavaScript shines in this aspect.

### HTML 5

*HTML 5* is an evolution of HTML standard which adds new tags and what's more important -- new browser abilities, accessable from JavaScript.

A few examples:

<ul>
<li>Read/write files on disk (in a "sandbox", not just any file).</li>
<li>A database embedded in the browser, to keep data on a user's computer and effeciently operate on it.</li>
<li>Multitasking with the usage of many CPU cores in one time.</li>
<li>Audio/video playback.</li>
<li>2d and 3d-drawing with hardware acceleration support, just like in modern games.</li>
</ul>

Many new abilities are still in progress, but browsers gradually start to support them.

[summary]
The trend: JavaScript can do more and more, as features are added to browsers, it is becoming more like a desktop application.
[/summary]

### EcmaScript 6

JavaScript evolves. The upcoming EcmaScript 6 standard adds many new language-level features which make it's syntax more capable and expressive.

Modern browsers improve their engines to raise JavaScript execution script, fix bugs and try to follow the standards.

[summary]
The trend: JavaScript is becoming faster and more stable, gets new syntax.[/summary]

It's crucially important that new standards, HTML5, EcmaScript 6 are still compatible with the previous code, so there are introduced into the ecosystem without problems with the existing applications.

Still, there is a small gotcha with those "extra-fresh" modern browser abilities. Sometimes browsers try to implement them on very early stages when they are nor fully defined neither agreed upon, but still are so  interesting that the developers just can't wait.

...As the time goes, the specification matures and changes, and browsers must adapt it. That may lead to errors in JavaScript code which was too eager to use the early browser implementation. So one should think twice before relying on things that are in draft yet.

But what's great -- eventually all browsers tend to follow the standard. There are much less differences between them now than only a couple years ago.

[summary]
The trend: browsers, though eager for new features, become compatible with the standard.
[/summary]


## Alternative browser technologies

Besides JavaScript, other technologies are used in-browser. Together they allow to get better results.

### Java   

Java is a widespread general-purpose language. For webpages, there is a special browser-level Java plugin which allows to run "applets".

*An applet* is a program written in Java language which can be attached to HTML using the `applet` tag, like this:

```html
<applet code="MyApplet.class" codebase="/path/to/code">
  <param name="nodes" value="50,30,70,20,40,60,80,35,65,75,85,90">
  <param name="root" value="50">
</applet>
```

This tag loads the Java program from `MyApplet.class` and executes it with given parameters (`nodes`, `root`).

The applet runs in a rectangular part of the page, so called "container". All user actions inside it are processed by the applet. One can hide the container if the applet does something not fit for the show.

Of course, Java runtime environment and the browser plugin must be installed and enabled to let the applet execute, and the applet itself must be signed by the publisher, otherwise it will be blocked.

**Why us, JavaScript-developers should be aware of Java?**

Mainly because a signed Java-applet can do literally everything on a visitor's computer, just like any other program. Of course that requires a visitor's agreement to run it, but after that they can break of any restrictions. 

So if the user trusts as (like he's already a client of ours), we can implement something that pure javascript can't do yet.

Just to note, JavaScript and Java-applets can interact with each other, so JavaScript will have access to capabilities provided by the applet.

### Browser plugins and extensions

All modern browsers allow to write plugins using either JavaScript and/or C language.

The plugins can both handle a special kind of content (a media-player to play music) and interact with the page.

Just as Java-applets, they have wider access than JavaScript, but the user must install them and agree that he trusts the plugin.

### Adobe Flash   

Adobe Flash is a long-lived cross-browser platform mainly targeted on multimedia and animations.

Just like Java, a pre-compiled Flash program can be attached to HTML and executed in a rectangular container.

Flash is good at cross-browser device access: camera, microphone, and for certain OS-level features like the clipboard. Also it is good at networking.

One can access Flash programs from JavaScript and vice versa.

The main drawback is that it needs Adobe Flash player to be installed and enabled. Users tend to disable it, because of nasty "multimedia" ads and many vulnerabilities in the past. Also, certain operational systems like iOS (iPhone, iPad) do not support it at all.

## Languages over JavaScript

The syntax of JavaScript does not suit everyone's needs: some people think that it's too flexible, the others consider it too limited, the third ones want to add new features absent in the standard...

That's normal, because projects and requirements are different for everyone. There's no a single standard for a carpenter's hammer, why should it exist for the language?

So recently a plethora of new languages appeared, which add features "over" JavaScript, meaning that the source code in these languages is *transpiled* (converted) to JavaScript before they run.

The transpilation happens automatically, modern tools make the process very fast and transparent, actually allowing developers to code in another language. They still should know JavaScript, to better understand what they are doing.

A few examples of such languages:

<ul>
<li>[CoffeeScript](http://coffeescript.org/) is a "syntax sugar" for JavaScript, it introduces shorter syntax, allowing to write more precise and clear code. Usually Ruby guys like it.</li>
<li>[TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing", to simplify development and support of complex systems. Developed by Microsoft.</li>
<li>[Dart](https://www.dartlang.org/) was offered by Google as a replacement for JavaScript, but other leading internet companies declared that they are not interested. Maybe later, we'll see. Right now it can be transpiled to JavaScript, but used less often compared to two previous alternatives.</li>
</ul>

[smart header="ES6 and ES7 right now"]
The upcoming standards really bring a lot of goodies.

For those eager to use them now, there are transpilers which take the code written with the new standards and convert it into the older one, so that the browsers can execute it.

For example, [6to5](https://6to5.org/).

Here in the first part of the tutorial I feel a little bit shy to use them, because without a native browser support such tools add unnecessary complexity at the start and can be easily integrated later when the basics are learned.
[/smart]


## Summary

JavaScript is unique due it's full integration with HTML/CSS and wide browser adoption.

...But a good JavaScript-developer should be aware of other technologies too. Our ultimate purpose is to create best frontend apps, and sometimes Java, Flash or plugins can be helpful too.

Other languages like CoffeeScript and TypeScript can help to develop faster and write less bug-proof code. It is recommended to take a look at them, at least briefly, after mastering JavaScript.


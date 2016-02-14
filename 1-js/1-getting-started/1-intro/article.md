# An introduction to JavaScript 

Let's see what's so special about JavaScript, what we can achieve with it and which other technologies play well with it.

## What is JavaScript?   

*JavaScript* was initially created to *"make webpages alive"*.

The programs in this language are called *scripts*. They can be written right in the HTML and execute automatically as the page loads.

Scripts are provided and executed a plain text. They don't need a special preparation or a compilation to run.

In this aspect, JavaScript is very different from another language called [Java](http://en.wikipedia.org/wiki/Java).

[smart header="Why <u>Java</u>Script?"]
When JavaScript was created, it initially had another name: "LiveScript". But Java language was very popular at that time, so it was decided that positioning a new language as a "younger brother" of Java would help.

But as it evolved, JavaScript became a fully independent language, with its own specification called [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), and now it has no relation to Java at all.

[/smart]

At present, JavaScript can execute not only in the browser, but also on the server, or actually on any device where a special program called [an interpreter]("http://en.wikipedia.org/wiki/Interpreter_(computing)") is installed. The execution process is called "an interpretation". 

The browser has an embedded JavaScript interpreter, sometimes it's also called a "JavaScript engine" or a "JavaScript virtual machine".

Different engines have different "codenames", for example:
<ul>
<li>[V8 engine]("https://en.wikipedia.org/wiki/V8_(JavaScript_engine)") -- in Chrome and Opera.</li>
<li>[Gecko]("https://en.wikipedia.org/wiki/Gecko_(software)") -- in Firefox.</li>
<li>...There are other codenames like "Trident", "Chakra" for different versions of IE, "Nitro" and "SquirrelFish" for Safari etc.</li>
</ul>

The codenames are good to know. They are used when searching for detailed information in the internet. Also, we'll sometimes reference them further in the tutorial. Instead of the words "Chrome supports feature..." we'd rather say "V8 supports feature...", not just because it's more precise, but because that also implies Opera and Node.JS.

[smart header="Compilation and interpretation"]
There are two general approaches to execute programs: "compilation" and "interpretation".

<ul>
<li>*Compilers* convert the program text (source code) to binary code (or kind-of) without executing it. When a developer wants to publish the program, he runs a compiler with the source code and then distributes the binary files that it produces.</li>
<li>*Interpreters*, and in particular the one embedded in the browser -- get the source code and execute it "as is".</li>
</ul>

As we can see, an interpretation is simpler. No intermediate steps involved. But a compilation is more powerful, because the binary code is more "machine-friendly" and runs faster at the end user.

Modern javascript engines actually combine these approaches into one: 
<ol>
<li>The script is written and distributed as a plain text (can be compressed/optimized by so-called "javascript minifiers").</li>
<li>The engine (in-browser for the web) reads the script and converts it to the machine language. And then it runs it. That's why JavaScript executes very fast. 

Even more than that, the binary code may be adjusted later, through the process of its execution. The engine learns more about the actual data that it works with and then can optimize it better.</li>
</ol>

So the term "interpretation" is used mostly for historical reasons. We do know what there's actually a two-stage (at least) process behind it.
[/smart]


## What in-browser JavaScript can do?

The modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or CPU, because it was initially created for browsers which do not require it. 

Other capabilities depend on the environment which runs JavaScript. For instance, Node.JS has functionality that allows JavaScript to read/write arbitrary files, perform network requests etc.

In the browser JavaScript can do everything related to webpage manipulation, interaction with the user and the webserver.

For instance, in-browser JavaScript is able to:

<ul>
<li>Add new HTML to the page, change the existing content, modify styles.</li>
<li>React on user actions, run on mouse clicks, pointer movements, key presses.</li>
<li>Send requests over the network to remote servers, download and upload data without reloading the page (a so-called "AJAX" technology).</li>
<li>Get and set cookies, prompt user for the data, show messages.</li>
<li>Store data in-browser ("localStorage").</li> 
</ul>

## What in-browser JavaScript can NOT do?

JavaScript abilities in the browser are limited for the sake of the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.

The examples of such restrictions are:

<ul>
<li>JavaScript on the webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS system functions.

Modern browsers allow it to work with files, but the access is limited and only provided if the user does certain actions, like "dropping" a file into a browser window or selecting it via an `<input>` tag.

There are ways to interact with camera/microphone and other devices, but they require an explicit user's permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the NSA.
</li>
<li>Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. Such action is allowed. But even in this case, JavaScript from one page may not access the other if they compe from different sites (from a different domain, protocol or port).

That is called a "Same Origin Policy". To workaround that, *both pages* must contain a special JavaScript code that handles data exchange.

The limitation is again for a user's safety. A page from `http://anysite.com` which a user has opened occasionaly must not be able to open or access another browser tab with the URL `http://gmail.com` and steal information from there.
</li>
<li>JavaScript can easily communicate over the net to the server where the current page came from. But it's ability to receive data from other sites/domains is crippled. Though possible, it requires the explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's safety limitations.
</li>
</ul>

<img src="limitations.png">


Such limits do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow installing plugin/extensions which may get extended permissions.


## Why JavaScript is unique?   

There are at least *three* great things about JavaScript:

[compare]
+Full integration with HTML/CSS.
+Simple things done simply.
+Supported by all major browsers and enabled by default.
[/compare]

Combined, these 3 things only exist in JavaScript and no other browser technology. 

That's what makes JavaScript unique. That's why it is the most widespread way of creating browser interfaces.

While planning to learn a new technology, it's beneficial to check it's perspectives. So let's move on to the modern trends that include new languages and browser abilities. 

## HTML 5

*HTML 5* is an evolution of HTML which adds new tags and what's more important -- new browser abilities, accessable from JavaScript.

Few examples:

<ul>
<li>Write files on disk (in a "sandbox", not to any folder).</li>
<li>A database embedded in the browser, to keep data on a user's computer and effeciently operate on it.</li>
<li>Multitasking with the usage of many CPU cores in one time.</li>
<li>Audio/video playback.</li>
<li>2d and 3d-drawing with hardware acceleration support, just like in modern games.</li>
</ul>

Many new abilities are still in progress, but browsers gradually improve the support for them.

[summary]
The trend: browser can do more and more, it is becoming more like an all-purpose desktop application.
[/summary]

Still, there is a small gotcha with those "extra-fresh" modern browser abilities. Sometimes browsers try to implement them on very early stages when they are nor fully defined neither agreed upon, but are so  interesting that the developers just can't wait.

...As the time goes, the specification matures and changes, and browsers must adapt it. That may lead to errors in the older code which was too eager to use the early version. So one should think twice before relying on things that are in draft yet.

But what's great -- eventually all browsers tend to follow the standard. There are much less differences between them now than only a couple years ago.

[summary]
The trend: browsers, though eager for new features, tend to be compatible with the standard.
[/summary]

## New ECMAScript

JavaScript evolves. The upcoming ECMAScript-2016 standard adds more language-level features which make the syntax more capable and expressive.

Modern browsers improve their engines to raise JavaScript execution script, fix bugs and try to follow the standards.

[summary]
The trend: JavaScript is becoming faster, gets new syntax and language features.
[/summary]

## Languages "over" JavaScript

The syntax of JavaScript does not suit everyone's needs: some people think that it's too flexible, the others consider it too limited, the third ones want to add new features absent in the standard...

That's normal, because projects and requirements are different for everyone. 

So recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run.

The transpilation happens automatically, modern tools make the process very fast and transparent, actually allowing developers to code in another language. But they still should know JavaScript, to better understand what they are doing.

Examples of such languages:

<ul>
<li>[CoffeeScript](http://coffeescript.org/) is a "syntax sugar" for JavaScript, it introduces shorter syntax, allowing to write more precise and clear code. Usually Ruby guys like it.</li>
<li>[TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing", to simplify development and support of complex systems. Developed by Microsoft.</li>
<li>[Dart](https://www.dartlang.org/) is a standalone language that has it's own engine that runs in non-browser environments (like mobile apps). It was initially offered by Google as a replacement for JavaScript, but as of browsers require it to be transpiled to JavaScript just like the ones above.</li>
</ul>

## Summary

<ul>
<li>JavaScript was initially created as a browser-only language, but now used in many other environments as well.</li>
<li>At this moment, JavaScript as a unique position as a most widely adopted browser language with full integration with HTML/CSS.</li>
<li>There are over languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.</li>
</ul>



# Developer console

And the last step before we start developing...

A code is error-prone. You are quite likely to have errors... Oh what I'm talking? You are *absolutely* going to make errors, if you're a human, not a [robot]("https://en.wikipedia.org/wiki/Bender_(Futurama)").

So let's grasp the basics of developer console.

In browser, a user doesn't see the errors by default. So, if something goes wrong in the script, we won't see what's broken and can't fix it.

To see errors and get a lot of other useful information about scripts, browsers have embedded "developer tools".

**It is recommended to use Chrome or Firefox for the development.**

Other browsers also provide developer tools, but are usually in a "catching-up" position, compared to Chrome/Firefox which are the best.

If there is an error in the certain browser only, then we can use it's developer tools, but usually -- Chrome/Firefox.

Developer tools are really powerful, there are many features, but on this stage let's just look how to open them, look at errors and run JavaScript commands.

[cut]

## Google Chrome   

Open the page [bug.html](bug.html). 

There's an error in the JavaScript code on it. An ordinary visitor won't see it, so let's open developer tools.

Press the key [key F12] or, if you're on Mac, then [key Cmd+Opt+J].

The developer tools will open on the Console tab by default.

It looks somewhat like this:

<img src="chrome.png">

The exact look depends on your Chrome version. It changes from time to time, but should be similar.

<ul>
<li>Here we can see the red-colored error message. In this case the script contains a "lalala" command, which was put there just because it is unknown.</li>
<li>On the right, there is a clickable link to the source `bug.html:12` with the line number where the error has occured.</li>
</ul>

Below the error message there is a blue `>` symbol. It marks a "command line" where we can type JavaScript commands and press enter to run them ([key Shift+Enter] to input multiline commands).

Now we can see errors and that's enough for the start. We'll be back to developer tools later and cover debugging more in-depth in the chapter [](/debugging-chrome).

## Safari

For Safari, we need to enable the "Develop menu" first.

There's a checkbox for that at the bottom of the "Advanced" pane of the preferences:

<img src="safari.png">

Now [key Cmd+Opt+C] can toggle the console. Also note that the new top menu item has appeared with many useful options.

## Other browsers

Most other browsers use [key F12] to open developer tools.

The look & feel of them is quite similar, once we know how to use one of them (can start with Chrome), can easily switch to another.

## Summary

<ul>
  <li>Developer tools allow us to see errors, run commands, examine variables and much more.</li>
<li>They can be opened with [key F12] for most browsers under Windows. Chrome for Mac needs [key Cmd+Opt+J], Safari: [key Cmd+Opt+C] (need to enable first).
</li>
</ul>

Now we have the environment ready. In the next section we get down to JavaScript.
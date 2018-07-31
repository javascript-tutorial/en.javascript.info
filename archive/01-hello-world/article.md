# Hello, world!

About 98% of the tutorial is core Javascript, that is platform-independant. So you'll be able to learn how to use Node.JS and other things based on that knowledge.

But we need something like a "base environment" to run our scripts, and browser is probably a good choice.

So we'll start with attaching a script to the webpage. For other environments like Node.JS there are other ways to run it.

[todo remove defer/async from here and move to 2nd part?]

## The "script" tag

[todo need this? and special (need it too?)]
```smart header="What if I want to move faster?"
In the case if you've developed with JavaScript already or have a lot of experience in another language, you can skip detailed explanatins and jump to <info:javascript-specials>. There you can find an essense of important features.

If you have enough time and want to learn things in details then read on :)
```

JavaScript programs can be inserted in any place of HTML with the help of the `<script>` tag.

For instance:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...After the script.</p>

</body>

</html>
```

```online
You can run the example clicking on a "Play" button in it's right-top corner.
```

The `<script>` tag contains JavaScript code which is automatically executed when the browser meets the tag.

Please note the execution sequence:

1. Browser starts to parse the document and display the page.
2. When the browser meets `<script>`, it switches to the JavaScript execution mode. In this mode it executes the script.
3. The `alert` command shows a message and pauses the execution.
4. Note that at this moment a part of the page before the script is shown already.
5. When the script is finished, it gets back to the HTML-mode, and *only then* it shows the rest of the document.

![Rendering order](hello-world-render.png)

A visitor won't see the content after the script until it is executed. In other words, a `<script>` tag blocks rendering.

## The modern markup

The `<script>` tag has a few attributes that are rarely used nowadays, but we can find them in the old code:

 The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>

 : The old standard HTML4 required a script to have the type. Usually it was `type="text/javascript"`. The modern HTML standard assumes this `type` by default, no attribute is required.

 The `language` attribute: <code>&lt;script <u>language</u>=...&gt;</code>
  : This attribute was meant to show the language of the script. As of now, this attribute makes no sense, the language is JavaScript by default. No need to use it.

Comments before and after scripts.
: In really ancient books and guides, one may find comments inside `<script>`, like this:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    These comments were supposed to hide the code from an old browser that did't understand a `<script>` tag. But for all browsers born in the past 15+ years that's not an issue. I only mention it here, because it serves as a pointer. If you see that in a code somewhere -- it's probably really old and probably not worth looking into.

## Summary

- We can use a `<script>` tag to add JavaScript code to the page.
- The `type` and `language` attributes are not required.
- A `<script>` tag blocks page rendering. Later we'll see how to evade that where needed.


# Hello, world!

In this chapter we'll create a simple script and see it working.

[cut]
## The "script" tag

[smart header="What if I want to move faster?"]
In the case if an impatient reader has developed with JavaScript already or has a lot of experience in another language, he can skip detailed explanatins and jump to [](/javascript-specials). There he can find an essense of important features.

If you have enough time and want to learn things in details then read on :)
[/smart]

JavaScript programs can be inserted in any place of HTML with the help of the `<script>` tag.

For instance:

```html
<!--+ run height=100 -->
<!DOCTYPE HTML>
<html>

<body>

  <p>Document start...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...Document end.</p>

</body>

</html>
```

You can run the example clicking on a "Play" button in it's right-top corner.

The `<script>` tag contains JavaScript code which is automatically executed when the browser meets the tag.

Please note the sequence:

<ol>
<li>Browser starts to parse/show the document, makes it up to the `<script>`.</li>
<li>When the browser meets `<script>`, it switches to the JavaScript execution mode. In this mode it executes the script. In this case `alert` command is used which shows a message.</li>
<li>When the script is finished, it gets back to the HTML-mode, and *only then* it shows the rest of the document.</li>
</ol>

So, a visitor won't see the content after the script until the script finishes to execute.

People say about that: "a `<script>` tag blocks rendering".


## The modern markup

In the past, `<script>` had a few necessary attributes.

We can find the following in the old code:

<dl>
 <dt>The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code></dt>

 <dd>The old standard HTML4 required a script to have the type. Usually it was `type="text/javascript"`. The modern HTML standard assumes this `type` by default, no attribute is required.
</dd>

 <dt>The `language` attribute: <code>&lt;script <u>language</u>=...&gt;</code></dt>
  <dd>This attribute was meant to show the language of the script. Certain outdated browsers supported other languages at that time. As of now, this attribute makes no sense, the language is JavaScript by default. No need to use it.</dd>
<dt>Comments before and after scripts.</dt>
<dd>In the most pre-historic books and guides, `<script>` may have comments inside.

Like this:

```html
<!--+ no-beautify -->
<script type="text/javascript"><!--
    ...
//--></script>
```

These comments were supposed to hide the code from an old browser that did't understand a `<script>` tag. But all browsers from the past 15 years know about `<script>`, so that's a really ancient theme. Giving this for the sake of completeness only. So if you see such code somewhere you know the guide is really ancient and not worth looking into.
</dd>
</dl>

In summary, we just use `<script>` to add some code to the page, without additional attributes and comments.


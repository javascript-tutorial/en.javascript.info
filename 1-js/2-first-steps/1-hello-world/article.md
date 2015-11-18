# Hello, world!

In this chapter we'll create a simple script and see it working.

[cut]
## The "script" tag

[smart header="What if I want to move faster?"]
In the case if the reader of these lines has developed with JavaScript already or has a lot of experience in another language, he can skip detailed explanatins and jump to [](/javascript-specials). There he can find an essense of important features.

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

[online]
You can run the example clicking on a "Play" button in it's right-top corner.
[/online]

The `<script>` tag contains JavaScript code which is automatically executed when the browser meets the tag.

Please note the execution sequence:

<ol>
<li>Browser starts to parse the document and display the page.</li>
<li>When the browser meets `<script>`, it switches to the JavaScript execution mode. In this mode it executes the script.</li>
<li>The `alert` command shows a message and pauses the execution.</li>
<li>*Note that a part of the page before the script is shown already at this moment.*</li>
<li>When the script is finished, it gets back to the HTML-mode, and *only then* it shows the rest of the document.</li>
</ol>

A visitor won't see the content after the script until it is executed. In other words, a `<script>` tag blocks rendering.


## The modern markup

In the past, `<script>` had a few necessary attributes.

We can find the following in the old code:

<dl>
 <dt>The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code></dt>

 <dd>The old standard HTML4 required a script to have the type. Usually it was `type="text/javascript"`. The modern HTML standard assumes this `type` by default, no attribute is required.
</dd>

 <dt>The `language` attribute: <code>&lt;script <u>language</u>=...&gt;</code></dt>
  <dd>This attribute was meant to show the language of the script. As of now, this attribute makes no sense, the language is JavaScript by default. No need to use it.</dd>
<dt>Comments before and after scripts.</dt>
<dd>In really ancient books and guides, one may find comments inside `<script>`, like this:

```html
<!--+ no-beautify -->
<script type="text/javascript"><!--
    ...
//--></script>
```

These comments were supposed to hide the code from an old browser that did't understand a `<script>` tag. But all browsers born in the past 15 years know about `<script>`, so that's not an issue. So if you see such code somewhere you know the guide is really old and probably not worth looking into.
</dd>
</dl>

## Summary

<ul>
<li>We can use a `<script>` tag without attributes to add JavaScript code to the page.</li>
<li>A `<script>` tag blocks page rendering. Can be bad. Later we'll see how to evade that.</li>
</ul>


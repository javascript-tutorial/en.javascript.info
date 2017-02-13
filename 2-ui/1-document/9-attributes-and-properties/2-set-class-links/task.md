importance: 3

---

# Add the class to external links

Make all external links yellow by adding them the class `"external"`.

A link is external if:
- It's `href` has `://` in it
- But doesn't start with `http://internal.com`.

```html run
<style>
  .external {
    background-color: yellow
  }
</style>

<a name="list">the list</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>
```

The result should be:

[iframe border=1 height=180 src="solution"]

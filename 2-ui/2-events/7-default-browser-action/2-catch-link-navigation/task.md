importance: 5

---

# Catch links in the element

Make all links inside the element with `id="contents"` ask the user if he really wants to leave. And if he doesn't then don't follow.

Like this:

[iframe height=100 border=1 src="solution"]

Details:

- HTML inside the element may be loaded or regenerated dynamically at any time, so we can't find all links and put handlers on them. Use the event delegation.
- The content may have nested tags. Inside links too, like `<a href=".."><i>...</i></a>`.

importance: 4

---

# Load visible images

Let's say we have a slow-speed client and want to save their mobile traffic.

For that purpose we decide not to show images immediately, but rather replace them with placeholders, like this:

```html
<img *!*src="placeholder.svg"*/!* width="128" height="128" *!*data-src="real.jpg"*/!*>
```

So, initially all images are `placeholder.svg`. When the page scrolls to the position where the user can see the image -- we change `src` to the one in `data-src`, and so the image loads.

Here's an example in `iframe`:

[iframe src="solution"]

Scroll it to see images load "on-demand".

Requirements:
- When the page loads, those images that are on-screen should load immediately, prior to any scrolling.
- Some images may be regular, without `data-src`. The code should not touch them.
- Once an image is loaded, it should not reload any more when scrolled in/out.

P.S. If you can, make a more advanced solution that would "preload" images that are one page below/after the current position.

P.P.S. Only vertical scroll is to be handled, no horizontal scrolling.

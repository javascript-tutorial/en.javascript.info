# The clickjacking attack

The "clickjacking" attack allows an evil page to click on a "victim site" *on behalf of the visitor*.

Many sites were hacked this way, including Twitter, Facebook, Paypal and other sites. They are all fixed, of course.

[cut]

## The idea

The idea is very simple.

Here's how clickjacking was done with Facebook:

1. A visitor is lured to the evil page. No matter how.
2. The page has a harmlessly-looking link on it (like "get rich now" or "click here, very funny" and so on).
3. Over that link the evil page positions a transparent `<iframe>` with `src` from facebook.com, in such a way that the "Like" button is right above that link. Usually that's done with `z-index`.
4. Clicking on that link, the visitor in fact presses that button.

## The demo

Here's how the evil page looks like. To make things clear, the `<iframe>` is half-transparent (in real evil pages it's fully transparent):

```html run height=120 no-beautify
<style>
iframe { /* iframe from the victim site */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* in real opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>Click to get rich now:</div>

<!-- The url from the victim site -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Click here!</button>
*/!*

<div>...And you're cool (I'm a cool hacker actually)!</div>
```

The full demo of the attack:

[codetabs src="clickjacking-visible" height=160]

Here we have a half-transparent `<iframe src="facebook.html">`, and in the example we can see it hovering over the button. A click on the button actually clicks on the iframe, but that's not visible to the user, because the iframe is transparent.

As a result if the visitor is authorized on facebook ("remember me" is usually turned on), then it adds a "Like". On Twitter that would be a "Follow" button.

Here's the same example, but closer to reality, with `opacity:0` for `<iframe>`:

[codetabs src="clickjacking" height=160]

All we need to attack -- is to position the `<iframe>` on the evil page in such a way that the button is right over the link. That's usually possible with CSS.

```smart header="Clickjacking is for clicks, not for keyboard"
The attack only affects mouse actions.

Technically, if we have a text field to hack, then we can position an iframe in such a way that text fields overlap each other. So when a visitor tries to focus on the input he sees on the page, he actually focuses on the input inside the iframe.

But then there's a problem. Everything that the visitor types will be hidden, because the iframe is not visible.

So that would look really odd to the user, and he will stop.
```

## Old-school defences (weak)

The oldest defence method is the piece of JavaScript that forbids to open the page in a frame (so-called "framebusting").

Like this:

```js
if (top != window) {
  top.location = window.location;
}
```

That is: if the window finds out that it's not on the top, then it automatically makes itself the top.

As of now, that's not reliable, because there are many ways to hack around it. Let's cover a few.

### Blocking top-navigation

We can block the transition caused by changing `top.location` in the [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload) event.

The top page (that belongs to the hacker) sets a handler to it, and when the `iframe` tries to change `top.location` the visitor gets a message asking him whether he wants to leave.

Like this:
```js
window.onbeforeunload = function() {
  window.onbeforeunload = null;
  return "Want to leave without learning all the secrets (he-he)?";
};
```

In most cases the visitor would answer negatively, because he doesn't know about the iframe, all he can see is the top page, there's no reason to leave. And so the `top.location` won't change!

In action:

[codetabs src="top-location"]

### Sandbox attribute

One of the things restricted by the `sandbox` attribute is navigation. A sandboxed iframe may not change `top.location`.

So we can add the iframe with `sandbox="allow-scripts allow-forms"`. That would relax the restrictions allowing scripts and forms. But we don't put `allow-top-navigation` in the value so that the navigation is still forbidden. And the change of `top.location` won't work.

Here's the code:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

There are other ways to work around that simple protection too.

## X-Frame-Options

Server-side header `X-Frame-Options` can allow or forbid showing the page inside a frame.

It must be sent by the server: browser ignore it if found in `<meta>` tags. So `<meta http-equiv="X-Frame-Options"...>` won't do anything.

The header may have 3 values:


`DENY`
: Never ever show the page inside an iframe.

`SAMEORIGIN`
: Allow to show inside an iframe if the parent document comes from the same origin.

`ALLOW-FROM domain`
: Allows to show inside an iframe if the parent document is from the given domain.

For instance, Twitter uses `X-Frame-Options: SAMEORIGIN`. Here's the result:

```html
<iframe src="https://twitter.com"></iframe>
```

<iframe src="https://twitter.com"></iframe>

Depending on the browser, `iframe` above is either empty or it has a message telling that "the browser can't show it".

## Showing with disabled functionality

The protecting `X-Frame-Options` header has a side-effect. Other sites can't show our page in an `iframe`, even if they have "legal" reasons to do so.

So there are other solutions. For instance, we can "cover" the page with a `<div>` with `height:100%;width:100%`, so that it handles all clicks. That `<div>` should disappear if `window == top` or we figure out that we don't need protection.

Like this:

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Go to the site</a>
</div>

<script>
  // there will be an error if top window is from the different origin
  // but that's ok here
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

The demo:

[codetabs src="protector"]

## Summary

Clickjacking is a way to "trick" users into a clicking on a victim site without even knowing what happens. That's dangerous if there are important click-activated actions.

A hacker can post a link to his evil page in a message or lure visitors to his page by other means. There are many variants.

From one side -- the attack is "not deep": all a hacker can do is one click. But from another side, if the hacker knows that after the click another control appears, then it may use cunning messages to make the user to click on it as well.

The attack is quite dangerous, because when we engineer the UI we usually don't think that a hacker can click on behalf of the visitor. So vulnerabilities can be found in totally unexpected places.

- It's recommended to use `X-Frame-Options: SAMEORIGIN` on pages that are totally not meant to be shown inside iframes (or just for the whole site).
- Use a covering `<div>` if we want to allow our pages to be shown in iframes, and still stay safe.

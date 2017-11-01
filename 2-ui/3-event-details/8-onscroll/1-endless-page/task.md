importance: 5

---

# Endless page

Create an endless page. When a visitor scrolls it to the end, it auto-appends current date-time to the text (so that a visitor can scroll more).

Like this:

[iframe src="solution" height=200]

Please note two important features of the scroll:

1. **The scroll is "elastic".** We can scroll a little beyond the document start or end in some browsers/devices (empty space below is shown, and then the document will automatically "bounces back" to normal).
2. **The scroll is imprecise.** When we scroll to page end, then we may be in fact like 0-50px away from the real document bottom.

So, "scrolling to the end" should mean that the visitor is no more than 100px away from the document end.

P.S. In real life we may want to show "more messages" or "more goods".

Answers:

1. The first is `big.js`, that's a normal sequence for external `<script>` tags.
2. The first is `small.js`, because `async` makes script behave independently of each other and the page. The first to loads runs first.
3. The first is `big.js`, because "deferred" scripts keep relative execution order.

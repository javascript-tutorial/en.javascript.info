
# Authoring

This describes important stuff about authoring new articles of the tutorial.

## Internal links

All tutorial links should start from the root, not including the domain.

✅ OK:

```md
We'll cover that in the chapter [about functions](/function-basics)
```

❌ Not ok:

```md
We'll cover that in the chapter [about functions](https://javascript.info/function-basics)
```

Also, to reference a chapter, there's a special "info:" scheme, like this:

```md
We'll cover that in the chapter <info:function-basics>.
```

Becomes:
```html
We'll cover that in the chapter <a href="/function-basics">Function basics</a>.
```

The title is auto-inserted from the referenced article. That has the benefit of keeping the right title if the article gets renamed.

## TODO

Ask @iliakan to for more details.

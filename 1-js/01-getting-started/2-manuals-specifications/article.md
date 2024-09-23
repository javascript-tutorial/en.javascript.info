
# Manuals and specifications

You're now reading a *tutorial*. It aims to help you gradually learn the language. Once you're familiar with the basics, you'll need other resources, so here's a brief list.

If you're new to JavaScript, then you don't (yet) need them now. But you will need them later, so make a bookmark.

## Specification

[The ECMA-262 specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm) is a formal definition of the language.

It contains the most in-depth, detailed and formalized information about JavaScript! If you ever need the ultimately trustworthy source of information, the specification is the right place. However, its highly formal writing style makes it difficult to read. So it's not for everyday use.

- A new specification version is released every year. Between these releases, the latest specification draft is at <https://tc39.es/ecma262/>.
- To read about new bleeding-edge features, including those that are "almost standard" (so-called "stage 3"), see proposals at <https://github.com/tc39/proposals>.

## MDN manual

[MDN (Mozilla) JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) is a great manual with examples.

It contains a lot of information both about JavaScript and its browser-specific usage.

Instead of accessing it directly, it's often faster to use an internet search, such as Google. Just search for "MDN ..." and the query, for example [MDN parseInt](https://google.com/search?q=MDN+parseInt) to search for the `parseInt` function in MDN.

## Compatibility tables

JavaScript continues to evolve, new features get added to the specification (and hence to the language) regularly.

However, when a new feature appears in the specification, it doesn't really mean that everyone can use it. JavaScript engines need time to adopt it. So before actually using a fresh language capability, it's best to make sure that it's well-supported.

To see the current state of support, there're two great resources:

- <https://caniuse.com> – per-feature tables of support, e.g. to see which engines support modern cryptography functions: <https://caniuse.com/#feat=cryptography>.
- <https://compat-table.github.io/compat-table/es2016plus> – a table with a list of language features and engines that support those or don't support.

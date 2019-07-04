
# URL objects

The built-in [URL](https://url.spec.whatwg.org/#api) class provides a convenient interface for creating and parsing URLs.

There are no networking methods that require exactly an `URL` object, strings are good enough. So technically we don't have to use `URL`. But sometimes it can be really helpful.

## Creating an URL

The syntax to create a new URL object:

```js
new URL(url, [base])
```

- **`url`** -- the URL string or path (if base is set, see below).
- **`base`** -- an optional base, if set and `url` has only path, then the URL is generated relative to `base`.

For example, these two URLs are same:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Go to the path relative to the current URL:

```js run
let url = new URL('https://javascript.info/profile/admin');
let testerUrl = new URL('tester', url);

alert(testerUrl); // https://javascript.info/profile/tester
```


The `URL` object immediately allows us to access its components, so it's a nice way to parse the url, e.g.:

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Here's the cheatsheet:

![](url-object.png)

- `href` is the full url, same as `url.toString()`
- `protocol` ends with the colon character `:`
- `search` - a string of parameters, starts with the question mark `?`
- `hash` starts with the hash character `#`
- there may be also `user` and `password` properties if HTTP authentication is present: `http://login:password@site.com` (not painted above, rarely used).


```smart header="We can use `URL` everywhere instead of a string"
We can use an `URL` object in `fetch` or `XMLHttpRequest`, almost everywhere where a string url is expected.

In the vast majority of methods it's automatically converted to a string.
```

## SearchParams "?..."

Let's say we want to create an url with given search params, for instance, `https://google.com/search?query=JavaScript`.

We can provide them in the URL string:

```js
new URL('https://google.com/search?query=JavaScript')
```

...But parameters need to be encoded if they contain spaces, non-latin letters, etc (more about that below).

So there's URL property for that: `url.searchParams`, an object of type [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

It provides convenient methods for search parameters:

- **`append(name, value)`** -- add the parameter,
- **`delete(name)`** -- remove the parameter,
- **`get(name)`** -- get the parameter,
- **`getAll(name)`** -- get all parameters with the same `name` (that's possible, e.g. `?user=John&user=Pete`),
- **`has(name)`** -- check for the existance of the parameter,
- **`set(name, value)`** -- set/replace the parameter,
- **`sort()`** -- sort parameters by name, rarely needed,
- ...and also iterable, similar to `Map`.

For example:

```js run
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!'); // added parameter with a space and !

alert(url); // https://google.com/search?query=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // this parameter specifies for date range for Google Search

alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// iterate over search parameters (decoded)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, then tbs=qdr:y
}
```


## Encoding

There's a standard [RFC3986](https://tools.ietf.org/html/rfc3986) that defines which characters are allowed and which are not.

Those that are not allowed, must be encoded, for instance non-latin letters and spaces - replaced with their UTF-8 codes, prefixed by `%`, such as `%20` (a space can be encoded by `+`, for historical reasons that's allowed in URL too).

The good news is that `URL` objects handle all that automatically. We just supply all parameters unencoded, and then convert the URL to the string:

```js run
// using some cyrillic characters for this example

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```
As you can see, both `Тест` in the url path and `ъ` in the parameter are encoded.

### Encoding strings

If we're using strings instead of URL objects, then we can encode manually using built-in functions:

- [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) - encode URL as a whole.
- [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) - decode it back.
- [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) - encode URL components, such as search parameters, or a hash, or a pathname.
- [decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) - decodes it back.

What's the difference between `encodeURIComponent` and `encodeURI`?

That's easy to understand if we look at the URL, that's split into components in the picture above:

```
http://site.com:8080/path/page?p1=v1&p2=v2#hash
```

As we can see, characters such as `:`, `?`, `=`, `&`, `#` are allowed in URL. Some others, including non-latin letters and spaces, must be encoded.

That's what `encodeURI` does:

```js run
// using cyrcillic characters in url path
let url = encodeURI('http://site.com/привет');

// each cyrillic character is encoded with two %xx
// together they form UTF-8 code for the character
alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...On the other hand, if we look at a single URL component, such as a search parameter, we should encode more characters, e.g. `?`, `=` and `&` are used for formatting.

That's what `encodeURIComponent` does. It encodes same characters as `encodeURI`, plus a lot of others, to make the resulting value safe to use in any URL component.

For example:

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Compare with `encodeURI`:

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

As we can see, `encodeURI` does not encode `&`, as this is a legit character in URL as a whole.

But we should encode `&` inside a search parameter, otherwise, we get `q=Rock&Roll` - that is actually `q=Rock` plus some obscure parameter `Roll`. Not as intended.

So we should use only `encodeURIComponent` for each search parameter, to correctly insert it in the URL string. The safest is to encode both name and value, unless we're absolutely sure that either has only allowed characters.

### Why URL?

Lots of old code uses these functions, these are sometimes convenient, and by noo means not dead.

But in modern code, it's recommended to use classes [URL](https://url.spec.whatwg.org/#url-class) and [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams).

One of the reason is: they are based on the recent URI spec: [RFC3986](https://tools.ietf.org/html/rfc3986), while `encode*` functions are based on the obsolete version [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

For example, IPv6 addresses are treated differently:

```js run
// valid url with IPv6 address
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

As we can see, `encodeURI` replaced square brackets `[...]`, that's not correct, the reason is: IPv6 urls did not exist at the time of RFC2396 (August 1998).

Such cases are rare, `encode*` functions work well most of the time, it's just one of the reason to prefer new APIs.

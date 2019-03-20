# File and FileReader

A [File](https://www.w3.org/TR/FileAPI/#dfn-file) object inhereits from `Blob`, but is extended with filesystem-related capabilities.

There are two ways to obtain it.

First, there's a constructor, similar to `Blob`:

```js
new File(fileParts, fileName, [options])
```

- **`fileParts`** -- is an array of Blob/BufferSource/String value, same as `Blob`.
- **`fileName`** -- file name string.
- **`options`** -- optional object:
    - **`lastModified`** -- a timestamp (integer date) of last modification.

Second, more often we get a file from `<input type="file">` or drag'n'drop or other browser interfaces. Then the file gets these from OS.

For instance:

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // e.g my.png
  alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
}
</script>
```

```smart
The input may select multiple files, so `input.files` is an array-like object with them. Here we have only one file, so we just take `input.files[0]`.
```

## FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) is an object with the sole purpose of reading from `Blob` (and hence `File` too) objects.

It's event based, as reading from disk may take time.

The constructor:

```js
let reader = new FileReader(); // no arguments
```

The main methods:

- **`readAsArrayBuffer(blob)`** -- read the data as `ArrayBuffer`
- **`readAsText(blob, [encoding])`** -- read the data as a string (encoding is `utf-8` by default)
- **`readAsDataURL(blob)`** -- encode the data as base64 data url.
- **`abort()`** -- cancel the operation.

As the reading proceeds, there are events:
- `loadstart` -- loading started.
- `progress` -- occurs during reading.
- `load` -- no errors, reading complete.
- `abort` -- `abort()` called.
- `error` -- error has occured.
- `loadend` -- reading finished with either success or failure.

When the reading is finished, we can access the result as:
- `reader.result` is the result (if successful)
- `reader.error` is the error (if failed).

The most widely used events are for sure `load` and `error`.

Here's an example of reading a file:

```html run
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

```smart header="`FileReader` for blobs"
As mentioned in the chapter <info:blob>, `FileReader` works for any blobs, not just files.

So we can use it to convert a blob to another format:
- `readAsArrayBuffer(blob)` -- to `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- to string (an alternative to `TextDecoder`),
- `readAsDataURL(blob)` -- to base64 data url.
```


```smart header="`FileReaderSync` is available for workers only"
For Web Workers, there also exists a synchronous variant of `FileReader`, called [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).

Its reading methods `read*` do not generate events, but rather return a result, as regular functions do.

That's only inside a Web Worker though, because delays and hang-ups in Web Workers are less important, they do not affect the page.
```

## Summary

`File` object inherit from `Blob`.

In addition to `Blob` methods and properties, `File` objects also have `fileName` and `lastModified` properties, plus the internal ability to read from filesystem. We usually get `File` objects from user input, like `<input>` or drag'n'drop.

`FileReader` objects can read from a file or a blob, in one of three formats:
- String (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- Data url, base-64 encoded (`readAsDataURL`).

In many cases though, we don't have to read the file contents. Just as we did with blobs, we can create a short url with `URL.createObjectURL(file)` and assign it to `<a>` or `<img>`. This way the file can be downloaded or shown up as an image, as a part of canvas etc.

And if we're going to send a `File` over a network, that's also easy, as network API like `XMLHttpRequest` or `fetch` natively accepts `File` objects.

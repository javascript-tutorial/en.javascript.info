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
Please note: the input may select multiple files, so `input.files` is an array-like object with them. Here we have only one file, but it's still the same, so we just take `input.files[0]`.
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

At the end:
- `reader.result` is the result (if successful)
- `reader.error` is the error (if failed).

The most widely used events are for sure `load` and `error`.

Here's an example:

```html run
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

  reader.readAsText(file);
}
</script>
```


```smart header="`FileReaderSync` is available for workers only"
For Web Workers, there also exists a synchronous variant of `FileReader`, called [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).

Reading methods `read*` do not generate events, but rather return the result, as regular functions do.

That's only inside a Web Worker though, because delays and hang-ups in Web Workers are less important, they do not affect the page.
```


It most often used to read from files, and

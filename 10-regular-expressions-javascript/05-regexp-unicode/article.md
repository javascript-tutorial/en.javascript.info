
# The unicode flag

The unicode flag `/.../u` enables the correct support of surrogate pairs.

Surrogate pairs are explained in the chapter <info:string>.

Let's briefly remind them here. In short, normally characters are encoded with 2 bytes. That gives us 65536 characters maximum. But there are more characters in the world.

So certain rare characters are encoded with 4 bytes, like `𝒳` (mathematical X) or `😄` (a smile).

Here are the unicode values to compare:

| Character  | Unicode | Bytes  |
|------------|---------|--------|
| `a` | 0x0061 |  2 |
| `≈` | 0x2248 |  2 |
|`𝒳`| 0x1d4b3 | 4 |
|`𝒴`| 0x1d4b4 | 4 |
|`😄`| 0x1f604 | 4 |

So characters like `a` and `≈` occupy 2 bytes, and those rare ones take 4.

The unicode is made in such a way that the 4-byte characters only have a meaning as a whole.

In the past JavaScript did not know about that, and many string methods still have problems. For instance, `length` thinks that here are two characters:

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

...But we can see that there's only one, right? The point is that `length` treats 4 bytes as two 2-byte characters. That's incorrect, because they must be considered only together (so-called "surrogate pair").

Normally, regular expressions also treat "long characters" as two 2-byte ones.

That leads to odd results, for instance let's try to find `pattern:[𝒳𝒴]` in the string `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // odd result
```

The result would be wrong, because by default the regexp engine does not understand surrogate pairs. It thinks that `[𝒳𝒴]` are not two, but four characters: the left half of `𝒳` `(1)`, the right half of `𝒳` `(2)`, the left half of `𝒴` `(3)`, the right half of `𝒴` `(4)`.

So it finds the left half of `𝒳` in the string `𝒳`, not the whole symbol.

In other words, the search works like `'12'.match(/[1234]/)` -- the `1` is returned (left half of `𝒳`).

The `/.../u` flag fixes that. It enables surrogate pairs in the regexp engine, so the result is correct:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

There's an error that may happen if we forget the flag:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // SyntaxError: invalid range in character class
```

Here the regexp `[𝒳-𝒴]` is treated as `[12-34]` (where `2` is the right part of `𝒳` and `3` is the left part of `𝒴`), and the range between two halves `2` and `3` is unacceptable.

Using the flag would make it work right:

```js run
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```

To finalize, let's note that if we do not deal with surrogate pairs, then the flag does nothing for us. But in the modern world we often meet them.

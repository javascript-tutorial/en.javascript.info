
# Unicode: flag "u"

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
alert( '𝒳'.match(/[𝒳𝒴]/) ); // odd result (wrong match actually, "half-character")
```

The result is wrong, because by default the regexp engine does not understand surrogate pairs.

So, it thinks that `[𝒳𝒴]` are not two, but four characters:
1. the left half of `𝒳` `(1)`,
2. the right half of `𝒳` `(2)`,
3. the left half of `𝒴` `(3)`,
4. the right half of `𝒴` `(4)`.

We can list them like this:

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

So it finds only the "left half" of `𝒳`.

In other words, the search works like `'12'.match(/[1234]/)`: only `1` is returned.

## The "u" flag

The `/.../u` flag fixes that.

It enables surrogate pairs in the regexp engine, so the result is correct:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

Let's see one more example.

If we forget the `u` flag and occasionally use surrogate pairs, then we can get an error:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // SyntaxError: invalid range in character class
```

Normally, regexps understand `[a-z]` as a "range of characters with codes between codes of `a` and `z`.

But without `u` flag, surrogate pairs are assumed to be a "pair of independant characters", so `[𝒳-𝒴]` is like `[<55349><56499>-<55349><56500>]` (replaced each surrogate pair with code points). Now we can clearly see that the range `56499-55349` is unacceptable, as the left range border must be less than the right one.

Using the `u` flag makes it work right:

```js run
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```

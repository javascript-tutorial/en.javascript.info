
The algorithm:
1. Make `img` for every source.
2. Add `onload/onerror` for every image.
3. Increase the counter when either `onload` or `onerror` triggers.
4. When the counter value equals to the sources count -- we're done: `callback()`.

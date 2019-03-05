importance: 5

---

# Finally or just the code?

Compare the two code fragments.

1. The first one uses `finally` to execute the code after `try..catch`:

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    } finally {
    *!*
      cleanup the working space
    */!*
    }
    ```
2. The second fragment puts the cleaning right after `try..catch`:

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    }

    *!*
    cleanup the working space
    */!*
    ```

We definitely need the cleanup after the work has started, doesn't matter if there was an error or not.

Is there an advantage here in using `finally` or both code fragments are equal? If there is such an advantage, then give an example when it matters.

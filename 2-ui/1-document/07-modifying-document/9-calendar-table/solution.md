We'll create the table as a string: `"<table>...</table>"`, and then assign it to  `innerHTML`.

The algorithm:

1. Create the table header with `<th>` and weekday names.
2. Create the date object `d = new Date(year, month-1)`. That's the first day of `month` (taking into account that months in JavaScript start from `0`, not `1`).
3. First few cells till the first day of the month `d.getDay()` may be empty. Let's fill them in with `<td></td>`.
4. Increase the day in `d`: `d.setDate(d.getDate()+1)`. If `d.getMonth()` is not yet the next month, then add the new cell `<td>` to the calendar. If that's a Sunday, then add a newline <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. If the month has finished, but the table row is not yet full, add empty `<td>` into it, to make it square.

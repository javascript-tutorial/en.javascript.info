**The answer: from `0` to `4` in both cases.**

```js
//+ run
for (var i = 0; i < 5; ++i) alert( i );

for (var i = 0; i < 5; i++) alert( i );
```

That can be easily deducted from the algorithm of `for`:
<ol>
<li>Execute once `i=0` before everything.</li>
<li>Check the condition `i<5`</li>
<li>If `true` -- execute the loop body `alert(i)`, and then `i++`</li>
</ol>

The increment `i++` is separated from the condition check (2). That's just another statement. 

The value returned by the increment is not used here, so there's no difference between `i++` and `++i`.
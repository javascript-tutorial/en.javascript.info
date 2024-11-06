
You may be tempted to take the lazy, slow, boring pseudo-synchronous way. 

It's ok...

```js run


async function showTimes() {
    const time1 = await babieca.run();
    alert(time1);

    const time2 = await rocinante.run();
    alert(time2);

    const time3 = await belcebu.run();
    alert(time3);
}

```

No much fun.
There is a better way. Use the promise API

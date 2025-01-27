
# Boring times

You may have been tempted to take the lazy, slow, boring pseudo-synchronous way. 

It's ok...

```js run


async function showTimes() {
    const time1 = await babieca.run();
    alert(time1);

    const time2 = await rocinante.run();
    alert(time2);

    const time3 = await bucephalus.run();
    alert(time3);
}

showTimes()

```

No much fun.
There is a better way. Make use of the promise API.


# Let's race!

```js run


async function race() {
    const results = await Promise.all([
        babieca.run(), 
        rocinante.run(), 
        bucephalus.run()
    ]);

    alert("All the horses reached the goal! 🎉🏇\n" + results.join('\n'));
}

race();

```

This has no cost for your code. The horses run simultaneously. You may see when they are arriving in your console.


Please note: if you only care for the fastest horse, you may use `promise.any` so you dont even need to wait for the slower ones

    const fastest = await Promise.any([babieca.run(), rocinante.run(), bucephalus.run()]);
    alert(`The winner: ${fastest}`);


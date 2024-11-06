
Let's race!

```js run


async function race() {
    const results = await Promise.all([
        babieca.run(), 
        rocinante.run(), 
        belcebu.run()
    ]);

    alert("All the horses reached the goal! 🎉🏇\n" + results.join('\n'));
}

race();

```

This has no cost for your code. The horses run simultaneously. You may see when they are arriving in your console.


Please note: if you only care for the fastest horse, you may use `promise.any` so you dont even need to wait for the slower ones

    const fastest = await Promise.any([babieca.run(), rocinante.run(), belcebu.run()]);
    alert(`The winner: ${fastest}`);


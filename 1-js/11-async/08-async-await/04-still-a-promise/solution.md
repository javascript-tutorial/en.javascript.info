
# Boring times

You may have been tempted to take the lazy, slow, boring pseudo-synchronous way. 

It's ok...

```js

// Your code
//

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
class Horse {
    constructor(name) {
        this.name = name;
    }

    async run() {
        const time = Math.random() * 30 + 10; // 10 to 40 seconds
        
        await new Promise(resolve => setTimeout(resolve, time * 1000 / 20)); // 20x. We don't want to wait realistic times, do we?

        const result = `${time.toFixed(2)} seconds for ${this.name}!!! `; // name, seconds.hundreths
        console.log(result);
        return result;
    }
}

const babieca = new Horse('Babieca');
const rocinante = new Horse('Rocinante');
const bucephalus = new Horse('Bucephalus');

// Your code...
//

async function race() {
    const results = await Promise.all([
        babieca.run(), 
        rocinante.run(), 
        bucephalus.run()
    ]);

    alert("All the horses have reached the goal! 🎉 \n" + results.join('\n'));
}

race();

```

This has no cost for your code. The horses run simultaneously. You may see as they are arriving in your console.


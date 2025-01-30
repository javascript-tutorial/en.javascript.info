Let's race!

```js run
class Horse {
    constructor(name) {
        this.name = name;
    }

    async run() {
        const time = Math.random() * 30 + 10; // 10 to 30 seconds
        
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
    const fastest = await Promise.any([
        babieca.run(), 
        rocinante.run(), 
        bucephalus.run()
    ]);

    alert(`We have a winner! : ${fastest}`); 
    // Fun fact: slower horses will continue running inside the engine, but nobody cares anymore

}

race();

```

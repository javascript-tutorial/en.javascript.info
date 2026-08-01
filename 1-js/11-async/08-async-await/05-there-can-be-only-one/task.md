
# There can be only one

Make the 3 horses run, show only the winner

```js

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

```

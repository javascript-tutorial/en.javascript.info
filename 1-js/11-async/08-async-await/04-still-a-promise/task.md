

# Still a promise

Make the 3 horses run then show their times

```js

class Horse {
    constructor(name) {
        this.name = name;
    }

    async run() {
        const time = Math.floor(Math.random() * 30) + 10;  // 
        
        await new Promise(resolve => setTimeout(resolve, time * 1000 / 20)); // 20x. We don't want to wait realistic times, do we?

        const result = `${time.toFixed(3)} seconds for ${this.name}!!! `;
        console.log(result);
        return result;
    }
}

const babieca = new Horse('Babieca');
const rocinante = new Horse('Rocinante');
const bucephalus = new Horse('Bucephalus');

```

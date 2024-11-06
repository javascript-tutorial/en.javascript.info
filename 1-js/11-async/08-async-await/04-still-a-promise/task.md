
# Still a promise

Make the horses run then show their times

```js

class Horse {
    constructor(name) {
        this.name = name;
    }

    async run() {
        const time = Math.floor(Math.random() * 3) + 1;
        
        await new Promise(resolve => setTimeout(resolve, time * 1000));

        const result = `${time * 20} segundos para ${this.name}!!! `;
        console.log(result);
        return result;
    }
}

const babieca = new Horse('Babieca');
const rocinante = new Horse('Rocinante');
const belcebu = new Horse('Belcebú');

```

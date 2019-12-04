## Spot The Difference

Earlier, we talk that we need to use additional return when we declare multiline arrow function.

but, can you spot the different for the code below?

```
let arrow = () => true;
let arrow1 = () => {
   alert(true)
} ;  

alert(arrow())
alert(arrow1())
```
*will arrow & arrow1 give the similiar output ?*

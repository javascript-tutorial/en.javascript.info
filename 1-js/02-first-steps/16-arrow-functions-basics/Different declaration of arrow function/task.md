## Spot The Difference

Earlier, we talk that we need to use additional return when we declare multiline arrow function.

but, can you spot the different for the code below?

```
let isIndomieGood = true ;
let arrow = () => isIndomieGood;
let arrow1 = () => {
   alert(isIndomieGood)
} ;  

alert(arrow())
alert(arrow1())
```
*will arrow & arrow1 give the similiar output ?*

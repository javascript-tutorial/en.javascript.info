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

**Answer** : **No**

alert(arrow()) //will output true.

alert(arrow1()) //will output true then undefined.

arrow() will produce true as return of the value of the function. 

but arrow1() will perform alert first but not returning anything. so the value of the function is still undefined. 
remember that when we declare multiline arrow function using curly brackets {} we need to put return *explicitly* .

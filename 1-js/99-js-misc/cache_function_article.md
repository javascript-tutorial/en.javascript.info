

As we know Functions are an integral part of programming. They help make program independent execute one task at a time so that it can reuse anywhere. If we cache those values that the function returns after its initial execution. It will help in boosting performance. 

To implement this we use some techniques like Memoization. It is also used to speed up the performance of the function.

Here we make the memoized function. When we input the same value into our recorded function, it returns the value collected in the cache instead of running the function again. After this, No longer your program have to recalculate every number to get a result.  


### Example wrap cache function

<pre>
var wrapCache = function(f, fKey){
   fKey = fKey || function(id){ return id; };
   var cache = {};
 
   return function(key){
       var _key = fKey(key);  
       if (!cache[_key]){
           cache[_key] = f(key);
       };
 
       return cache[_key];
 };
};

 
// functions that expensive
var getComputedRGB = function(n){
   console.log("getComputedRGB called", n) ;
   return n * n * n;  
};

 
// wrapping expensive
var getComputedRGBCache = wrapCache(getComputedRGB, JSON.stringify);
 

console.log("normal call");
console.log(getComputedRGB(10));
console.log(getComputedRGB(10));
console.log(getComputedRGB(10));
console.log(getComputedRGB(10));
// compute 4 times
 

 
console.log("cached call") ;
console.log(getComputedRGBCache(10));
console.log(getComputedRGBCache(10));
console.log(getComputedRGBCache(10));
console.log(getComputedRGBCache(10));
// compute just 1 times
 
 
// output
// => normal call  
// getComputedRGB called 10
// 1000
// getComputedRGB called 10
// 1000
// getComputedRGB called 10
// 1000
// getComputedRGB called 10
// 1000
 
// => cached call
// getComputedRGB called 10
// 1000
// 1000
// 1000
// 1000

</pre>

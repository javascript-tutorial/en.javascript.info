/*
 * Instead of hard-coding a bunch of separate test cases and their solutions,
 * this code takes several argument lists, and compares the chain call answer
 * you made for "sum()" to a more traditional way of adding the contents of an
 * array.
 */

describe("sum", function(){

  let testArgumentLists = [
    [1, 2],
    [5, -1, 2],
    [6, -1, -2, -3],
    [0, 1, 2, 3, 4, 5],
  ];

  for (let argumentList of testArgumentLists){
    
    it(makeTestCaseName(argumentList), function(){
      assert.equal(traditionalSum(argumentList), chainCallSum(argumentList));
    });
  }

});


function traditionalSum(arr){
  return arr.reduce(
    function(accumulator, item){
      return accumulator + item;  
    }, 0);
}

function makeTestCaseName(arr){
  return `sum${makeChainCallString(arr)} == ${traditionalSum(arr)}`;
}

/* Takes the elements of an array, and puts them in a string where each element
 * is enclosed in parentheses.  Example:
 * 
 * (["a", "b", "c"]) => "(a)(b)(c)"
 *
 * Useful for making pretty test case names.
 */
function makeChainCallString(arr){
  return arr.reduce(
    function(accumulator, item){
      return `${accumulator}(${item})`;
    }, "");
}

function chainCallSum(arr){
  return arr.reduce(
    function(accumulator, item){
      return accumulator(item);
    }, sum);
}

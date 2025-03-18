# Using a recursion

The recursive logic is a little bit tricky here.

We need to first output the rest of the list and *then* output the current one:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

Let's break this down:

- The printReverseList function takes in a singly linked list list as its argument.
- The first line of the function checks if the current node has a next node. If it does, the function recursively calls printReverseList on the next node. This continues until the end of the list is reached.
- The nested recursive calls in the printReverseList function do not finish execution with the alert statement because the alert statement is not the last line of the function. 
- In other words, when the printReverseList function is called recursively on the next node of the current node, it does not immediately log the value of that node to the alert. Instead, it first calls itself recursively on the next node again, which in turn calls itself recursively on the next node again, and so on, until it reaches the end of the list.
- Once the end of the list is reached, the function starts to print out the values of each node. Since we used recursion to iterate through the list, the function returns to the previous call stack and continues executing the rest of the function, at which point it executes the alert statement for each node in reverse order.

# Using a loop

The loop variant is also a little bit more complicated than the direct output.

There is no way to get the last value in our `list`. We also can't "go back".

So what we can do is to first go through the items in the direct order and remember them in an array, and then output what we remembered in the reverse order:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Please note that the recursive solution actually does exactly the same: it follows the list, remembers the items in the chain of nested calls (in the execution context stack), and then outputs them. 

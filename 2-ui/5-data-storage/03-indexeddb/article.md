libs:
  - 'https://cdn.jsdelivr.net/npm/idb@3.0.2/build/idb.min.js'

---

# IndexedDB

IndexedDB is a built-in database, much more powerful than `localStorage`.

- Also key/value storage, but not only strings: value can be (almost) anything, multiple key types.
- Multiple collections
- Supports transactions for reliability.
- Supports simple searching queries.
- Supports indexes for fast searches.
- Generates events when the data is modified.
- Can store much more data than `localStorage`.

That power is usually excessive for traditional client-server apps. IndexedDB is intended for offline apps, to be combined with ServiceWorkers and other technologies.

## Open database

To start working with IndexedDB, we need to open a database.

The syntax:

```js
let openRequest = indexedDB.open(name, version);
```

- `name` -- a string, the database name.
- `version` -- a positive integer number. By default `1`.

We can have many databases with different names, all within the current origin (domain/protocol/port). So different websites can't access databases of each other.

The native interface to IndexedDB, described in the specification <https://www.w3.org/TR/IndexedDB>, is event-based.

After the call, we need to listen to events on `openRequest` object:
- `success`: database is ready, use the database object `openRequest.result` for further work.
- `error`: open failed.
- `upgradeneeded`: database version is outdated (see below).

IndexedDB has a built-in mechanism of "schema versioning", absent in server-side databases.

Unlike server-side databases, IndexedDB is client-side, we don't have the data at hands. But when we publish a new version of our app, we may need to update the database somehow.

If the local database version is less than in `open`, then a special event `upgradeneeded` is triggered, and we can compare versions and upgrade data structures as needed.

The event also triggers when the database did not exist yet, so we can perform initialization.

For instance, when we first publish our app, we open it with version `1`:

```js
let openRequest = indexedDB.open("store", *!*1*/!*);

openRequest.onupgradeneeded = function() {
  // triggers if the client had no database
  // perform initialization
};
```

When we publish the 2nd version:

```js
let openRequest = indexedDB.open("store", *!*2*/!*);

openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  switch(db.version) { // previous db version
    case 0:
      // client had no database, we just made a new one
      // perform initialization
    case 1:
      // client had version 1
      // update
  }
};
```

When the database is ready, `success` triggers, and we can get the database object in it:

```js
openRequest.onsuccess = function() {
  let db = openRequest.result;
  // continue to work with database using db object
};
```

Or, to handle an error:
```js
openRequest.onerror = function() {
  console.error("Error", openResult.error);
};
```

After `onsuccess` we have the database object and can continue.

Here's an introduct

Here a new "object store" named `inventory` is created, and a `book` object is added to it:

```js
// inventory is where we're going to store our goods
let transaction = db.transaction(['inventory'], 'readwrite');
let inventory = transaction.objectStore('inventory', {keyPath: 'id'});

let book = {
  id: 'jsbook',
  price: 10,
  created: new Date()
};

// run the request and wait for onerror/onsuccess
let writeRequest = inventory.add(book);

writeRequest.onerror = function(e) {
  console.log('error', storeRequest.error.message);
};

writeRequest.onsuccess = function(e) {
  console.log('jsbook saved');
};
```

Soon we'll get more details about the methods in this example.

## Promisified wrapper

Right now we can already see that event-based API is quite cumbersome to use. Adding `onsuccess/onerror` to every request? No, thanks. If our app is big enough for IndexedDB, than we definitely should go for `async/await`.

**We'll use a thin promise wrapper <https://github.com/jakearchibald/idb> further in this chapter. It creates a global `idb` object with promisified IndexedDB methods.**

The original methods are described in [MDN manual](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) and in [the specification](https://w3c.github.io/IndexedDB).

If we use the wrapper, the example can be rewritten as:

```js
let transaction = db.transaction(['inventory'], 'readwrite');
let inventory = transaction.objectStore('inventory', {keyPath: 'id'});

let book = {
  id: 'jsbook',
  price: 10,
  created: new Date()
};

*!*
try {
  await inventory.add(book);
  console.log('jsbook saved');
} catch(err) {
  console.log('error', err.message);
}
*/!*
```

So we have all the sweet "plain async code" and "try..catch" stuff.

The wrapper performs a native IndexedDB request internally, adding `onerror/onsuccess` to it, and returns a promise that rejects/resolves with the result.

In few rare cases (to be covered) we need the original `request` object. Then we can access it as `request` property of the promise:

```js
let promise = inventory.add(book); // without await, we need the promise itself

let request = promise.request; // native request object

// ...do some native request voodoo
```

### Create database

Promisified database opening is a little bit different:

- **`idb.openDb(name, version, onUpgrade)`**
  - `name` – the database name.
  - `version` – the version of the database, an integer, by default `1`.
  - `noUpgrade` – a callback that runs if the stored database has a different `version`.

For instance, here I open a new database named `store`. If the user did not have it (`oldVersion=0`), then also initialize it;

```js
let db = await idb.openDb('store', 1, upgradeDB => {
  if (upgradeDB.oldVersion == 0) {
    // perform the initialization
    upgradeDB.createObjectStore('inventory', {keyPath: 'id'});
  }
});
```

It returns a database object `db`, that we'll use for further operations.

To delete a database:
```js
await idb.deleteDb('store');
```

## Object store

An object store is a core concept of IndexedDB. It's where the data is stored. A database may have multiple stores: one for user data, another one for goods, etc.

Despite being named an "object store", primitive types can be stored too.

**We can store almost any value, including complex objects.**

IndexedDB uses the [serialization algorithm](https://www.w3.org/TR/html53/infrastructure.html#section-structuredserializeforstorage) to clone-and-store an object. It's like `JSON.stringify`, but more powerful, capable of storing much more datatypes.

An example of object that can't be stored: an object with circular references. Such objects are not serializable. `JSON.stringify` also fails for such objects.

**Every value in the store must have an unique `key` that uniquely identifies it.**     

We can search/remove/update values by the key.

A key must have a type one of: number, date, string, binary, or array.

At the time of object store creation we need to tell IndexedDB how to get the key: is it an object property, or an auto-generated value, or provided at write-time.

The syntax to create an object store:
```js
db.createObjectStore(name[, options]);
```

Please note, the operation is synchronous, no `await` needed.

- `name` is the store name, e.g. `"inventory"` for goods,
- `options` is an optional object with properties:
  - `keyPath` -- a path to the object property that stores the key, e.g. `id` or `nested.id`.
  - `autoIncrement` -- if `true`, then the key for a newly stored object is generated automatically, as an ever-incrementing number.

If we don't supply any options, then we'll need to provide the key later when storing the object.

For instance, this object store uses `id` property as the key:
```js
db.createObjectStore('inventory', {keyPath: 'id'});
```

To delete an object store:

```js
db.deleteObjectStore('inventory')
```

```warn
An object store can only be created/modified while updating the DB version, in `upgradeneeded` handler. For the promise wrapper, in the `openDb` callback, as demostrated by the example above.

We can't do that later, there'll be an error.
```

## Transactions

Transactions are used to group operations, so that all of them either succeed or fail.

E.g. we have two bank accounts and need to transfer a $10000 from John to Pete. That's technically two database operations:
1. John's account: substract $10000.
2. Pete's account: add $10000.

These operations really must either both succeed or fail.

It would be terribly bad if the 1st operation passes, then e.g. lights go out, and the 2nd operation doesn't happen. Pete will give us a merry time about his money.

What we can do is to:
1. Start a transaction.
2. John's account: substract $10000.
3. Pete's account: add $10000.
4. Close the transaction.

Then the database guarantees that both these operations either pass (good) or fail (then the transfer failed, but John kept his money, so he can retry).

**All data operations must be made within a transaction in IndexedDB.**

To start a transaction:

```js run
db.transaction(store[, type]);
```

- `store` is a store name that the transaction is going to access, e.g. `"inventory"`. Can be an array of store names if needed.
- `type` – a transaction type, one of:
  - `readonly` -- can only read objects, the default.
  - `readwrite` -- can only read and write objects, but not modify object stores.

There'is also `versionchange` transaction type, that can do everything, but we can't create such transaction manually. IndexedDB does that automatically for `updateneeded` handler.

```smart header="What are transaction types for?"
Performance is the reason why transactions need to be labeled either `readonly` and `readwrite`.

If we have many operations, then `readonly` transactions may access concurrently the same store, but `readwrite` transactions can't: the next transaction must wait before the previous one finishes before accessing the same store. So it allows to make concurrent reading faster.
```

Let's add an two items to our inventory:

```js
let transaction = db.transaction("inventory", "readwrite");

// get an object store to operate on it
let inventory = transaction.objectStore("inventory");

await inventory.add({ id: 'js', price: 10, created: new Date() });
await inventory.add({ id: 'css', price: 5, created: new Date() });
// or we could await Promise.all([...]) to run them in parallel
```

Requests made to `inventory` are said to belong to the same `transaction`.

## Transaction lifecycle

In the example above we started the transaction and made two `add` requests. When do we finish it?

**When all transaction requests are finished, and the [microtasks queue](info:async-await#microtask-queue) is empty, it is committed automatically.**

```smart header="What is the microtask queue?"
The microtask queue is explained in [another chapter](info:async-await#microtask-queue). In short, an empty microtask queue means that for all settled promises their `.then/catch/finally` handlers are complete. Javascript uses an internal microtask queue to run those.

That includes `await promise` calls – if the `promise` is settled, the code must resume the execution and finish (or hang at the next `await`) before the microtask queue is considered empty.

In other words, promise-handling and resuming "awaits" is done before closing the transaction.
```

In the next version 3.0 of the specification, there will probably be a manual way to finish the transaction, but right now in 2.0 there isn't.

So, in the example above, when `add` requests are completed successfully, and the code finishes, the results are "committed" -- saved to disk automatically.

As a result, code like this doesn't work:

```js
let transaction = db.transaction("inventory", "readwrite");
let inventory = transaction.objectStore("inventory");

await inventory.add({ id: 'js', price: 10, created: new Date() });

await fetch(...); // (*)

await inventory.add({ id: 'js', price: 10, created: new Date() });
```

The last line will fail with a `TransactionInactiveError`.

That's because the transaction is auto-committed and finished immediately at line `(*)`.

Two conditions are true, and that's enough for auto-commit:
1. Microtask queue is complete -- true, at line `(*)` there are no unhandled promises except `fetch(...)`, and `fetch(...)` is, well, fetching, no result for handling yet (a "macrotask").
2. No unfinished requests -- also true, at line `(*)` there are no unfinished requests in the transaction.

**There may be no async operations in the middle of IndexedDB transaction, besides requests.**

Any operation that returns the execution to the main event loop -- leads to auto-commit. After that, it becomes impossible to write in this transaction.

Creators of IndexedDB believe that transactions should be short-lived. Mostly for performance reasons.

Notably, `readwrite` transactions "lock" the stores for writing. So if one part of application initiated `readwrite` on `inventory` object store, then another part that wants to do the same has to wait (transaction "hangs"). That may lead to strange delays if  transactions take time.

So it's recommended to split apart IndexedDB transactions and "other" async stuff. First, make `fetch`, prepare the data if needed, and then create a transaction, write to the database, it'll work then.


### Tracking completion

To detect the moment of successful completion:
- For native IndexDB transaction object: listen to `complete` event.
- In the promise wrapper: `await transaction.complete`.

```js
let transaction = db.transaction("inventory", "readwrite");

// ...perform operations

await transaction.complete;
```

Only `complete` guarantees that the transaction is saved as a whole. Individual requests may succeed, but the final write operation may go wrong (e.g. I/O error or something).

### Abort

To manually abort the transaction, call:

```js
transaction.abort();
```

That cancels all modification made by the requests in it.

## Error handling

Requests may fail not only because of errors at our side, but also for reasons not related to the transaction itself. For instance, the storage quota may be exceeded. Browsers allow to configure it, and even set to zero. So we must be ready to handle such case.

A request `error` event occurs on a native IndexedDB request object, and propagates up: `request` -> `transaction` -> `database`.

All events are handled DOM-style, with both capturing and bubbling, so we can catch `error` event on both phases on any of these objects, but usually only bubbling stage is used.

**A failed request automatically aborts the transaction, canceling all its changes.**

So, if e.g. the second `add` fails in the example above, then the first `add` is also not saved.

As we're using a promisified wrapper, a failed request means a rejected promise. That causes an exception in `await`, that we can catch using `try..catch`:

```js
try {
  inventory.add(book);
} catch(err) {
  console.log("Error", err);
}
```

If we don't catch the error, then it falls through and finally becomes an "unhandled promise rejection" event on `window` object.

We can handle them like this:

```js
window.addEventListener('unhandledrejection', event => {
  alert(event.target); // IndexedDB native request object

  alert(event.reason); // Unhandled error object
  // also accessible as event.target.error
});
```

There are rare cases when we can handle the error and let the transaction continue.

To do so, we need to call `event.preventDefault()` in `request.onerror`:

```js
request.onerror = function(event) {
  if (request.error.name == 'ConstraintError') {
     // handle non-critical error..
     event.preventDefault(); // prevent the transaction from aborting.
  } else {
    // handle critical error..
  }
};
```

Also we might want to call `event.stopPropagation()` to stop event from triggering `transaction.onerror` and `db.onerror`, because we totally handled it.

In case we're using promisified IndexedDB, we catch events in `try..catch`. In that case we don't have the `event` object. So, to keep the transaction we need to get a native request object `promise.request` and set the handler on it:








Let's get it back:

```js
let transaction = db.transaction("inventory"); // readonly by default

let inventory = transaction.objectStore("inventory");

let item = await inventory.get('jsbook');
```

The basic object store methods from [the specification](https://w3c.github.io/IndexedDB/#object-store-interface):

- **`get(key)`** -- get a value by key
- **`put(value[, key])`** -- add (or replace)


## Querying the database



So the database
 then perform these operations and finish the transaction:
So, transactions is a core concept of databases, including IndexedDB.


What we can do is to start a "transaction":


Transactions allow to group opera that never happens

A transaction   
Before you can do anything with your new database, you need to start a transaction. Transactions come from the database object, and you have to specify which object stores you want the transaction to span. Once you are inside the transaction, you can access the object stores that hold your data and make your requests. Next, you need to decide if you're going to make changes to the database or if you just need to read from it. Transactions have three available modes: readonly, readwrite, and versionchange.


// https://stackoverflow.com/questions/37971117/whats-the-difference-between-key-and-primarykey-in-idbcursor-of-indexeddbop

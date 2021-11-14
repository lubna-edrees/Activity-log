# Objects

## notes

- looping throgh an object: - `for (let el in Obj)` will loop over the keys. - `for (let el of bj)` will loop over the valuse ??

## Immutabilty

- once we create an object we can not change it. and if we want to change it we have to copy it and mutate the copy.
- ex: strings is immutable, whan u change a string u actually create a new string.
- ex: objects in js are mutable.
- pros of immutability:
  1. makes our programs more predictable.
  2. faster in change detection.
  3. concurrency.
  
- cons of immutability:
  1. copying every elemnt in order to change it can slow ur performance.
  2. memory proplems: also associated with copying. the solution for this is `structural sharing`, when copying the elemnt only the changed elemnts will be copied, others will be shared, `like shared by reference`.
  
## updating objects

- updating an object with immutability priciples in mind:

  ```js
    const obj = { name: "john" };

    obj.name = "Ahmad"; // wrong, we shouldn't do that, we need to creaete a copy first.

    // Object.assign()
    const newObj = Object.assign({}, obj, { name: "Ahmad", age: 27 }); // copy obj into newObj, and then update newObj with the new values.

    // spread operator
    const newObj = { ...obj } // make a copy
    newObj.name = "Ahmad"; update the copy.
  ```

- spraed operator will make a shallow copy of any nested object, we need to create a new deep copy to apply our changes to the copy only

  ```js
    const obj1 = { name: "ahmad", address: { country: "UK", city: "London" } };

    const newObj = { ...obj1 } //copy, shallow copy for address.
    newObj.address.city = "Bristol"; // the address of obj will changed as well.
    obj.address.city // Bristol.

    // To solve the problem
    const newObj = { ...obj, address: { ...obj.address }};
    newObj.address.city = "Bristol"; // the address of obj will NOT changed becaue we deep copied obj.
    obj.address.city // London.
  ```

## update object keys

  ```js
   const changeKey = (obj, old_key, new_key) => {
        // if the key will change
        if (old_key !== new_key) {
            Object.defineProperty(obj, new_key, // add a new property to obj with the obj[new_key] = same value.
                Object.getOwnPropertyDescriptor(obj, old_key)); // descriptor contains the valeu of the property
            delete obj[old_key]; // delete old key and its value.
        }


    }
  ```

## Delete object key

```js
  //1
  delete obj.keyName;
 
  //2
  obj.keyName = undefined;
```

## check if object

  ```js
    const isObject = obj => !!obj && typeof obj === 'object';
  ```

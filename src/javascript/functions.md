# Functions

* get all arguments to a function if you don't know the number of args in advance:

  ```javascript
  let argss = [...arguments]; //args will not work in all cases.
  //OR
  let argss = [].slice.call(arguments);
  ```


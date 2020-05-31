# Arrays

- create an array of length n filled with random numbers less than max:

  ```js
  Array.from({ length: n }, () => Math.floor(Math.random() * max));
  ```

- use `localCompare()` to sort nested structures. example:

  ```javascript
  arr3 = arr3.sort((a, b) => {
    return a[1].localeCompare(b[1]); //a and b are both arrays.
  });
  ```

# Numbers

- `e == 0` will return `true` if `e = flase` or any other falsey value, `e === 0` strict for 0 only.

- useful number formatter (espesially for currency)

  ```javascript
  /**
   * initializing currency formatter
   */
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });
  ```

- find Min and Max elemnt of an Array:

  ```javascript
  var numbers = [1, 2, 3, 4];
  Math.max.apply(null, numbers); // 4
  Math.min.apply(null, numbers); // 1

  //OR

  Math.max(...numbers); // 4
  Math.min(...numbers); // 1
  ```

- generating random number between 0 and max:

  ```javascript
  Math.floor(Math.random() * Math.floor(max));
  ```

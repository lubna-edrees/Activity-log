# CLI

* to grap key from user command in your cli, use `proccess.argv` witch gives you an `array` and your first arg is at index `2`.
* tricky chain of functions : take user input, convert to string, split over ' ', extract numbers from str and assign them to item1 and item2.

  ```javascript
  const [item1, item2] = input.toString().split(" ").map(Number);
  ```


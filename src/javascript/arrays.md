# Arrays

## notes

- create an array of length n filled with random numbers less than max:

  ```javascript
  Array.from({ length: n }, () => Math.floor(Math.random() * max));
  ```

- use `localCompare()` to sort nested structures. example:

  ```javascript
  arr3 = arr3.sort((a, b) => {
    return a[1].localeCompare(b[1]); //a and b are both arrays.
  });
  ```

## updating arrays with immutability in mind

- we don't change the original array, we deep copy the array, then update the copy.

  ```js
  const arr = [1,2,3];
  
  // add to the first or the end of an array
  const newArr = [...arr, 4] /* OR */ [4, ...arr];
  
  // add at a specific position
  const x = arr.indexOf(2);
  const newArr [...arr.slice(0,x), 4, ...arr.slice(x)];  // [1,4,2,3]
  
  // removing a specific element
  const newArr = arr.filter(e => e !== 2); // [1,3];
  
  // updating
  const newArr = arr.map(e =>  {if (e === 2) {return e = 20 }else { return e } } ); // [ 1,20,3]
  const newArr = arr.map( e => e === 2 ? 20 : e ); // [1,20,3]
  // arr.map() will create a new copy, arr.forEach() will update the original array.
  ```
- if the array contains objects, u need to deep copy them to comply with the immutabilty princible. 

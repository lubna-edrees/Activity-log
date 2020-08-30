# Functions

## hiegher oreder functions

- function that take another function as an argument or return it or both

  ```js
    function func1 ( func ) { func() } // as an argument
    function func2 () { return function func(){} } // return a func
    function func3 ( func ) { func(); return function(){} } // both
  ```

## handle function arguments 

- get all arguments to a function if you don't know the number of args in advance:

  ```javascript
  let argss = [...arguments]; //args will not work in all cases.
  //OR
  let argss = [].slice.call(arguments);
  ```

## Functional Composition

- combining two or more functions to produce a new function.
- Composing functions together is like snapping together a series of pipes for our data to flow through. 

  ```js
    const func1 =  str => str.trim();
    const func2 = str => `<div>${str}</div>`;
    const result = func2 ( func1 ( "  hello  " ) ); // compostion
  ```

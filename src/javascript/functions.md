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

  ```javascript
    const func1 =  str => str.trim();
    const func2 = str => str.toLowerCase ();
    const func3 = str => `<div>${str}</div>`;

    const result = func3 (  func2 ( func1 ( "  hello  " ) ) ); // compostion
  ```
  
- problems:
  1. you need to read code from right to left
  2. you ended up with a lot of pranctecess.
  
- so there is a cleaner way to compose functions, compose using lodash:

  ```js
    import { compose, pipe } from "lodash";
    const func1 =  str => str.trim();
    const func2 = str => str.toLowerCase ();
    const func3 = str => `<div>${str}</div>`;

    // composing the 3 functions
    const funcCompose = compose( func3 , func2, func1 ); // most right will be applyed first ( func1 ), then it goes left (func2) and so on
    const result = funcCompose("  hello ");  // no parentecess, but we still read from right

    // OR

    const funcCompose = pipe (func1, func2, func3 ); // most left function will be applied first,  then to the right
    const result = funcCompose("  hello ");  // no parentecess, reading from left.
  ```

## Function currying

- technique to reduces the number of arguments that a function needs.

  ```js
    const func1 = str => `<div>${str}</div>`;
    const func2 = str => `<span>${str}</span>`;

    // we can write them in one function

    const func = ( str, htmlEle ) => { return `<${htmlEle}>${str}</${htmlEle}>` }; // 2 args

    const func1 = str => func(str, "div"); // 1 argument only, currying
    const func2 = str => func (str, "span");

    const result = func1("  hello  ");

    // OR  
    const func = htmleEle => str => { return `<${htmlEle}>${str}</${htmlEle}>` };

    const result = func ( "div" )( " hello  " ); // currying
  ```
  
## pure functions

- a function that alaways give us the same results if we gave it the same arguments.

  ```js
    const func = x => x * Math.random();  // not pure, random
    const func = x => x * 2; // pure
    const func = x => x + Date().toLocalString();  // not pure, contains date
    const func = x => x = X * 2; // NOT pure, it mutate its value, change the value of x.
    const func = x => x > y; // NOT pure, y is global, if y changes the func result changes as well.
    const func = ( x, y ) => x > y; // pure, x and y specified, so it alaways give us the same result.
  ```
  
- pure functions `don't` contain:
  1. random
  2. date or time
  3. global state (DOM, file, DB ..)
  
- pure function `DO NOT` change (mutate) the value of its arguments.
- benifits of pure funcs:
  1. self documenting: every thin is existed in the func.
  2. easily testable
  3. concurrency: since we don't need global state we can call these funcs in parrallel.
  4. cachable: sice we know that result will not change, we can cache the result of this function, and when the result needed again we can retrive this result from cache rather than do the computation one more time, this is useful when the pure func do heavy computation to compute the result.

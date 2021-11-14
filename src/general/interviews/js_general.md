<!-- markdownlint-disable MD004 MD026 MD009 -->
# General Javascript Interview questions

## Index

1. [why do you use es6?, what’re your favourite features of es6](#1-why-do-you-use-es6-whatre-your-favourite-features-of-es6)
2. [functions declarations vs functions expressions](#2-functions-declarations-vs-functions-expressions)

## 1. why do you use es6?, what’re your favourite features of es6

* JavaScript is a lightweight, interpreted, object-oriented programming language with first-class functions most commonly known as a scripting language for web pages.
* scripting language, which means that its code is interpreted instead of compiled.
* ES6 has Object-Oriented Classes.
* ES6 has Arrow Functions
* arrow functions don't have `this` so you don't need to rebind.
* Modules are built into ES6.
* ES6 has template literal strings.
* ES6 uses Yarn
* ES6 let, const over var.
* ES6 has spread operators.
* ES6 has Promises
* ES6 for..in, for..of

## 2. functions declarations vs functions expressions

   ```js
      function x (args) { /*code */ } //declaration
      const x = function (args) { /*code */ } //expression
   ```

- function expressions are `not hoisted`, so you `can't` use it before declaration.

## 3. Class declarations vs class expressions

   ```js
      class myClass {
         constructor() { }   // class declaration
      }

      var myVar =  class myClass {
         constructor() { }   // class expression
      }

   ```

- you can't use class (instanciate) a class before its declaration.

## 4. what's hoisting?

- hoisting: mechanism only moves the declaration. The assignments are left in place.
- if the variable is not declared:
   
   ```js
      console.log(type of myVar); // undefined
      console.log(myVar); // ReferenceError
   ```
   
- all variable and function declarations are hoisted to the top of their scope, efore any code execution.
- undeclared variables do not exist until code assigning them is executed. Therefore, assigning a value to an undeclared variable implicitly creates it as a global variable when the assignment is executed. This means that, all undeclared variables are global variables.
   
   ```js
         function hoist() {
            a = 20;
            var b = 100;
         }

         hoist();

         console.log(a); // 20
         // Accessible as a global variable outside hoist() function
  

         console.log(b);  // ReferenceError
         /*
         Since it was declared, it is confined to the hoist() function scope.
         We can't print it out outside the confines of the hoist() function.
         Output: ReferenceError: b is not defined
         */
   ```
   
- always declare variables regardless of whether they are in a function or global scope. 
- if the variable declared down the app, call its value on top will not give referenceError because `its declaration has being hoisted before the execution`, while `its value still undefined` untill you `reach the assigment expression`. then it will gets a value.

   ```js
      console.log(hoist); // Output: undefined

      var hoist = 'hoist';
      
       console.log(hoist); // Output: hoist
   ```
   
- whten using strict mode, no hoisting, using variables before their declaration will throw an error:
   
   ```js
      'use strict';

      console.log(hoist); // Output: ReferenceError: hoist is not defined
      
      hoist = 'Hoisted'; 
   ```

- when using `let` or `const` keyword, the variable is hoisted to the top of the block, using variables before their declaration will throw an error, as if it is a `var in strict mode`:

   ```js
      console.log(hoist); // Output: ReferenceError: hoist is not defined
      
     let  hoist = 'Hoisted'; 
   ```
   
- constant variable must be both declared and initialised before use.
- function expressions are `not hoisted`, so you `can't` use it before declaration.
- while function declaration are `hoisted`.
- There's a bit of an argument to be made as to whether Javascript es6 let, const variables and classes are actually hoisted, roughly hoisted or not hoisted. Some argue that they are actually hoisted but uninitialised whilst some argue that they are not hoisted at all.

## 5. class hoisting

- class declarations are hoisted. However, they remain uninitialised until evaluation.
- class expressions are not hoisted.
- in both cases, you can't use a class before its declaration.

   ```js
         var x = new myClass(); // ReferenceError: myClass is not defined
         // class is hoisted, but uninitialized.

         class myClass {
         constructor() { }   // class declaration
         }


         var y = new myNewClass(); // TypeError: myNewClass is not a constructor
         // class is not hoisted.

         var myVar =  class myNewClass {
            constructor() { }   // class expression
         }

   ```

## 6. Order of precedence

- Variable assignment over function declaration

   ```js
      var double = 22;

      function double(num) {
        return (num*2);
      }

      console.log(typeof double); // Output: number
   ```
   
- Function declarations over variable declarations

   ```js
      var double;

      function double(num) {
        return (num*2);
      }

      console.log(typeof double); // Output: function
   ```

- Even if we reversed the position of the declarations, the JavaScript interpreter would still consider the `Order of precedence`.

## 7. shallow copying vs deep copying?

- A copy just looks like the old thing, but isn’t. When you change the copy, you expect the original thing to stay the same, whereas the copy changes.
- deep copy means that all of the values of the new variable are copied and disconnected from the original variable.
- A shallow copy means that certain (sub-)values are still connected to the original variable.
   
   ```js
      let x = [1,2,3];
      let y ={ x:1,  z:2 }
      
      let n = x; // shallow copy, changing n values will change x values
      let m = y // shallow copy
      
      
      let c = [];
      for( i in x ) { c[i] = x[i] }  // deep copy, c now is copmletely disconnected from x.
      
      let d = {};
      for(j in y){ d[j] = y[j] } // deep copy
      
      
      // Also, deep copies
      
      // Arrays 
       let a = [...x];
       let a = Array.from(x);
       let a = x.map(el => el);
       let a = x.slice();
     
     // Objects
      let b = { ...y };
      let b = Object.assign({}, y);
 
   ```

- if the object or the array yhat you'r copying contains another `no-permative` types like if they contains nested objects or arrays, those elements will get a shallow copy even if you do a deep copy to the main object

   ```js
      let x = { a: 1, b: [ 1,2 ], c:{ x:1, y:2 } };
      
      let y = { ...x } // shallow copy for x.a and x.b
      
      let y = { ...x.b, ...x.c, ...x } // deep copy
   ```

- if you don't know how deep your elements are, you can `stringify the element first`, then `parse` it to get deep copy.

   ```js
      let x = { a: 1, b: [ 1,2 ], c:{ x:1, y:2 } };
      
      let y = JSON.parse(JSON.stringify(x)) // deep copy
   ```

## 8. async vs sync?

### 5. when do you use promises vs Callbacks?

### 6. pros and cons of js? 

### 7. why "use strict"? 

- when using strict mode we opt into a restricted variant of JavaScript that will not tolerate the usage of variables before they are declared.
- Running our code in strict mode:
   1. Eliminates some silent JavaScript errors by changing them to explicit throw errors which will be spit out by the interpreter.
   2. Fixes mistakes that make it difficult for JavaScript engines to perform optimisations.
   3. Prohibits some syntax likely to be defined in future versions of JavaScript.

### 8. global scope vs block scope? 

### 9. what's fe or functional expression?? 

### 10. coding style; singilton pattern or factory patterns or revealing module pattern? 

### 11. how do you right readable code? 

### 12. const vs let? 

### 13. var vs let? 

### 14. document. cookie?? 

### 15. null vs undefined? 

### 16. attributes vs properties?? 

### 17. session vs loacalstorage?, 

### 18. Window vs document? 

### 19. event bubbling?? 

### 20. nan?? 

### 21. primitive types passed to a function by value, others passed by reference. 

### 22. by value: creating a copy of the original. 

### 23. parseInt? 

### 24. Prompt ?

### 25. func.call() vs func.apply()

- Call: pass the args individually as ..args
- Apply: pass the args as an array [args]

### 26. Empty an array

1. `arr = [];`
   1. assigns a reference to a new array to a variable, while any other references are unaffected.
   2. which means that references to the contents of the previous array are still kept in memory, leading to memory leaks.
2. `arr.length = 0;`
   1. deletes everything in the array, which does hit other references.
3. `arr.splice(0, arr.length);`
4. `while(arr.length){ arr.pop(); }`

### 27. Delete x

- delete opereator: deletes an entety from an object.
- will not affect any other types of vars.

### 28. Truthy and falsy values

### 29. delete an entity of an object will set it to undefined.

### 30. Object.create(obj)

### 31. const func = function(){ //code }
 
- reference error

### 32. First-class Functions

- JavaScript treats functions as first-class citizens, meaning you can pass functions as parameters to other functions just like you would any other variable.

### 33. JavaScript Is Prototype-based

- it supports classes and has some inheretance features similar to other kangs like c++ ..
- Prototype-based programming is a style of object-oriented programming in which behavior reuse (known as inheritance) is performed via a process of reusing existing objects via delegations that serve as prototypes.

### 34. JavaScript Event Loops

- event listener listening to an event, when the event is fired it goes to queue of events.
- the queue gets executed FIFO and sync.
- every element of the queue gets fully executed with its function before strating executing the second elemnt.
- if a function contains other function calls, they are all performed prior to processing a new message from the queue. This is called run-to-completion.
- JavaScript is non-blocking, meaning that when an asynchronous operation is being performed, the program is able to process other things, such as receiving user input, while waiting for the asynchronous operation to complete, not blocking the main execution thread. 

## Design patterns

### 35. Constructor Pattern

- you define a constructor, then you get instances of this constructor.
- changing some of constructor properties will not change the already created instances, it will only change the instances that will be created after the change to the constructor.

### 36. Prototype pattern

- define a cornstructor with some prototype properties.
- instantiatipon of this constructor will lead to create a new instance, but the prototypes properties still holded in the constructor.
- changes to the constructor will be copied to all instnces of this constructor.

### 37. arrow funcs vs normal funcs

```js
      class myclass {

         y(){
            this; // refers to the function y, not the class.
         }


         that = this;
         x(){
            this; // refers to the function x
            that ;// refers to the class
         }

         z = () => {
            this; // refers to fnction z
         }
      }

      // OR 

      var n = {
         x: function(){ console.log(this) }, // n
         that: this, // window
         y: function(){ console.log(this, this.that) }, //n , window
         z: () => console.log(this) // window
      }
   ```

## references

- [design patterens](https://www.toptal.com/javascript/comprehensive-guide-javascript-design-patterns)
- [hoisting](https://scotch.io/tutorials/understanding-hoisting-in-javascript#:~:text=Hoisting%20is%20a%20JavaScript%20mechanism,scope%20is%20global%20or%20local.)

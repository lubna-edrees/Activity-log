# General Javascript Interview questions

## ///

### 1. why do you use es6?, what’re your favourite features of es6

- JavaScript is a lightweight, interpreted, object-oriented programming language with first-class functions most commonly known as a scripting language for web pages.
- scripting language, which means that its code is interpreted instead of compiled.

### 2. what's hoisting?

### 3. shower copying?

### 4. async vs sync?

### 5. when do you use promises vs Callbacks?

### 6. pros and cons of js? 


### 7. why "use strict"? 

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


## references
- [design patterens](https://www.toptal.com/javascript/comprehensive-guide-javascript-design-patterns)

# OOP in JS

### 1. concepts of oop

- Abstraction
- Polymorphism
- Inheretance
- Encapsulation

### 2. procedural vs oop

- in procedural programming
   1. you write functions.
   2. change one function then you need to change everywhere 
   3. spaggitti code
   4. functions have more parameters

- in oop:
    1. you write classes.
    2. functions have less params.
    3. change only the code in the class and it will changes every where simply.

### 3. Abstraction

- reduce the impact of change.
- hide un-necceary data.

### 4. Inheretance

- eleminate redandant code.

### 5. polymorphism

- the object behaves differently depending on the class we are referincing.
- refactor ugly switch/case statments.

### 6. Encapsulation 

- reduce complexity.
- increase reusability.

### 7. objects lterals

```js
    const square = {
         x: 1,
         y: 2,
         area : function (){ console.log(this.x * this.y) }
      }
```

- object is collection of key value pairs.

### 8. Factory functions

```js
function createSquare(a,b){
    return  {
         x: a,
         y: b,
         area : function (){ console.log( a * b) }
      }
}

// so

let q1 = createSquare(2,2);
q1.area() //4
```

### 9. Constructors

- the first letter should be uppercase.
- it's like creating an instance of class, but in js there is no classes.

```js
function Square(a, b){
    this.x = a;
    this.y = b;
    this.area = function (){ console.log(this.x * this.y) };
}

// so

q2 = new Square(2,2);
// if we remove new,
// 1) this will refer to the global object.
// 2) q2 will be undefined.
q2.area() //4
```

### 10. This

- by default `this` refers to the global object, eg. `window`.
- by using the `new` keyword before a constructor, `this` will refer to the new object.

### 11. every object has a constructor refers to the function that used to create this object.

### 12. Default constructors

```js
let q3 = new Object()
q3.x = 2;
q3.y = 2;
q3.area = function(){ console.log(this.x * this.y) };

// OR

let q4 = new Object({
    x:2,
    y:2,
    area: function(){ console.log(this.x * this.y) }
})

// so 

q3.area()  //4
q4.area() //4
```

- other default constructors: `new String()` , `new Boolean()` , `new Number()` ...

### 13. Functions are objects

```js
const square = new Function('a , b', `
    this.x = a;
    this.y = b;
    this.area = function (){ console.log(this.x * this.y) };
    `)

    // So

    q5 = new square(2,2);
    q5.area() //4
```

### 14. Value Types (pirmiatives) vs Reference Types

- value types (pirimatives):
    1. Number
    2. String
    3. Boolean
    4. Symbol
    5. undefined
    6. null

- Reference types:
    1. Object
    2. Array
    3. Map
    4. Set
    5. Function
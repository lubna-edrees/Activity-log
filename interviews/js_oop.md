
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

```js
function Square(a, b){
    this.x = a;
    this.y = b;
    this.area = function (){ console.log(this.x * this.y) };
    let defaultLocation = {x:1, y:1} // private
    let defaultArea = function(){ 
        // code, this method is private
        // we can call defaultLocation directly without this 
    }
}

```

- `defaultLocation` and `defaultArea` are private. you can't access them from the outer program.
- `defaultLocation` and `defaultArea` are local variables in the constructor function, so we can think of them as private but they are `not`. 
- the square class interface does not contain defaultArea and defaultLocation and contain onlu x,y,area (the words with this).
- the square class is now abstracted, because we hide the default data so no body can miss around with them.

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

- copying a pirimative type will copy its value to the new variable.
- copying a refernce type will `not copy` its value to the new var, instead the `memory address` for the first var is stored in the new var.
- so copying a reference type is actually pointing to tits memory address.

```js
// value
let x = 10;
let y = x;
x = 20;  // x is 20, y still 10.

// reference
let x = { value: 10 };
let y = x;
x.value = 20; // y.value = x.value = 20.
```

- passing a var by its value to a function will not change its original value.
- passing a var by its reference will change its original value directly.

```js
// primiatves (by value)
let x = 10;
function increase(num) { num++; }
increase(x);
console.log(x);  // 10, copied by value, origin don't change.

// Objects (by reference)
let y = { value: 10 };
function increase(obj) { obj.value++; }
increase(y);
console.log(y);  // { value: 11 }, copied by ref, origin changed directly.
```

### 15. add/remove properties

```js
let o = {x:1}

// add
o.y = 2; // o is now {x:1, y:2}
o.x // 1, do notation
0["x"] // 1, bracket notation

// remove
delete o.y;
```

### 16. enamurating objects

```js
// constructor
function Square(a, b){
    this.x = a;
    this.y = b;
    this.area = function (){ console.log(this.x * this.y) };
}

// new object

let o = new Square(1,2)

// for .. in
for (key in o){
    console.log(key) // x , y , area
    console.log(o[key]) // 1, 2, funcion
}

// Object methods
const keys = Object.keys(o); // [x, y, area]
const values = Object.values(o); // [1, 2, function]

// check if a key existed in an oject
'x' in o; // true
'area' in o; // true
x in o; // false
```

### 17. setters and getters

```js
function Square(a, b){
    this.x = a;
    this.y = b;
    this.area = function (){ console.log(this.x * this.y) };
    let defaultLocation = {x:1, y:1} // private

    // 1) old way
    this.getDefaultLocation = function(){
        return defaultLocation // getter
    }
    this.setDefaultLocation = function(obj){
        defaultLocation.x = obj.x;
        defaultLocation.y = obj.y;
        // this is setter function
    }

    // to access it;
    // obj.getDefalutLocation() fo getter
    // obj.setDefalutLocation(objet) fo setter

    // 2) Another way
    Object.definePropoerty(this, 'defaultLocation', {
        get: function (){
            return defaultLocation
        }

        set: function(obj){
            defaultLocation.x = obj.x;
            defaultLocation.y = obj.y;
            // this is setter function
        }

    });

    // to access it;
    // obj.defalutLocation fo getter
    // obj.defalutLocation = objet fo setter
}

```

- accessing private properties should be only using methods setters and getters.
# programming terminoloy

## Programming Paradigms

various standard techniques used in programming [2].

### 1. imperative

- oldeset style.
- functions are built out of statements which are generally phrased as imperative commands [1].
- disadvantges:
   1. code reusability.
   2. unsafe nature of goto statements for implementing iterative blocks of code [2].

### 2. procedural

- procedures (functions) are stitched together to form a program
- solves the problems that were encountered in the imperative programming. 
- all programs can be seen as composed of the following control-structures [2]:
  
    1. sequential - ordered statements executed in a sequence
    2. selective - execute a selected block of statements based on the state of a program (Eg.  if then else... )
    3. iterative - execute a block repeatedly till some state is reached (Eg. while/for loop...)
    4. recursion - a statement is executed by repeatedly calling itself until some termination conditions are met

### 3. functional programming 

- use pure functions.
- Pure functions are those that do not use any state from other entities. Every function is a self-sufficient entity that just performs a complex transformation on given inputs to produce outputs. It doesn't modify the input and is practically isolated from rest of the program [2].
- The need of this pure functions arose from the fact that impure functions lead to various problems. Since they don't produce the same output on the same input, it makes the code harder for others to understand, debug and extend.
- advantages [2]:
    1. Lazy Evaluations: Since pure functions directly operate on input and behave like a transformation, one can actually remember transformations and apply them only when needed. So, when an input goes through series of pure functions sequentially, one can evaluate all those later only when the result is asked for.
    2. Parallelization: Pure functions can be easily parallelized as they are independent of each other.

### 4. Object-oriented Programming

- OOP is a programming paradigm based on a concept of entities (objects), which  contains data (member variables) and behaviors (member functions) [2]. 
- In OOP, computer programs are designed by making them out of objects interacting with one another. Every behavior of an object can possibly change the state ( member variables) of that object [2]. 
- advantages
    1. Code reusability - Features like classes and inheritance  make a lot of code reusable
    2. Encapsulation - Objects have abilities to hide a certain part of themselves from programmers. This prevents programmers tampering with things they shouldn't. Also, classes are designed to group related data implementing encapsulation [2]. 
    3. Intuitiveness and  Easy Design - It allows programmers to intuitively create large programs in a structured fashion.
    4. Extensible - Code in OOP is readable and much easier to maintain and modify compared to other paradigms

## programming languge features

a programming language can described as [1]:

1. modular : programs are made up of packages, which are made up of files.
2. object-oriented
3. statically-typed
4. garbage-collected
5. compiled: compiler takes the source code and translate it into machine language before execution.
6. imperative.
7. procedural.


## general
1. `statment` : sequence of instructions.
2.  `expression` :  the computation of a value by applying `operators` and `functions` to `operands`.


## functions
1. parameters: vars in between parcanteces when you `define` the function.
2. arguments: vars inside parantheces when you `call` the function.


## Memory and pointers

1. Main memory is a sequence of storage locations
2. Each location contains a value (content) and has a unique address
3. A pointer is an address of a location allocated in main memory to store a value
4. Pointer valued variables can store addresses of memory locations
5. when a program sart executing, enough ammount of memory is reserved to this program.
6. these reserved memory is bieng segmented to 3 segments 1`(segmentation)`:
   1. stack segment.
   2. data segment
   3. code segment
7. trying to access address of memory that is not bieng reserved to this program will give you `segmentaion fault or error`
8. use of `activation records` in the `stack` to manage all local variables in this program.
9. all local vars of all functions will be saved or reserved in the stack segment.


    Example: 

    ![example](https://i.imgur.com/9Ae1ZXY.png)


## Dynamic vs Static

- static var: the var defined and has its own value before the program starts executing, therefor it will be placed in the stack when the program starts executing.
- dynamic: the var is not defined or has no value when the program starts executing, therefor the program will dynamically allocate memory for this var, this var will be placed in the heap.


## References

- [1] https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/course/
- [2] https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/courseware/0bedc4e4756c42a9a704850dc93cffcf/ccab98a4b067400dabfe1ba3fd53a694/?activate_block_id=block-v1%3AIITBombayX%2BCS101.2x%2B1T2020%2Btype%40sequential%2Bblock%40ccab98a4b067400dabfe1ba3fd53a694
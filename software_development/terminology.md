# programming terminoloy

## programming languages 
some features for programming languages:
1. procedural : procedures (functions) are stitched together to form a program
2. imperative : functions are built out of statements which are generally phrased as imperative commands
3. modular : programs are made up of packages, which are made up of files.
4. object-oriented
5. statically-typed
6. garbage-collected
6. compiled: compiler takes the source code and translate it into machine language before execution.

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

- https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/course/
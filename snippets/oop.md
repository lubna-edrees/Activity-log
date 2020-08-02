# Object Oriented Programming

## some types of oop to look at

- object oriented modular programming
- incremental programming

## notes

- applying `encapsulation` will lead to `Abstraction`[2].
- in c++: class is a `structure` that all its members are private by default [2].

## intro

- structures (classes) is a collection of variables of possibly different types.
- an object is in instance of the structure, we can call it a structure itself.
- structures can be memberes of another structures
- you `can't` the `same` structure type as member of the `same` type, because we will get infinite loop of memory reservations.

    ```c++
        // c++
        struct MyStruct {
            int x;
            MyStruct y; // this is wrong
        }
    ```

## Structures and pointers

- structures in memory:

    ![structures in memory](https://i.imgur.com/vtmd4Dq.png)
    ![pointers in em]

- `myStruct*` is pointer to MyStruct type.
- Example:

    ```c++
    // c++
        struct MyStruct {
                int x;
                int y;
            }

        MyStrcut p1; // defining a new object
         MyStruct*  ptr // define a variable of type pointer to mystruct
         ptr = &p1 // assign memory addres of p1 to ptr
         *ptr = { 1 , 2 } // assign the data in memory addres &p1 to {1,2}

         // to access the pointer of y of p1
         ptrY = &p1 + 4 // &p1 points to the first member of p1 whic is x, x takes 4 bytes, after 4 byets we reach y.

        // OR

        ptr->y = 2 // assign data in y pointer to 2  // (&p1)->y  = 2
    ```

- pointers in structures:

    ![pointers in structures](https://i.imgur.com/NYCWKxX.png)

    in the photo above, istead of reserving `extra 54 bytes` for the driver in t1 we are pointing to d1 which cost only 4 bytes.

- since we `can not` use a structure as member of the same structure type, we can use its pointer in our code as this:

    ![use structure type in the same structure by its pointer](https://i.imgur.com/dRcsJBF.png)
    in this photo, `t2.next` points to `t1`, although t1 and t2 are from the same type, we `can't` use t1 as member of t2, but we `can` point to it.

- writting to the `heap` starts with the word `new`, as `int* ptr = new int`

    ```c++
            // c++
            struct MyStruct {
                    int x;
                    int y;
                }

              MyStruct* p1 = new MyStruct  // we are writting to the heap  
              // (dynamically allocating memory for the new struct)

              // now can dynamically handle p1 contents
    ```

## concepts

- entites: all members of class.
- abstraction: hide the un-necesary details of the class.
- entites can be [1]:
    1. fixed (like methods) `don't change` while the object interacts.
    2. state (like vars) `change` while the object interacts.

## member functions

- member functions are the methods of a class.
- member functions are fixed entries [1].
- calling member functions.
  
    ```c++
        className.classFnc(funcArg)
        // className is the reciever
        // claassFunc is the member function
        // funcArg arguments that are passed to the method
    ```

- interfaces: simple layer hiding everything (eg. member function with no arguments)

## Access control of members in structures

- Crucial for data hiding or encapsulation [2].

### public

- Member can be accessed from anywhere in program

### private

- Member can be accessed only from member functions of same `structure (class)`.
- reading and writting can be done only using the class methods `setters and getters`.
- make sure that these getters and setters are public so they can be accessesd by other parts of the program.

### protected

- strict private.

### Mutator functions

- Member functions that update values of data members that other functions are allowed to update [3].

## Constructor

- Invoked automatically when an object of the class is allocated [3].
- Convenient way to initialize `data members`.
- Just like any other member function
- Accepts optional input parameters
- Can be used to perform tasks other than initialization too [3].
- class can have multiple constructors as long as each one
has a distinct list of parameter types.
- When allocating an object of the class, the types of
parameters passed to the constructor determine which
constructor is invoked.
- constructors must be public [3].

    ```c++
    calss V3 {
        double x, y, z;  
        // first constructor
        V3(double a, b, c){
            x = a;
            y = b;
            z = c;
            return;
        }

        // second constructor
        V3(){
            x=y=z=0.0;
            return;
        }

    }
    V3 myObj1; // invoke second constructor 
    V3 *myObj2 = new V3(1.0, 2.0. 3.0); // invokes first constuctor
    ```

## Destructor

- Invoked automatically when an object of the class is de-allocated.
- Convenient way to do book-keeping/cleaning-up before deallocating object [3].
- Accepts no parameters.
- Can be used to perform other tasks before de-allocating
object [3].

## References

- [1] [IITBombayX: CS101.2x, edx 1](https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/course/)
- [2] [IITBombayX: CS101.2x, edx 2](https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/courseware/0bedc4e4756c42a9a704850dc93cffcf/93ff04ed5d1d4b81ad80cece1c2aee68/?child=first)
- [3] [IITBombayX: CS101.2x, edx 3](https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/courseware/f516201e2b434dcc8b404bbb1f369514/d09de5b405d74891930fd3ed106cf209/?child=first)

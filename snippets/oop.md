# Object Oriented Programming

## some types of oop to look at:

- object oriented modular programming
- incremental programming

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

              MyStruct* p1 = new MyStruct  // we are writting to the heap   (dynamically allocating memory for the new struct)

              // now can dynamically handle p1 contents
    ```


## References

- https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/course/
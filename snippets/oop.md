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
        // first constructor: normal.
        V3(double a, double b, double c){
            x = a;
            y = b;
            z = c;
            return;
        }

        // second constructor: initialazation, no parameters.
        // default constructor
        V3(){
            x=y=z=0.0;
            return;
        }

         // third constructor : with default values, some params are optional
        V3(double a = 0.0 , double b = 1.0, double c = 2.0){
            x = a;
            y = b;
            z = c;
            return;
        }

        // destructor
        ~V3() { if (length() == 0.0) {
        cout << “Zero vector!!!”;
        return;
        }

    }
    V3 myObj1; // invoke second constructor
    V3 *myObj2 = new V3(1.0, 2.0. 3.0); // invokes first constuctor
     V3 *myObj2 = new V3(1.0, 2.0); // invokes third constuctor
    ```

## Default constructor

- a constructor method without any params.
- when you define an array of type `MyClass`:
    1. the default constructor, the one without parameters, will be invoked when you intialize a new class without specyfying a constructr [3].
    2. if no default constructor the compiler will provide one for you, but it might not be as you want [3].
    3. If a non-default constructor is defined, but not a default constructor, C++ compiler will NOT provide a `bare-bones` default constructor, and the array will not defined, get an `Error`.

- Best practice: `Always` Define default constructors.

## copy constructor

- constructor method that take a class as parameter, and return a new class from the same type.
- the parameter class should be passed by `reference`, so the old class values will be copied to the new class.
  
    ```c++
        class V3 {
            int x,y,z;

            V3 copyConstrutor ( const V3 &objFromSameClass){
                V3 v;

                v.x = objFromSameClass.x
                v.y = objFromSameClass.y
                v.z = objFromSameClass.z

                return v;
            }

            // another Example here: https://i.imgur.com/UfiJgY2.png
        }

    ```

## Destructor

- Invoked automatically when an object of the class is de-allocated.
- Convenient way to do book-keeping/cleaning-up before deallocating object [3].
- Accepts no parameters.
- Can be used to perform other tasks before de-allocating
object [3].
- must be public.

## operator overloading

- create a special functions to be invoked after some operetors (eg: + - * /) [4].

    ```c++
        class V3 {
            private: double x, y, z;
            public:  
            // operator + overloading
            V3 operator+ (const V3 &b) {
            return V3(x + b.x, y + b.y, z + b.z);
            }

             // operator * overloading
            V3 operator* (const double factor) {
            return V3(x*factor, y*factor, z*factor);
            }
        };

        // in main
        v1 = new V3(1.0,2.0,3.0)
        v2 = new V3(4.0,5.0,6.0)

        v4 = v1 * v2 // this will execute the function with the operator loading.
    ```

## Assignment Overloading

- We can re-define the assignment operator for a class/struct
by defining the member function operator= [4].

## Friend classes and functions

- A “friend” declaration allows a class to explicitly allow
specific non-member functions to access its private members.
- a function can be friend to several classess.
- a class can be friends with several functions.
- in the class defenetion I declare:

    ```c++
    // c++
    class V3 {
        // code
        friend ReturnType FuncName( ...Params ); // this will give the FuncName Access to private properties of the class V3

        // OR

        friend class ClassName; // all functions of className will be friends with V3.
    }

## static data members

- members of class that will share its value with all objects of the class [4].
- if this `static data` changed in one object, it will change with all other objects of this class [4].

## Inheritance
  
- when there are some common features between mutliple classes, we can use a base class contains the common properties. then we `extend` each class with its own properties.
  
### Compositional Way

- the inhereted class cotains one property of the type `base class`.
- we need to access our new class, then the base class to get access to its properties.

### Inheritance Way

- the new class extends the previous one, so we can access the propieties of the base class directly as if they were a properties to the extended class.

    ![copmaring composional way to inhertance way.](https://i.imgur.com/AgpZlVz.png)

    copmaring composional way to inhertance way.

## References

- [1] [IITBombayX: CS101.2x, edx 1](https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/course/)
- [2] [IITBombayX: CS101.2x, edx 2](https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/courseware/0bedc4e4756c42a9a704850dc93cffcf/93ff04ed5d1d4b81ad80cece1c2aee68/?child=first)
- [3] [IITBombayX: CS101.2x, edx 3](https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/courseware/f516201e2b434dcc8b404bbb1f369514/d09de5b405d74891930fd3ed106cf209/?child=first)
- [4] [IITBombayX: CS101.2x, edx 4](https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/courseware/f516201e2b434dcc8b404bbb1f369514/85f26d1555e646bfb6d367910b306671/?child=first)

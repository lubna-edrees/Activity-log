# Linked Lists 

## intro 

- Linked Lists is used for storing data when the size of the data can dynamically increase (is not known prior).
- pointers and strucures (classes) are critical in linked lists.
  
## Self Referential Structures

A Self Referential Structure (we would call it SRS from now) is a special structure which contains a member variable that points to structure of its own kind [1]. 

  ```c++
    //c++
    struct book{

     member 1;
     member 2;

     // Other Members
     struct book* next;

    }

  ```

## why linked lists ?

- we can use arrays of structures, but the array size should be predefined or give a big number to array size beforehand.

## defention

- the linked list is an array of structure objects where the structure needs to be self referential and the ith element in the list points to the (i+1)th element through its member pointer and the pointer of the last element of the list would point to NULL. The starting element will be called as the head node [1].

    ![defention](https://i.imgur.com/z5uYT9X.png)




## References
- [1] https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/courseware/a71234edfd4f465e8d3e7e0082d04540/7565e9f168914c6cab4d54f9ba443bca/?child=first
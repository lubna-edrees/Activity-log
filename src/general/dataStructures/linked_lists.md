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

## singley linked lists

* head pointer points to a node, whitch contains data \(key\) and another pointer to the next node.

![singely linked lists](https://i.imgur.com/p34BjKA.png)

* ops \(read, add, delete\) on the first node: cost `o(1)`.
* ops on the last:
  * if the pointer of the last pointer is empty `(no tail)` : cost `o(n)`
  * if there is a `tail pointer`: cost `o(1)` exept `remove` costs `o(n)` cause the pointers don't have a way to point backward.
* push front psuedo code: [https://i.imgur.com/AICcQZm.png](https://i.imgur.com/AICcQZm.png)
* pop \(remove\) front psuedo: [https://i.imgur.com/4OYm71r.png](https://i.imgur.com/4OYm71r.png)
* push back \(last element\): [https://i.imgur.com/EbKamiz.png](https://i.imgur.com/EbKamiz.png)
* pop back : [https://i.imgur.com/6NlFNAz.png](https://i.imgur.com/6NlFNAz.png)
* Add After a node: [https://i.imgur.com/hf9t89q.png](https://i.imgur.com/hf9t89q.png)
* head == tail -&gt; the list contains only one node.

  ![costs of ops on single linked lists](https://i.imgur.com/ixpL9H9.png)

## double linked lists

* head pointer points to a node, whitch contains data \(key\) and `2 pointers` to the next and previous node.
* `popBack` and `addBefore` is now cheaper `o(1)`.
* pushBack psuedo: [https://i.imgur.com/iSbGeCB.png](https://i.imgur.com/iSbGeCB.png)
* popBack : [https://i.imgur.com/1TgK8Eu.png](https://i.imgur.com/1TgK8Eu.png)
* addAfter: [https://i.imgur.com/s5PP86S.png](https://i.imgur.com/s5PP86S.png)
* addBefore: [https://i.imgur.com/A2FsCHA.png](https://i.imgur.com/A2FsCHA.png)


## References
- [1] https://courses.edx.org/courses/course-v1:IITBombayX+CS101.2x+1T2020/courseware/a71234edfd4f465e8d3e7e0082d04540/7565e9f168914c6cab4d54f9ba443bca/?child=first
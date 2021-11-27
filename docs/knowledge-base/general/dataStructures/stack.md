# stack

* last in, first out. `LIFO`
* Stack: Abstract data type with the following operations:
  * Push\(Key\): adds key to collection
  * Key Top\(\): returns most recently-added key
  * Key Pop\(\): removes and returns most recently-added key
  * Boolean Empty\(\): are there any elements?
* solves `balanced brackets problem` : check if every prace has its own closing prace .
* psuedo code for balanced brackets: [https://i.imgur.com/xIucIM7.png](https://i.imgur.com/xIucIM7.png)
* Stacks can be implemented with either an `array` or a `linked list`.
* Each stack operation is `O(1)`: Push, Pop, Top, Empty.
* Stacks are ocassionaly known as `LIFO queues`.
* in a `Array stack`:
  * adding the new elemnt of the stack to the end of the array, remove the last e of the array.
  * array is limmited to the number of elements initialized with \(in some languages\).
  * add using `pushBack`
  * remove with `popBack`
* in a `linked list stack`:
  * adding the new element to the begining \(head\) of the linked list, remove the head.
  * add with `pushFront`
  * remove with `popfront`
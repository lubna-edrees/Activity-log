# queue

* first in, first out. `FIFO`
* same as stack, except it will remove the first added element.
* the longest waiting person in line, the next to be served.
* Queue: Abstract data type with the following operations:
  * Enqueue\(Key\): adds key to collection
  * Key Dequeue\(\): removes and returns least recently-added key
  * Boolean Empty\(\): are there any elements?
* useful for `servers`
* we can do queues with arrays or linked lists.
* in a `linked list queue`:
  * add using `pushBack` to the back `(tail)` of the list. `enqueue`
  * remove using `topFront` to get the element, then `popFront` to remove e from the `head` of the list. `dequeue`
* queue with `Arrays`:
  * normal array: adding is easy, removing first element costs `o(n)`
  * to make dequeuing cheaper `0(1)`:

    * keep track of array as acercular array.
    * we make a variablle `read` to track the index to remove from.
    * variable `write` to track the index to add to.
    * if `read == write` -&gt; queue is empty.
    * if `write > arr.length && read != 0` -&gt; `read = 0`, start from the begining.
    * if we start from the begining, we have to put a buffer of at least one index empty between the read and write indexes as in this example [https://i.imgur.com/OYKISSU.png](https://i.imgur.com/OYKISSU.png)

    ![read write to queue in arrays](https://i.imgur.com/SJsWTZm.png)
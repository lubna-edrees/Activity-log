# data structures

> course here: <https://www.coursera.org/learn/data-structures/home/welcome>

## week1: Arrays

- one contiguous area of memory.
- equal sized elements, indexed by contiguous integers.
- constant time access for each element.
- In column-major ordering, the first index changes most rapidly.
- In row-major ordering, the second index changes most rapidly.
- costs of operations on arrays depending on the position of the element:

  ![array operation costs](https://i.imgur.com/TTrc0IN.png)

### singley linked lists

- head pointer points to a node, whitch contains data (key) and another pointer to the next node.

![singely linked lists](https://i.imgur.com/p34BjKA.png)

- ops (read, add, delete) on the first node: cost `o(1)`.
- ops on the last:
  - if the pointer of the last pointer is empty `(no tail)` : cost `o(n)`
  - if there is a `tail pointer`: cost `o(1)` exept `remove` costs `o(n)` cause the pointers don't have a way to point backward.
- push front psuedo code: <https://i.imgur.com/AICcQZm.png>
- pop (remove) front psuedo: <https://i.imgur.com/4OYm71r.png>
- push back (last element): <https://i.imgur.com/EbKamiz.png>
- pop back : <https://i.imgur.com/6NlFNAz.png>
- Add After a node: <https://i.imgur.com/hf9t89q.png>
- head == tail -> the list contains only one node.

  ![costs of ops on single linked lists](https://i.imgur.com/ixpL9H9.png)

### double linked lists

- head pointer points to a node, whitch contains data (key) and `2 pointers` to the next and previous node.
- `popBack` and `addBefore` is now cheaper `o(1)`.
- pushBack psuedo: <https://i.imgur.com/iSbGeCB.png>
- popBack : <https://i.imgur.com/1TgK8Eu.png>
- addAfter: <https://i.imgur.com/s5PP86S.png>
- addBefore: <https://i.imgur.com/A2FsCHA.png>

### stack

- last in, first out. `LIFO`
- Stack: Abstract data type with the following operations:
  - Push(Key): adds key to collection
  - Key Top(): returns most recently-added key
  - Key Pop(): removes and returns most recently-added key
  - Boolean Empty(): are there any elements?
- solves `balanced brackets problem` : check if every prace has its own closing prace .
- psuedo code for balanced brackets: <https://i.imgur.com/xIucIM7.png>
- Stacks can be implemented with either an `array` or a `linked list`.
- Each stack operation is `O(1)`: Push, Pop, Top, Empty.
- Stacks are ocassionaly known as `LIFO queues`.
- in a `Array stack`:
  - adding the new elemnt of the stack to the end of the array, remove the last e of the array.
  - array is limmited to the number of elements initialized with (in some languages).
  - add using `pushBack`
  - remove with `popBack`
- in a `linked list stack`:
  - adding the new element to the begining (head) of the linked list, remove the head.
  - add with `pushFront`
  - remove with `popfront`

### queue

- first in, first out. `FIFO`
- same as stack, except it will remove the first added element.
- the longest waiting person in line, the next to be served.
- Queue: Abstract data type with the following operations:
  - Enqueue(Key): adds key to collection
  - Key Dequeue(): removes and returns least recently-added key
  - Boolean Empty(): are there any elements?
- useful for `servers`
- we can do queues with arrays or linked lists.
- in a `linked list queue`:
  - add using `pushBack` to the back `(tail)` of the list. `enqueue`
  - remove using `topFront` to get the element, then `popFront` to remove e from the `head` of the list. `dequeue`
- queue with `Arrays`:

  - normal array: adding is easy, removing first element costs `o(n)`
  - to make dequeuing cheaper `0(1)`:

    - keep track of array as acercular array.
    - we make a variablle `read` to track the index to remove from.
    - variable `write` to track the index to add to.
    - if `read == write` -> queue is empty.
    - if `write > arr.length && read != 0` -> `read = 0`, start from the begining.
    - if we start from the begining, we have to put a buffer of at least one index empty between the read and write indexes as in this example <https://i.imgur.com/OYKISSU.png>

    ![read write to queue in arrays](https://i.imgur.com/SJsWTZm.png)

### trees

- A Tree is: empty, or a node with: a key, and a list of child trees.
- Root: top node in the tree.
- A child has a line down directly from a parent.
- Ancestor: parent, or parent of parent, etc
- Descendant: child, or child of child, etc.
- Leaf : node with no children.
- Interior node (non-leaf).
- Height: maximum depth of subtree node and farthest leaf
- Forest: collection of trees.
- `binary tree`: a tree with most 2 children, lift and right.
- Height(tree)

```js
if tree = nil:
return 0
return 1 + Max(Height(tree.left),
Height(tree.right))
```

- Size(tree)

```js
if tree = nil
return 0
return 1 + Size(tree.left) +
Size(tree.right)
```

### Depth-first tree traversal (for binary trees)

- we use `stack`.
- we start from trees dont have children. `tree = nill`
- InOrderTraversal(tree):
  - traverse lift then key then right tree.

```js
if tree = nil:
return
InOrderTraversal(tree.left)
Print(tree.key)
InOrderTraversal(tree.right)
```

- PreOrderTraversal(tree):
  - we traverse the key then the left then right trees.

```js
if tree = nil:
return
Print(tree.key)
PreOrderTraversal(tree.left)
PreOrderTraversal(tree.right)
```

- PostOrderTraversal(tree)
  - we traverse the left then the right trees and lastly the key.

```js
if tree = nil:
return
PostOrderTraversal(tree.left)
PostOrderTraversal(tree.right)
Print(tree.key)
```

### Breadth-first traversal

- we use `queue`
- LevelTraversal(tree)
  - pre-order traversion level by level.

```js
if tree = nil: return
Queue q
q.Enqueue(tree)
while not q.Empty() :
node ← q.Dequeue()
Print(node)
if node.left ̸= nil:
q.Enqueue(node.left)
if node.right ̸= nil:
q.Enqueue(node.right)
```

## week2: dynamic arrays and amortized analysis

### dynamic arrays

- in java: `ArrayList`, in c++: `Vectors`, in python: `lists`.
- `Amortized cost`: Cost(n operations) / n.

## week3: priority queue and Disjoint sets

### priority queue

- A priority queue is a generalization of a queue where each element is assigned a priority and elements come out in order by priority.
- Priority queue is an abstract data type supporting the following main operations:
  - Insert(p) adds a new element with priority p
  - ExtractMax() extracts an element with maximum priority.
  - Remove(it) removes an element pointed by an iterator it
  - GetMax() returns an element with maximum priority (without changing the set of elements)
  - ChangePriority(it, p) changes the priority of an element pointed by it to p
- more info on pdf: [pdf slides](https://d3c33hcgiwev3.cloudfront.net/_3357a16635707f46426fc3b6baa8e5db_06_1_priority_queues_1_intro.pdf?Expires=1588982400&Signature=E~UBII0VVf~Pl91Pa9-eJZoI43Urw~-pdOZoRgU-vqjZhwBPAxDM6mCrLBGRTdmaC1B3ReYJndudlEnaQX51zVPt4lTYXiFWxqSVLekbKsJi0F8Wb9MCi8eUE3F5z4YMRsRc31aWyk1n3yZDBvEUA9KLI2QvmmuiEFobJpuwMyk_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

### Heap

- heap is a tree with special charechters.
- `Binary max-heap` is a binary tree (each node has zero, one, or two children) where the value of each node is at least the values of its children.

### operations on binary max-heap

- `GetMax`: return the root.
- `Insert`: attach a new node to any leaf, this may violate the heap property, so we do `siftUp`.
- `siftUp`: swap the problematic node with its parent until the property is satisfied. this edge gets closer to the root while sifting up. `costs o(tree height)`.
- `ExtractMax` : replace the root with any leaf. then we do `SiftDown` if nessecary.
- `SiftDown`: we swap the problematic node with larger child until the heap property is satisfied.
- `ChangePriority`: change the priority and let the changed element sift up or down depending on whether its priority decreased or increased.
- `Remove`: change the priority of the element to ∞, let it sift up, and then extract maximum by calling `ExtractMax()` costs `O(tree height)`.

### compelete binary tree

- A binary tree is complete if all its levels are filled except possibly the last one which is filled from left to right.
- A complete binary tree with n nodes has height `at most O(log n)`.
- we cav store a copmplete binary tree in array as follows:
  - parent index of node i = `Arr[round(i/2)]`
  - leftchild(i) = `Arr[2i]`
  - RightChild(i) = `Arr[2i+1]`
- siftUp and down does not change the tree completeness.
- insert and extractMax and remove can violate tree completeness.
- we have to maintain our tree complete.
- Keeping the Tree Complete:
  - to extract the maximum value, replace the root by the last leaf (by the right leaf of the most left child 2i+1 ) and let it sift down.
  - to insert an element, insert it as a leaf in the leftmost vacant position in the last level and let it sift up.

### binary heap psuedo code

![binary heap array example](https://i.imgur.com/XJAMIoe.png)

- maxSize is the maximum number of elements in the heap
- size is the size of the heap
- H[1 . . . maxSize] is an array of length maxSize where the heap occupies the first size elements
- [pdf docs](https://d3c33hcgiwev3.cloudfront.net/_cf47f3a385305a0768c7686bdb0e1a7e_06_1_priority_queues_2_heaps.pdf?Expires=1588982400&Signature=gyp5E23U6wuose52e72QZaK0TcR2hMOgZ0tIo4dl7DyxfYBqcYW0QOU3XuB6wd~~GNKOTHfbHKKm2BQ4ASTMY-YDu8tsoiPVvocoyquEx6u~575cHqREdalpMwZK4bw~xuj8C3AEDFVK-f-ONyfLS668gJds85WqEfXywNqc8oo_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)
- sift Up:

```js
SiftUp(i):
while i > 1 and H[Parent(i)] < H[i]:
swap H[Parent(i)] and H[i]
i ← Parent(i)
```

- sift down:

```js
SiftDown(i)
maxIndex ← i
ℓ ← LeftChild(i)
if ℓ ≤ size and H[ℓ] > H[maxIndex]:
maxIndex ← ℓ
r ← RightChild(i)
if r ≤ size and H[r] > H[maxIndex]:
maxIndex ← r
if i ̸= maxIndex:
swap H[i] and H[maxIndex]
SiftDown(maxIndex)
```

- insert:

```js
Insert(p)
if size = maxSize:
return ERROR
size ← size + 1
H[size] ← p
SiftUp(size)
```

- Extract max:

```js
ExtractMax()
result ← H[1]
H[1] ← H[size]
size ← size − 1
SiftDown(1)
return result
```

- remove:

```js
Remove(i)
H[i] ← ∞
SiftUp(i)
ExtractMax()
```

- change priority:

```js
ChangePriority(i, p)
oldp ← H[i]
H[i] ← p
if p > oldp:
SiftUp(i)
else:
SiftDown(i)
```

### Heap sort

- psudo code:

```js
HeapSort(A[1 . . . n])
create an empty priority queue
for i from 1 to n:
Insert(A[i])
for i from n downto 1:
A[i] ← ExtractMax()
```

- cost : `0(n log n)`

### intro-sort algorithm

in practice: you start using `quick sort` algorithm, if you find it a bit slow: you stop and change to `heap sort`.

### 0-based array heap

- Parent(i): return `Arr[i−1/2]`
- LeftChild(i) : return `Arr[2i + 1]`
- RightChild(i): return `Arr[2i + 2]`

### Binary min-heap

Binary min-heap is a binary tree (each node has zero, one, or two children) where the value of each node is at most the values of its children.

### d-ary Heap

- In a d-ary heap nodes on all levels except for possibly the last one have exactly d children.
- The height of such a tree is about log<sub>d</sub> n.
- The running time of SiftUp is O(log<sub>d</sub> n).
- The running time of SiftDown is O(d log<sub>d</sub> n): on each level, we nd the largest value among d children.

### Disjoint Sets: Naive Implementations

- [pdf docs](https://d3c33hcgiwev3.cloudfront.net/_59697932cb0646cf141f37f95c4c9409_06_2_disjoint_sets_1_naive.pdf?Expires=1589068800&Signature=Z9~~dHOmEVXJBIyowQDGhPj~JBg7tAl3p8M-t6z8l3phFQm7VtD6r89pIBqVxQAWH1XZao9Wnu7cGwB6ruavIDvNP6fMl4f7ugHzutR1VAaBenCrwxhNA6ljsf4NWu0lyrfTSyn-56gVlewEZUWUfwi33bGx-XPO97hDaCRzmP0_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)
- A disjoint-set data structure supports the following operations:
  - MakeSet(x) creates a singleton set {x}
  - Find(x) returns ID of the set containing x:
    - if x and y lie in the same set, then `Find(x) = Find(y)`
    - otherwise, Find(x) ̸= Find(y)
  - Union(x, y) merges two sets containing x and y
- union psedo:

  ```js
  Union(i, j):
  i_id ← Find(i)
  j_id ← Find(j)
  if i_id = j_id:
  return
  m ← min(i_id, j_id)
  for k from 1 to n:
  if smallest[k] in {i_id, j_id}:
  smallest[k] ← m
  ```

- we can do the implementaion with: `linked lists`

  - id is the tail of each set.
  - with time, sets is going to be longer and longer.

    ![linked lists](https://i.imgur.com/OR2YQ49.png)

- better solution (chaeper) using: `trees of linked lists`

  - id (tail) is the same for the 2 sets, after calling `union()`.

    ![trees of linked lists](https://i.imgur.com/KYR5ioe.png)

### Disjoint Sets: Efficient Implementations

- when merging (calling `union()`) on 2 trees, we choose to put the shortest(least hieght) tree under the longer tree, so the resulting tree as munch `shallow` as possible.

  ![example](https://i.imgur.com/LI55mxU.png)

### unoin by Rank

- To quickly find a height of a tree, we will keep the height of each subtree in an array `rank[1 . . . n]`: `rank[i]` is the height of the subtree whose root is i.
- now we have 2 arrays:
  - `id`: showing the root of each element in each subtree.
  - `rank`: showing the hieght of the tree that this element belongs to.
- we also call this processure: `union by rank heuristic`
- union psedo with rank:

  ```js
  Union(i, j)
  i_id ← Find(i)
  j_id ← Find(j)
  if i_id = j_id:
  return
  if rank[i_id] > rank[j_id]:
  parent[j_id] ← i_id
  else:
  parent[i_id] ← j_id
  if rank[i_id] = rank[j_id]:
  rank[j_id] ← rank[j_id] + 1
  ```

### path compression

- we introduce another array, that will attatch every element to it's final root. so this will save us time in the future.
- now we have 3 arrays:
  - `id`: showing the root of the subtree of each element, then the final root of each subtree.
  - `rank`: showing the hieght of the tree that this element belongs to.
  - `roots`: showing the final roots for each single element.

## Hash Tables

- used in: hashing passwords, connecting files on the os to their physical location, IP address.
- naiive solution: create an `array` `Arr` of all possible IPs, increment `Ar[IP] ++;` when a new visitor vistits your website, you need another array to deal with time.
- optimization: use `list` instead of array, the elements being added corresponding to the time (old element in the start, last elemnts to the end). every hour we delete the first list Nodes.
- `hash function`: a funtion that takes a universe and divide them into smaller universes.
- `Maps`: Store mapping from objects to other objects, Student ID → student name.
- Map from S to V is a data structure with methods HasKey(O), Get(O), Set(O, v), where O ∈ S, v ∈ V .
- `Set` is a data structure with methods: Add(O), Remove(O), Find(O).
- Two ways to implement a set using chaining:
  - Set is equivalent to map from S to V = {true, false}
  - Store just objects O instead of pairs (O, v) in chains.
- parameters in hash tables:

  - `n` numer of elemnts in the universe
  - `m` cardinality of the hash function (the keys)
  - `c` length of the longest chain
  - `memory` used `O(n + m)`
  - `𝛼 = n /m` is called load factor
  - Operations run in time `O(c + 1)`

  ![has table](https://i.imgur.com/daBQsY5.png)

### Hash Functions

- `univirsal family`:

  ```js
  Let U be the universe , the set of all
  possible keys. A set of hash functions
  ℋ = {h : U → {0, 1, 2, . . . , m − 1}}
  is called a universal family if for any two keys
  x, y ∈ U, x ̸= y the probability of collision
  Pr[h(x) = h(y)] ≤ 1/m
  ```

- [pdf notes](https://d3c33hcgiwev3.cloudfront.net/_c868028143804d149e8f66ee34c26b71_07_hash_tables_2_hashfunctions.pdf?Expires=1589241600&Signature=DcTh8b8HPSvoQ3xi8QMahVlEPK5C6Cpf~60zhfYFYkH-dG-atiJGhZjXzSNxl9gwqN9Z7F6OEpssDfC4TFKjmPuKjVsN8jC0D~VrHynLNT-2hlzPo3OumzVT2m5tI7id-rP8gYoUBL4SShv4AqyfpkrgTHrenykyqeTv8M2BGaQ_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

### Hashing Integeres

- [pdf notes](https://d3c33hcgiwev3.cloudfront.net/_c868028143804d149e8f66ee34c26b71_07_hash_tables_2_hashfunctions.pdf?Expires=1589241600&Signature=DcTh8b8HPSvoQ3xi8QMahVlEPK5C6Cpf~60zhfYFYkH-dG-atiJGhZjXzSNxl9gwqN9Z7F6OEpssDfC4TFKjmPuKjVsN8jC0D~VrHynLNT-2hlzPo3OumzVT2m5tI7id-rP8gYoUBL4SShv4AqyfpkrgTHrenykyqeTv8M2BGaQ_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

### Hashing strings

- [pdf Notes](https://d3c33hcgiwev3.cloudfront.net/_c868028143804d149e8f66ee34c26b71_07_hash_tables_2_hashfunctions.pdf?Expires=1589241600&Signature=DcTh8b8HPSvoQ3xi8QMahVlEPK5C6Cpf~60zhfYFYkH-dG-atiJGhZjXzSNxl9gwqN9Z7F6OEpssDfC4TFKjmPuKjVsN8jC0D~VrHynLNT-2hlzPo3OumzVT2m5tI7id-rP8gYoUBL4SShv4AqyfpkrgTHrenykyqeTv8M2BGaQ_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

- hashing functions:
  ![hashing](https://i.imgur.com/fcIh5cW.png)

## week5: Binary search trees

- In problems like:
  - Dictionary Search: Find all words that start with some given string.
  - Date Ranges : Find all emails received in a given period.
  - Closest Height:Find the person in your class whose height is closest to yours.
  - `Local Search`: A Local Search Datastructure stores a number of elements each with a key coming from an ordered set. It supports operations:
    - `RangeSearch(x, y)`: Returns all elements with keys between x and y.
    - `NearestNeighbors(z)`: Returns the element with keys on either side of z.
- we can solve these problems by:

  - Hash tables:

    ![hash tables](https://i.imgur.com/ko5rPcW.png)

  - Array:

    ![array](https://i.imgur.com/hzoBkEp.png)

  - Sorted Array:

    ![sorted array](https://i.imgur.com/eCAQYAL.png)

  - Linked lists:

    ![linked lists](https://i.imgur.com/z9PFtzF.png)

### search Tree

- for any Node X in the tree: X’s key is `larger than` the key of `any descendent` of its `left` child, and `smaller than` the key of `any descendant` of its `right` child.

### search Tree functions

1. find(key, root):

   ```js
   Find(k, R):
   if R.Key = k:
      return R
   else if R.Key > k :
      if R.Left ̸= null:
          return Find(k, R.Left)
      return R
   else if R.Key < k :
      return Find(k, R.Right)
   ```

2. Next(Node):

   ```js
   Next(N)
    if N.Right ̸= null:
      return LeftDescendant(N.Right)
   else:
      return RightAncestor(N)
   ```

3.  LeftDescendant(Node):
   
     ```js
    LeftDescendant(N)
      if N.Left = null
        return N
      else:
        return LeftDescendant(N.Left)
     ```

4. Right Ancestor (Node):

     ```js
      RightAncestor(N):
       if N.Key < N.Parent.Key
         return N.Parent
       else:
         return RightAncestor(N.Parent)
      ```

5. RangeSearch(x = first element in search range , y = second element to search , R = tree or root)

     ```js
      RangeSearch(x, y, R):
       L ← ∅
       N ← Find(x, R)
       while N.Key ≤ y
           if N.Key ≥ x:
           L ← L.Append(N)
           N ← Next(N)
       return L
      ```

6. Insert(key, tree or root):

     ```js
     Insert(k, R):
       P ← Find(k, R)
       Add new node with key k as child of P
     ```

7. delete(Node):

     ```js
      Delete(N):
       if N.Right = null:
           Remove N, promote N.Left
       else:
           X ← Next(N)
           ∖∖ X.Left = null
           Replace N by X, promote X.Right
     ```

8. Example: deleting Node (1):
   - bring its next element(2), to be in (1) place.
   - bring (4) tree to be in (2) place.

    ![deleting example](https://i.imgur.com/1ToOmjn.png)

### AVL trees

- to keep our trees `balanced` , (the hieght of left = hieght of Right).
- `hieght of tree`: the maximum depth of any of its children.
- calculating the hieght of a tree:

    ```js
    Height(N):
      if N is a leaf:
       hieght = 1
      else:
        hieght = 1 + max(N.Left.Height, N.Right.Height)
    ```

- example of Node after adding hieght property:

  ![node example](https://i.imgur.com/VKlQ8mx.png)

- updating trees can destroy their balance.

### Insertion into AVL tree
  
- We need a new insertion algorithm that involves rebalancing the tree to maintain the AVL property.
- insertion idea:
  
    ```js
    AVLInsert(k: key, R: root):
      Insert(k, R)
      N = Find(k, R)
      Rebalance(N)
    ``` 

- Rebalancing:
  
    ```js
      Rebalance(N: node):
        if |N.Left.Height − N.Right.Height| ≤ 1 return;
        P = N.Parent
        if N.Left.Height > N.Right.Height+1:
            RebalanceRight(N)
        if N.Right.Height > N.Left.Height+1:
            RebalanceLeft(N)
        AdjustHeight(N)
        if P != null:
          Rebalance(P)
    ```

- Adjusting Hieght : recalculate height after rebalancing the tree

    ```js
      AdjustHeight(N):
          N.Height = 1+ max( N.Left.Height, N.Right.Height)
    ```

- exception: consider this case: where the left subtree too heavy.  so we need to use different rebalancing function `RebalanceRight(N)`.

    ![left subtree is too heavy](https://i.imgur.com/PI346gO.png)

- RebalanceRight(Node):
  
    ```js
      RebalanceRight(N: node):
        M = N.Left
        if M.Right.Height > M.Left.Height:
            RotateLeft(M)
        RotateRight(N)
        AdjustHeight() on affected nodes
    ```

- `RotateLeft()` Example:

    ![RotateLeft](https://i.imgur.com/jorkGCZ.png)

### deleting from AVL tree

- Deletions can also change balance.
- deleting from AVL tree:
  
    ```js
    AVLDelete(N: node):
        Delete(N)
        M = Parent of node replacing N
        Rebalance(M)
    ```

### Merge AVL trees

- `Merge` Combines two binary search trees into a single one.

    ![merge avl trees](https://i.imgur.com/ly1KIsl.png)

- If we got extra root `T` we do the merge over it:

    ```js
    MergeWithRoot(R1: tree1, R2: tree2, T: new element to merge over):
        T.Left = R1
        T.Right = R2
        R1.Parent = T
        R2.Parent = T
        return T
    ```

- if we didn't get that extra element, we need to search for it and the Get new root by removing largest element of left subtree.

    ```js
      Merge(R1: tree1 , R2: tree2):
          T = Find(∞, R1) // find largest element 
          Delete(T)  // remove that element from the tree
          MergeWithRoot(R1, R2, T) // use that T as extra element to merge
          return T
    ```

- to maintain the balance, we merge the smaller tree `R2` with a subtree form the bigger tree `R1` with the same height as `R2`.
- we Go down side of the bigger tree until merge with a subtree of same height as the smaller tree.
- we need a new `Merge()` function:

    ```js
        AVLTreeMergeWithRoot(R1: tree1, R2: tree2, T: element to merge over):
            if |R1.Height − R2.Height| ≤ 1: // both trees with same hieght
                MergeWithRoot(R1, R2, T)
                T.Ht = max(R1.Height, R2.Height) + 1 // hieght of the output merged tree
                return T

            else if R1.Height > R2.Height: // if R1 is bigger, we merge R2 on subtree of R1
                    R′ = AVLTreeMergeWithRoot(R1.Right, R2, T)
                     /* go down R1.right (bigger  elements) untill you find a subtree with same hieght as R2.
                     R′ is the newly merged tree between R2 and r1.right
                     */ 
                    R1.Right = R′ // put R′ as right of R1
                    R′.Parent = R1 // assign R1 to be the parent of R′
                    Rebalance(R1) // Rebalance
                    return root of the newly merged rebalanced tree of R1

            else if R1.Height < R2.Height: // if R2 is bigger, we merge R1 on subtree of R2
                    R′ = AVLTreeMergeWithRoot(R1, R2.Right, T) 
                    R2.Right = R′
                    R′.Parent = R2
                    Rebalance(R2)
                    return root of the newly merged rebalanced tree of R2
    ```

### split AVL trees

- Split Breaks one binary search tree into two.
- we search for element `x`, then we merge all elements bigger than x into one tree, also merge all elements smaller than x into one another tree

    ![splite trees](https://i.imgur.com/ce4siYq.png)

- `split(R: tree, X: element)` function:

    ```js
    Split(R: tree, x: element to split over):
        if R = null: // tree is empty
          return (null, null)
        if x ≤ R.Key: // we work on the left, Right keep untouched 
            (R1, R2) = Split(R.Left, x)
            R3 = MergeWithRoot(R2, R.Right, R) 
            // we merge all bigger element comes from down with the untouched part of the Right.
            return (R1, R3) 
        if x > R.Key:
            (R1, R2) = Split(R.Right, x) // work on the right, left untouched
            R3 = MergeWithRoot(R2, R.Left, R) 
            // we merge all smaller element comes from down with the untouched part of the Left.
            return (R1, R3) 
    ```

> `predecessor`  P of a node N  is the node with the largest key smaller than the key of N

### splay tree

- animation: <https://www.cs.usfca.edu/~galles/visualization/SplayTree.html>
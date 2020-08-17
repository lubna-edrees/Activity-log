# Heap

* heap is a tree with special charechters.
* `Binary max-heap` is a binary tree \(each node has zero, one, or two children\) where the value of each node is at least the values of its children.

### operations on binary max-heap

* `GetMax`: return the root.
* `Insert`: attach a new node to any leaf, this may violate the heap property, so we do `siftUp`.
* `siftUp`: swap the problematic node with its parent until the property is satisfied. this edge gets closer to the root while sifting up. `costs o(tree height)`.
* `ExtractMax` : replace the root with any leaf. then we do `SiftDown` if nessecary.
* `SiftDown`: we swap the problematic node with larger child until the heap property is satisfied.
* `ChangePriority`: change the priority and let the changed element sift up or down depending on whether its priority decreased or increased.
* `Remove`: change the priority of the element to ∞, let it sift up, and then extract maximum by calling `ExtractMax()` costs `O(tree height)`.

### compelete binary tree

* A binary tree is complete if all its levels are filled except possibly the last one which is filled from left to right.
* A complete binary tree with n nodes has height `at most O(log n)`.
* we cav store a copmplete binary tree in array as follows:
  * parent index of node i = `Arr[round(i/2)]`
  * leftchild\(i\) = `Arr[2i]`
  * RightChild\(i\) = `Arr[2i+1]`
* siftUp and down does not change the tree completeness.
* insert and extractMax and remove can violate tree completeness.
* we have to maintain our tree complete.
* Keeping the Tree Complete:
  * to extract the maximum value, replace the root by the last leaf \(by the right leaf of the most left child 2i+1 \) and let it sift down.
  * to insert an element, insert it as a leaf in the leftmost vacant position in the last level and let it sift up.

### binary heap psuedo code

![binary heap array example](https://i.imgur.com/XJAMIoe.png)

* maxSize is the maximum number of elements in the heap
* size is the size of the heap
* H\[1 . . . maxSize\] is an array of length maxSize where the heap occupies the first size elements
* [pdf docs](https://d3c33hcgiwev3.cloudfront.net/_cf47f3a385305a0768c7686bdb0e1a7e_06_1_priority_queues_2_heaps.pdf?Expires=1588982400&Signature=gyp5E23U6wuose52e72QZaK0TcR2hMOgZ0tIo4dl7DyxfYBqcYW0QOU3XuB6wd~~GNKOTHfbHKKm2BQ4ASTMY-YDu8tsoiPVvocoyquEx6u~575cHqREdalpMwZK4bw~xuj8C3AEDFVK-f-ONyfLS668gJds85WqEfXywNqc8oo_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)
* sift Up:

```javascript
SiftUp(i):
while i > 1 and H[Parent(i)] < H[i]:
swap H[Parent(i)] and H[i]
i ← Parent(i)
```

* sift down:

```javascript
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

* insert:

```javascript
Insert(p)
if size = maxSize:
return ERROR
size ← size + 1
H[size] ← p
SiftUp(size)
```

* Extract max:

```javascript
ExtractMax()
result ← H[1]
H[1] ← H[size]
size ← size − 1
SiftDown(1)
return result
```

* remove:

```javascript
Remove(i)
H[i] ← ∞
SiftUp(i)
ExtractMax()
```

* change priority:

```javascript
ChangePriority(i, p)
oldp ← H[i]
H[i] ← p
if p > oldp:
SiftUp(i)
else:
SiftDown(i)
```

### Heap sort

* psudo code:

```javascript
HeapSort(A[1 . . . n])
create an empty priority queue
for i from 1 to n:
Insert(A[i])
for i from n downto 1:
A[i] ← ExtractMax()
```

* cost : `0(n log n)`

### intro-sort algorithm

in practice: you start using `quick sort` algorithm, if you find it a bit slow: you stop and change to `heap sort`.

### 0-based array heap

* Parent\(i\): return `Arr[i−1/2]`
* LeftChild\(i\) : return `Arr[2i + 1]`
* RightChild\(i\): return `Arr[2i + 2]`

### Binary min-heap

Binary min-heap is a binary tree \(each node has zero, one, or two children\) where the value of each node is at most the values of its children.

### d-ary Heap

* In a d-ary heap nodes on all levels except for possibly the last one have exactly d children.
* The height of such a tree is about logd n.
* The running time of SiftUp is O\(logd n\).
* The running time of SiftDown is O\(d logd n\): on each level, we nd the largest value among d children.

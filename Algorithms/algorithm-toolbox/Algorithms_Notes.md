# Algorithms Notes

This is a summary of the course on MIT open source [here](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/)

## Lecture 2: Models of Computation [pdf](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/lecture-videos/MIT6_006F11_lec02.pdf)

- `for x in L` costs `linear time o(n)`
- `A1 + A2` adding 2 arrays, <sub>creates an empty array then add every elemnt to it</sub>, costs `1 + o(A1) + o(A2)`
- `Arr.length` costs `constant o(1)`
- `Arr.sort()` costs `n * log n`

### Document Distance Problem — compute d(D1, D2)

1. split each document into words
2. count word frequencies (document vectors)
3. compute dot product (& divide)

![document distance problem](https://i.imgur.com/C5q06yd.png)

## lecture 3: Insertion Sort, Merge Sort [pdf](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/lecture-videos/MIT6_006F11_lec03.pdf)

sorting make things easier, like `binary srearch` and `find the median`

### Finding `the median` in an array

- simply sort the array, and look to the elemnt at `n/2`.
- costs contatnt time `o(1)` if you start from sorted array.

### Insertion sort

- insert key A[j] into the (already sorted) sub-array A[1 .. j-1].
- by pairwise key-swaps down to its right position.
- costs `o(n^2)` cause, `o(n^2)` for compares, `o(n^2)` for the swaps. => `o(n) + o(n) = o(n^2)`
  
  ![insertion sort](https://i.imgur.com/4pavsrV.png)

### Binary Insertion sort

- insert key A[j] into the (already sorted) sub-array A[1 ..j-1].
- Use binary search to find the right position.
- costs (Complexity): `Θ(n log n)` for comparisons, and `Θ(n^2)` for swaps.

### Merge Sort

- recurrsion. split => sort splits => merge sorted splits.
- need to copy the array first, so it tskes more space than insert sort. costs `o(n)` extra aux space.
- costs `o(n log n)`

![merge sort](https://i.imgur.com/8jN6RCh.png)

### In-place sorting

- do sorting without copying the arrays, costs `o(1)` auxiliary space.
- used in insertion sort.

### Heap

- priority queue
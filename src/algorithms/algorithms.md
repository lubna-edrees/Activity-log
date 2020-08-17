# Algorithms

* Alogrithms 1&2 - university of Princeton : [couresera page](https://www.coursera.org/learn/algorithms-part1/home/welcome) , My notes are in this file.
* data structures and algorithms : [coursera page](https://www.coursera.org/specializations/data-structures-algorithms) [My notes Repo](https://github.com/ahmad-ali14/data-structures-and-algorithms)

  **intro**

* Best resource: [https://algs4.cs.princeton.edu/home/](https://algs4.cs.princeton.edu/home/)
* Resource: [https://introcs.cs.princeton.edu/java/home/](https://introcs.cs.princeton.edu/java/home/)
* “ An algorithm must be seen to be believed. ” — Donald Knuth
* “ Algorithms + Data Structures = Programs. ” — Niklaus Wirth
* “ Algorithms: a common language for nature, human, and computer. ” — Avi Wigderson

![intro](https://i.imgur.com/IapntqE.png)

## General notes

* cost : `N^2` &gt; `N` &gt; `lg N` &gt; `1`.
* cost: `quadratic` &gt; `linear` &gt; `logaritmic` &gt; `const`
* cost `for N=1000`:
  * `N^2` = `1000000` - quadratic.
  * `N` = `1000` - lenear
  * `lg N` = `10` - logaritmic
  * `lg* N` = `0-5` - almost const
  * `1` = `fixed number` - const
* in practice: you start using `quick sort` algorithm, if you find it a bit slow: you stop and chamge to `heap sort`
* studying algorithms: [algorithms stuff](https://github.com/ahmad-ali14/Activity-log/blob/master/algorithms.md)
* knapsack problem here: [https://github.com/ahmad-ali14/data-structures-and-algorithms/blob/master/algorithm-toolbox/week3/maximum\_loot.js](https://github.com/ahmad-ali14/data-structures-and-algorithms/blob/master/algorithm-toolbox/week3/maximum_loot.js)
* algorithm for making a good algorithm:
  * always start with a `naiive algorithm` and make it works, normally slow.
  * next find a standard toolbox to help you:
    * greedy algorithm.
    * divide and conqur.
    * dynamic programming.
  * optimize your algorithm.
* more on algorithms here: [https://github.com/aa947/data-structures-and-algorithms/tree/master/algorithm-toolbox](https://github.com/aa947/data-structures-and-algorithms/tree/master/algorithm-toolbox)
* `greedy algorithm`:

  ```javascript
  1- make the first move.
  2- test if it's a safe move or start from the begining
  3- test if that move is optimized or optimize it the most
  4- you get a sub-problem handle it with the same approach.
  ```

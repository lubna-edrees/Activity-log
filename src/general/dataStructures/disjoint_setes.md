# Disjoint Sets

## Naive Implementations

* [pdf docs](https://d3c33hcgiwev3.cloudfront.net/_59697932cb0646cf141f37f95c4c9409_06_2_disjoint_sets_1_naive.pdf?Expires=1589068800&Signature=Z9~~dHOmEVXJBIyowQDGhPj~JBg7tAl3p8M-t6z8l3phFQm7VtD6r89pIBqVxQAWH1XZao9Wnu7cGwB6ruavIDvNP6fMl4f7ugHzutR1VAaBenCrwxhNA6ljsf4NWu0lyrfTSyn-56gVlewEZUWUfwi33bGx-XPO97hDaCRzmP0_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)
* A disjoint-set data structure supports the following operations:
  * MakeSet\(x\) creates a singleton set {x}
  * Find\(x\) returns ID of the set containing x:
    * if x and y lie in the same set, then `Find(x) = Find(y)`
    * otherwise, Find\(x\) ̸= Find\(y\)
  * Union\(x, y\) merges two sets containing x and y
* union psedo:

  ```javascript
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

* we can do the implementaion with: `linked lists`
  * id is the tail of each set.
  * with time, sets is going to be longer and longer.

    ![linked lists](https://i.imgur.com/OR2YQ49.png)
* better solution \(chaeper\) using: `trees of linked lists`
  * id \(tail\) is the same for the 2 sets, after calling `union()`.

    ![trees of linked lists](https://i.imgur.com/KYR5ioe.png)

## Disjoint Sets: Efficient Implementations

* when merging \(calling `union()`\) on 2 trees, we choose to put the shortest\(least hieght\) tree under the longer tree, so the resulting tree as munch `shallow` as possible.

  ![example](https://i.imgur.com/LI55mxU.png)

### unoin by Rank

* To quickly find a height of a tree, we will keep the height of each subtree in an array `rank[1 . . . n]`: `rank[i]` is the height of the subtree whose root is i.
* now we have 2 arrays:
  * `id`: showing the root of each element in each subtree.
  * `rank`: showing the hieght of the tree that this element belongs to.
* we also call this processure: `union by rank heuristic`
* union psedo with rank:

  ```javascript
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

## path compression

* we introduce another array, that will attatch every element to it's final root. so this will save us time in the future.
* now we have 3 arrays:
  * `id`: showing the root of the subtree of each element, then the final root of each subtree.
  * `rank`: showing the hieght of the tree that this element belongs to.
  * `roots`: showing the final roots for each single element.
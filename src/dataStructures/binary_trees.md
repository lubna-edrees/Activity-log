# Binary search trees

* In problems like:
  * Dictionary Search: Find all words that start with some given string.
  * Date Ranges : Find all emails received in a given period.
  * Closest Height:Find the person in your class whose height is closest to yours.
  * `Local Search`: A Local Search Datastructure stores a number of elements each with a key coming from an ordered set. It supports operations:
    * `RangeSearch(x, y)`: Returns all elements with keys between x and y.
    * `NearestNeighbors(z)`: Returns the element with keys on either side of z.
* we can solve these problems by:
  * Hash tables:

    ![hash tables](https://i.imgur.com/ko5rPcW.png)

  * Array:

    ![array](https://i.imgur.com/hzoBkEp.png)

  * Sorted Array:

    ![sorted array](https://i.imgur.com/eCAQYAL.png)

  * Linked lists:

    ![linked lists](https://i.imgur.com/z9PFtzF.png)

## search Tree

* for any Node X in the tree: X’s key is `larger than` the key of `any descendent` of its `left` child, and `smaller than` the key of `any descendant` of its `right` child.

### search Tree functions

1. find\(key, root\):

   ```javascript
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

2. Next\(Node\):

   ```javascript
   Next(N)
    if N.Right ̸= null:
      return LeftDescendant(N.Right)
   else:
      return RightAncestor(N)
   ```

3. LeftDescendant\(Node\):

   ```javascript
   LeftDescendant(N)
     if N.Left = null
       return N
     else:
       return LeftDescendant(N.Left)
   ```

4. Right Ancestor \(Node\):

   ```javascript
      RightAncestor(N):
       if N.Key < N.Parent.Key
         return N.Parent
       else:
         return RightAncestor(N.Parent)
   ```

5. RangeSearch\(x = first element in search range , y = second element to search , R = tree or root\)

   ```javascript
      RangeSearch(x, y, R):
       L ← ∅
       N ← Find(x, R)
       while N.Key ≤ y
           if N.Key ≥ x:
           L ← L.Append(N)
           N ← Next(N)
       return L
   ```

6. Insert\(key, tree or root\):

   ```javascript
     Insert(k, R):
       P ← Find(k, R)
       Add new node with key k as child of P
   ```

7. delete\(Node\):

   ```javascript
      Delete(N):
       if N.Right = null:
           Remove N, promote N.Left
       else:
           X ← Next(N)
           ∖∖ X.Left = null
           Replace N by X, promote X.Right
   ```

8. Example: deleting Node \(1\):
   * bring its next element\(2\), to be in \(1\) place.
   * bring \(4\) tree to be in \(2\) place.

     ![deleting example](https://i.imgur.com/1ToOmjn.png)

## AVL trees

* to keep our trees `balanced` , \(the hieght of left = hieght of Right\).
* `hieght of tree`: the maximum depth of any of its children.
* calculating the hieght of a tree:

  ```javascript
    Height(N):
      if N is a leaf:
       hieght = 1
      else:
        hieght = 1 + max(N.Left.Height, N.Right.Height)
  ```

* example of Node after adding hieght property:

  ![node example](https://i.imgur.com/VKlQ8mx.png)

* updating trees can destroy their balance.

### Insertion into AVL tree

* We need a new insertion algorithm that involves rebalancing the tree to maintain the AVL property.
* insertion idea:

  ```javascript
    AVLInsert(k: key, R: root):
      Insert(k, R)
      N = Find(k, R)
      Rebalance(N)
  ```

* Rebalancing:

  ```javascript
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

* Adjusting Hieght : recalculate height after rebalancing the tree

  ```javascript
      AdjustHeight(N):
          N.Height = 1+ max( N.Left.Height, N.Right.Height)
  ```

* exception: consider this case: where the left subtree too heavy. so we need to use different rebalancing function `RebalanceRight(N)`.

  ![left subtree is too heavy](https://i.imgur.com/PI346gO.png)

* RebalanceRight\(Node\):

  ```javascript
      RebalanceRight(N: node):
        M = N.Left
        if M.Right.Height > M.Left.Height:
            RotateLeft(M)
        RotateRight(N)
        AdjustHeight() on affected nodes
  ```

* `RotateLeft()` Example:

  ![RotateLeft](https://i.imgur.com/jorkGCZ.png)

### deleting from AVL tree

* Deletions can also change balance.
* deleting from AVL tree:

  ```javascript
    AVLDelete(N: node):
        Delete(N)
        M = Parent of node replacing N
        Rebalance(M)
  ```

### Merge AVL trees

* `Merge` Combines two binary search trees into a single one.

  ![merge avl trees](https://i.imgur.com/ly1KIsl.png)

* If we got extra root `T` we do the merge over it:

  ```javascript
    MergeWithRoot(R1: tree1, R2: tree2, T: new element to merge over):
        T.Left = R1
        T.Right = R2
        R1.Parent = T
        R2.Parent = T
        return T
  ```

* if we didn't get that extra element, we need to search for it and the Get new root by removing largest element of left subtree.

  ```javascript
      Merge(R1: tree1 , R2: tree2):
          T = Find(∞, R1) // find largest element 
          Delete(T)  // remove that element from the tree
          MergeWithRoot(R1, R2, T) // use that T as extra element to merge
          return T
  ```

* to maintain the balance, we merge the smaller tree `R2` with a subtree form the bigger tree `R1` with the same height as `R2`.
* we Go down side of the bigger tree until merge with a subtree of same height as the smaller tree.
* we need a new `Merge()` function:

  ```javascript
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

* Split Breaks one binary search tree into two.
* we search for element `x`, then we merge all elements bigger than x into one tree, also merge all elements smaller than x into one another tree

  ![splite trees](https://i.imgur.com/ce4siYq.png)

* `split(R: tree, X: element)` function:

  ```javascript
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

> `predecessor` P of a node N is the node with the largest key smaller than the key of N

## splay tree

* animation: [https://www.cs.usfca.edu/~galles/visualization/SplayTree.html](https://www.cs.usfca.edu/~galles/visualization/SplayTree.html)

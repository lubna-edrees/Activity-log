# trees

* A Tree is: empty, or a node with: a key, and a list of child trees.
* Root: top node in the tree.
* A child has a line down directly from a parent.
* Ancestor: parent, or parent of parent, etc
* Descendant: child, or child of child, etc.
* Leaf : node with no children.
* Interior node \(non-leaf\).
* Height: maximum depth of subtree node and farthest leaf
* Forest: collection of trees.
* `binary tree`: a tree with most 2 children, lift and right.
* Height\(tree\)

```javascript
if tree = nil:
return 0
return 1 + Max(Height(tree.left),
Height(tree.right))
```

* Size\(tree\)

```javascript
if tree = nil
return 0
return 1 + Size(tree.left) +
Size(tree.right)
```

### Depth-first tree traversal \(for binary trees\)

* we use `stack`.
* we start from trees dont have children. `tree = nill`
* InOrderTraversal\(tree\):
  * traverse lift then key then right tree.

```javascript
if tree = nil:
return
InOrderTraversal(tree.left)
Print(tree.key)
InOrderTraversal(tree.right)
```

* PreOrderTraversal\(tree\):
  * we traverse the key then the left then right trees.

```javascript
if tree = nil:
return
Print(tree.key)
PreOrderTraversal(tree.left)
PreOrderTraversal(tree.right)
```

* PostOrderTraversal\(tree\)
  * we traverse the left then the right trees and lastly the key.

```javascript
if tree = nil:
return
PostOrderTraversal(tree.left)
PostOrderTraversal(tree.right)
Print(tree.key)
```

### Breadth-first traversal

* we use `queue`
* LevelTraversal\(tree\)
  * pre-order traversion level by level.

```javascript
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
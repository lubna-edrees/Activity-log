# quick-union

* lazy approach: avoid doing work until we have to.
* we follow the parent roots until we find a parent points to itself, this will be the parent of all elements in the tree.
* 2 elements are connectd if they have the same parent root.
* union is easy, find is slow.
* cost `N`
* resource: [https://www.coursera.org/learn/algorithms-part1/lecture/ZgecU/quick-union](https://www.coursera.org/learn/algorithms-part1/lecture/ZgecU/quick-union)
* Example:

  ```java
  public class QuickFindUF
  {
  private int[] id;
  public QuickFindUF(int N)
  {
  id = new int[N];
  for (int i = 0; i < N; i++)
  id[i] = i;
  }
  public boolean connected(int p, int q)
  { return id[p] == id[q]; }
  public void union(int p, int q)
  {
  int pid = id[p];
  int qid = id[q];
  for (int i = 0; i < id.length; i++)
  if (id[i] == pid) id[i] = qid;
  }
  }
  ```

## quick-union Improvments

### 1. weighting

* while implementing, avoid long trees.
* track the number of objects in each tree, then put the short \(small\) tree under the long tree.
* cost `lg N` = `log(2) N` Ex: `N=1000 => lg N = 10`, `N=1000000 => lg N = 20`, `N=1000000000 => lg N = 30`. -Example: Modify quick-union `union` function:

  ```java
  public void union(int p, int q)
  {
  int i = root(p);
  int j = root(q);
  if (i == j) return;
  if (sz[i] < sz[j]) { id[i] = j; sz[j] += sz[i]; }
  else { id[j] = i; sz[i] += sz[j]; }
  }
  ```

### 2.  path-compression

* while searching, change the pointers of each sub-tree to point directly to the parent root.
* flatten the tree.
* Example: Modify quick-union-weighting `root` function:

  ```java
  private int root(int i)
  {
  while (i != id[i])
  {
  id[i] = id[id[i]];
  i = id[i];
  }
  return i;
  }
  ```

# intro 
- Best resource: https://algs4.cs.princeton.edu/home/
- Resource: https://introcs.cs.princeton.edu/java/home/
- “ An algorithm must be seen to be believed. ” — Donald Knuth
- “ Algorithms + Data Structures = Programs. ” — Niklaus Wirth
- “ Algorithms: a common language for nature, human, and computer. ” — Avi Wigderson

![](https://i.imgur.com/IapntqE.png)

# General notes
- cost : `N^2` > `N` > `lg N` > `1`.
- cost: `quadratic` > `linear` > `logaritmic` > `const`
- cost `for N=1000`:
        - `N^2` = `1000000` - quadratic.
        - `N` = `1000` - lenear
        - `lg N` = `10` - logaritmic
        - `lg* N` = `0-5` - almost const
        - `1` = `fixed number` - const

# union-find
- Read in number of objects N from standard input.
        -・Repeat:
                – read in pair of integers from standard input
                – if they are not yet connected, connect them and print out pair
- resource: https://d3c33hcgiwev3.cloudfront.net/_b65e7611894ba175de27bd14793f894a_15UnionFind.pdf?Expires=1587945600&Signature=acCR6aDGXnA7luzAqFrIeDW6riwnUjsEuigduiwEkwFUkL9tvIH5k39Lo1bSy00AP0nC1QBlXexq6fqaGslGLbIbWBOc0jO99mi09BCFV6InmXXlPIIgk90DDf9Vk67O4tEs-jSRma7NSCCohSE6~WCb36UWOGVLQOIq7Amm5DY_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A
- EX: `Monte Carlo Simulation` `
- general example
```java
public static void main(String[] args)
{
 int N = StdIn.readInt();
 UF uf = new UF(N);
 while (!StdIn.isEmpty())
 {
 int p = StdIn.readInt();
 int q = StdIn.readInt();
 if (!uf.connected(p, q))
 {
 uf.union(p, q);
 StdOut.println(p + " " + q);
 }
 }
}
```

## quick-find
- eager approach
- we follow the ids, until we find same id.
- 2 elements are connected if they have the same id.
- find easy, union is slow.
- cost `N^2`
- resource: https://www.coursera.org/learn/algorithms-part1/lecture/EcF3P/quick-find
- Example:
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

## quick-union:
- lazy approach: avoid doing work until we have to.
- we follow the parent roots until we find a parent points to itself, this will be the parent of all elements in the tree.
- 2 elements are connectd if they have the same parent root.
- union is easy, find is slow.
- cost `N`
- resource: https://www.coursera.org/learn/algorithms-part1/lecture/ZgecU/quick-union
- Example:
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

## quick-union Improvments:
### 1- weighting:
- while implementing, avoid long trees.
- track the number of objects in each tree, then put the short (small) tree under the long tree.
- cost `lg N` = `log(2) N` Ex: `N=1000 => lg N = 10`,  `N=1000000 => lg N = 20`, `N=1000000000 => lg N = 30`.
-Example: Modify quick-union `union` function:
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

### 2-  path-compression:
- while searching, change the pointers of each sub-tree to point directly to the parent root.
- flatten the tree.

- Example: Modify quick-union-weighting `root` function:
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


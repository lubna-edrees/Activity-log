# quick-find

* eager approach
* we follow the ids, until we find same id.
* 2 elements are connected if they have the same id.
* find easy, union is slow.
* cost `N^2`
* resource: [https://www.coursera.org/learn/algorithms-part1/lecture/EcF3P/quick-find](https://www.coursera.org/learn/algorithms-part1/lecture/EcF3P/quick-find)
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

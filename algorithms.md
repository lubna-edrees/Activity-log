# intro 
- Best resource: https://algs4.cs.princeton.edu/home/
- Resource: https://introcs.cs.princeton.edu/java/home/
- “ An algorithm must be seen to be believed. ” — Donald Knuth
- “ Algorithms + Data Structures = Programs. ” — Niklaus Wirth
- “ Algorithms: a common language for nature, human, and computer. ” — Avi Wigderson

![](https://i.imgur.com/IapntqE.png)

# union-find

## quick-find
- eager approach
- cost `n^2`
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



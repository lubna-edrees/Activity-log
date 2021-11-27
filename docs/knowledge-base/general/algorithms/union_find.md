# union-find

* Read in number of objects N from standard input.

  ```text
    -・Repeat:
            – read in pair of integers from standard input
            – if they are not yet connected, connect them and print out pair
  ```

* resource: [https://d3c33hcgiwev3.cloudfront.net/\_b65e7611894ba175de27bd14793f894a\_15UnionFind.pdf?Expires=1587945600&Signature=acCR6aDGXnA7luzAqFrIeDW6riwnUjsEuigduiwEkwFUkL9tvIH5k39Lo1bSy00AP0nC1QBlXexq6fqaGslGLbIbWBOc0jO99mi09BCFV6InmXXlPIIgk90DDf9Vk67O4tEs-jSRma7NSCCohSE6~WCb36UWOGVLQOIq7Amm5DY\_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A](https://d3c33hcgiwev3.cloudfront.net/_b65e7611894ba175de27bd14793f894a_15UnionFind.pdf?Expires=1587945600&Signature=acCR6aDGXnA7luzAqFrIeDW6riwnUjsEuigduiwEkwFUkL9tvIH5k39Lo1bSy00AP0nC1QBlXexq6fqaGslGLbIbWBOc0jO99mi09BCFV6InmXXlPIIgk90DDf9Vk67O4tEs-jSRma7NSCCohSE6~WCb36UWOGVLQOIq7Amm5DY_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)
* EX: `Monte Carlo Simulation` \`
* general example

  ```java
  public static void main(String[] args) {
    int N = StdIn.readInt();
    UF uf = new UF(N);

    while (!StdIn.isEmpty()) {
        int p = StdIn.readInt();
        int q = StdIn.readInt();

        if (!uf.connected(p, q)){
            uf.union(p, q);
            StdOut.println(p + " " + q);
            }
        }
    }
  ```

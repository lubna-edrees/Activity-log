# Algorithms on Graphs

* graphs are used in: 
  * represent Internet pages and the connections between them.
  * maps
  * social networks.
* An \(undirected\) Graph is a collection V of vertices, and a collection E of edges each of which connects a pair of vertices.
* Drawing Graphs:
  * Vertices: Points. Edges: Lines.
  * Loops connect a vertex to itself.
  * Multiple edges between same vertices.
* Represinting Graphs:
  * List of all edges: `Edges: (A, B), (A, C), (A,D), (C,D)`
  * Adjacency Matrix: Matrix. Entries 1 if there is an edge, 0 if there is not.
  * Adjacency List : For each vertex, a list of adjacent vertices.
* time cost for each of the previous Graph representaions:

  ![ time cost for each of the previous Graph representaions](https://i.imgur.com/QrZMK3A.png)

## Week1: Exploring Undirected Graphs

* A `path` in a graph G is a sequence of vertices v0, v1, . . . , vn so that for all i, \(vi , vi+1\) is an edge of G.
* operations on graphs:
  * Reachability: outputs The collection of vertices v of G so that there is a path from s to v. 
  * connectivity: outputs The connected components of G.

### Reachability \(All components\)

```python
All Component(s: ):
    DiscoveredNodes = []
    while there is an edge e leaving DiscoveredNodes that has not been explored:
        add vertex at other end of e to DiscoveredNodes
    return DiscoveredNodes
```

* Visit Markers : To keep track of vertices found we Give each vertex boolean visited\(v\).
* Unprocessed Vertices: Keep a list of vertices with edges left to check.

### Depth First Ordering

* We will explore new edges in `Depth First` order. We will follow a long path forward, only backtracking when we hit a `dead end`.

```python
Explore(v: vertix):
    visited(v) = true
    for (v, w) ∈ E: # E contains all niebourghs w of v
        if not visited(w):
            Explore(w)
```

### Connectivity

* The vertices of a graph G can be partitioned into `Connected Components` so that v is reachable from w if and only if they are in the `same connected component`.

```python
Depth-First-Search(G: graph):
  for all v ∈ V mark v unvisited: #initialize all vertices as un visted using counter cc
  cc = 1
  for v ∈ V : # V contains all vertices  v of the single connected component V
    if not visited(v):`
        Explore(v)
  cc = cc + 1 # increase the counter so it's giving a different mark to every vertices 
    # in a single component
```

Explore:

```python
Explore(v: vertix):
  visited(v) = true # mark that this vertix has visted 
  CCnum(v) = cc # mark all vertices in the same component with the same counter
  for (v, w) ∈ E:  
  # check if there are still unvisted vertices in v niebourghs
    if not visited(w):
        Explore(w)
```

* Each new `explore()` finds new `single connected component`.
* Runtime  `O(|V: vertices | + |E: edges|)`.

### Previsit and Postvisit Functions

* you might want to track more data while you going over the vertices, these data can be tracked using `preVistit()` and `postVisit()` functions.
* adding pre and post visits functions to `DSF()` in the `Explore()`:

  ```python
      Explore(v: vertix):
        visited(v) = true
        previsit(v) # execute pre visit
        for (v, w) ∈ E: # adjacents
            if not visited(w):
                explore(w)
        postvisit(v)

        ####### def pre visit and posy vists ########
        clock = 1
        previsit(v):
            pre(v) = clock
            clock = clock + 1
        postvisit(v):
            post(v) = clock
            clock = clock + 1
  ```

## week2: Directed Graphs

* `Directed Graph`:  a graph where each edge has a start vertex and an end vertex.
* Directed graphs might be used to represent:
  * Streets with one-way roads.
  * Links between webpages.
  * Followers on social network.
  * Dependencies between tasks
* `Directed DFS`:
  * Only follow directed edges.
  * `explore(v)` finds all vertices reachable from v.
  * Can still compute pre- and postorderings. 
* `cycle`: A cycle in a graph G is a sequence of vertices `v1, v2, . . . , vn` so that `(v1, v2),(v2, v3), . . . ,(vn−1, vn),(vn, v1)` are all edges.
* If G contains a cycle, it `cannot` be `linearly ordered`.
* `DAGs` : A directed graph G is a `Directed Acyclic Graph` \(or DAG\) if it has no cycles.
* Example: only A is a DAG

  ![DAG](https://i.imgur.com/dW5OzeL.png)

* Any DAG can be linearly ordered.

### Topological Sort

* `Last Vertex`: a vertex that cannot have any edges pointing out of it.
* `source`:  a vertex with no incoming edges.
* `sink` :  a vertex with no outgoing edges, simply it's a `last vertix`.
* Example: red vertices are `sinks`

  ![sinks](https://i.imgur.com/RUe1spr.png)

* topological sort idea: 1. Find sink. 2. Put that sink at end of order. 3. Remove the sink from graph. 4. Repeat.
* finding a sink:
  * to find a sink we need to follow the `path` pointing to this sink until we :
    * Cannot extend  =&gt; we found a sink.
    * Repeat a previous vertex =&gt; we found a cycle.
* Topological sort algorithm:

  ```python
        LinearOrder(G):
          while G non-empty:
            Follow a path until cannot extend
                Find sink v
                Put v at end of order
                Remove v from G
                LinearOrder(G) # G is now less by 1 vertix.

                ## Runtime O(|V|^2)
  ```

* weaknesses in the previous algorithm:
  * Retrace same path every time. 
  * every time we start from the begining, sowe  can:  `Instead only back up as far as necessary`.

### Optimized topological sort

```python
TopologicalSort(G):
    DFS(G) # run depth first search with pre and post order functions
    sort vertices by reverse post-order # greater post-order value comes first in the output.
```

If G is a DAG, with an edge u -&gt; v, so: `post(u) > post(v)`.


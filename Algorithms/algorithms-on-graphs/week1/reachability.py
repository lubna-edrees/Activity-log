#Uses python3

import sys

def reach(adj, x, y):
    #write your code here
    #print('adj', adj)
    #print('x', x)
    #print('y', y)
    visited = [False for x in range(len(adj))]
    #print (visited)
    def dfs(x):
        visited[x] = True
        #print('line 14', visited)
        for w in adj[x]:
            if w == y:
                visited[w]
                #print('line 17', visited)
            if visited[w] is False:
                dfs(w)
        return 1 if visited[y] is True else 0
    return dfs(x)



if __name__ == '__main__':
    input = sys.stdin.read()
    data = list(map(int, input.split()))
    #data = [4, 4, 1, 2, 3, 2, 4, 3, 1, 4, 1, 4]
    #print('raw data', data)
    n, m = data[0:2]
    data = data[2:]
   # print('data', data)
    edges = list(zip(data[0:(2 * m):2], data[1:(2 * m):2]))
    #print(edges)
    #m = m-1
    x, y = data[2 * m:]
    adj = [[] for _ in range(n)]
    x, y = x - 1, y - 1
    for (a, b) in edges:
        adj[a - 1].append(b - 1)
        adj[b - 1].append(a - 1)
    print(reach(adj, x, y))



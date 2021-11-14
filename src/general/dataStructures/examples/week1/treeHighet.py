# python3

import sys
import threading
from collections import namedtuple

Node = namedtuple("Node", ["key", "parent", "children"])


def compute_height(n, parents):
    # Replace this code with a faster implementation
    tree = []
    max_height = 0
    height = 0
    root = None
    for vertex in range(n):
        tree.append(Node(vertex , parents[vertex], []))
    
    for i, next in enumerate(tree):
        count = 0
        if next.parent == -1:
            root = next
            pass
        for j, nn in enumerate(tree):
            # if nn.parent == -1:
            #     continue
            if next.key == nn.parent:
                next.children.append(nn)
                
  
    #print (tree)
    #print (root, 'root')
    return maxDepth(root)


def maxDepth(node):
    #print (node)
    if len(node.children) == 0:
        return 1
    children = node.children
    depth_list = []
    for child in children:
        depth_list.append(maxDepth(child))
    
    #print(depth_list, 'depth_list')
    return max(depth_list, default=0) +1

def filterTuplesArr(num, arrOfTuples):
    for i, next in enumerate(arrOfTuples):
        if next.key == num:
            return next


def main():
    n = int(input())
    parents = list(map(int, input().split()))
    print(compute_height(n, parents))


# In Python, the default limit on recursion depth is rather low,
# so raise it here for this problem. Note that to take advantage
# of bigger stack, we have to launch the computation in a new thread.
sys.setrecursionlimit(10**7)  # max depth of recursion
threading.stack_size(2**27)   # new thread will get stack of such size
threading.Thread(target=main).start()

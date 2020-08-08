#!/usr/bin/python3

import sys, threading

sys.setrecursionlimit(10**7) # max depth of recursion
threading.stack_size(2**25)  # new thread will get stack of such size

def IsBinarySearchTree(tree):
  # Implement correct algorithm here
  #print(tree)

  if len(tree) == 0: return True 
  result = True
  def check_tree(trees, node, res):
        
        
        if res == False : return False
        root = trees[node][0]
        left = trees[node][1]
        right = trees[node][2]

        print('node', node)
        print('root', root)
        print ('left', left)
        print ('right', right)

        if root == -1: 
            print('______________change__________')
            return

        if left == -1 and right == -1 :
            #print('_________change different __________')
            if node + 1 < len(trees):
                check_tree(trees, node + 1 , res)
            return

        print('trees[left][0]', trees[left][0])
        print('trees[right][0]', trees[right][0])
        if trees[left][0] > root or  trees[right][0] < root: 
             res = False
             print('res', res)
             return False
        print('----------------')
        check_tree(trees, left , res)
        check_tree(trees, right , res)
        
        #if left == -1 and right == -1: return 
        # check_tree(trees, left , res)
        # check_tree(trees, right, res)
  result = check_tree(tree, 0, result)
  #print('after func', result)
  if result == None : result = True
  return result  


def main():
  nodes = int(sys.stdin.readline().strip())
  tree = []
  for i in range(nodes):
    tree.append(list(map(int, sys.stdin.readline().strip().split())))
  if IsBinarySearchTree(tree):
    print("CORRECT")
  else:
    print("INCORRECT")

threading.Thread(target=main).start()

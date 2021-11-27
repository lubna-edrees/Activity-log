#!/usr/bin/python3

import sys, threading

sys.setrecursionlimit(10**7) # max depth of recursion
threading.stack_size(2**25)  # new thread will get stack of such size

def IsBinarySearchTree(tree):
  # Implement correct algorithm here
  print(tree)

  if len(tree) == 0: return True 
  result = True
  def check_tree(trees, node, res):
        
        
        if res == False : return False
        root = trees[node][0]
        left_index = trees[node][1]
        right_index = trees[node][2]
        mainRoot = trees[0][0]

        print('node', node)
        print('root', root)
        print ('left_index', left_index)
        print ('right_index', right_index)
        print('main Root', mainRoot)

        # if node == -1: 
        #     print('______________change__________')
        #     return

        if left_index == -1 and right_index == -1 :
            
            if trees[node - 1][1] == node or trees[node - 2][1] == node:
                print('left leaf checking with mainRoot')
                if root > mainRoot:
                   print('left leaf greater than mainRoot')
                   res = False 
                   return False
            if trees[node - 1][2] == node or trees[node - 2][2] == node:
                print('right Leaf checking with mainroot')
                if root > mainRoot:
                   print('right leaf smaller than mainRoot')
                   res = False
                   print('smaller res', res)
                   return False
                res = False
                return False 
            
            if node + 1 < len(trees):
                print('_________change different next Node __________')
                check_tree(trees, node + 1 , res)
            return res

        if left_index == -1 and right_index != -1 :
            print('_________change different Right __________')
            if trees[right_index][0] < mainRoot:
                print('passed right only')
                res = False 
                return res
            return check_tree(trees, right_index , res)
        if right_index == -1 and left_index != -1 :
            print('_________change different Left __________')
            if trees[left_index][0] > mainRoot:
                print('passed left only')
                res = False 
                return res
            return check_tree(trees, left_index , res)

        print('trees[left_index][0]', trees[left_index][0])
        print('trees[right_index][0]', trees[right_index][0])
        if trees[left_index][0] > root or  trees[right_index][0] < root: 
             res = False
             print('res', res)
             return False
        print('----------------')
        check_tree(trees, left_index , res)
        check_tree(trees, right_index , res)
        
  print(result, 'berfore func')  
  result = check_tree(tree, 0, result)
  print('after func', result)
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

# python3

import sys, threading
sys.setrecursionlimit(10**6) # max depth of recursion
threading.stack_size(2**27)  # new thread will get stack of such size

class TreeOrders:
  def read(self):
    self.n = int(sys.stdin.readline())
    self.key = [0 for i in range(self.n)]
    self.left = [0 for i in range(self.n)]
    self.right = [0 for i in range(self.n)]
    
    for i in range(self.n):
      [a, b, c] = map(int, sys.stdin.readline().split())
      self.key[i] = a
      self.left[i] = b
      self.right[i] = c

  def inOrder(self):
    self.result = []
    self.trees = []
    # Finish the implementation
    # You may need to add a new recursive method to do that
    
    self.makeTrees( self.key, self.left, self.right)
    print('trees', self.trees)
    # root= 0, right =1, left =2

    def traverse(self, trees, start):
      
    
    for i in range(len(self.trees)-1, -1, -1):
      if self.trees[i][1] == None or self.trees[i][2] == None:
        continue
      else: 
        if self.trees[i][2] not in self.result:
          self.result.append(self.trees[i][2])
        if self.trees[i][0] not in self.result:
          self.result.append(self.trees[i][0])
        if self.trees[i][1] not in self.result:
          self.result.append(self.trees[i][1])     
    return self.result

  def preOrder(self):
    self.result = []
    self.trees = []
    # Finish the implementation
    # You may need to add a new recursive method to do that

    self.makeTrees( self.key, self.left, self.right)
    # root= 0, right =1, left =2
   
    for i in range(0, len(self.trees), +1):
      if self.trees[i][1] == None or self.trees[i][2] == None:
        continue
      else: 
        if self.trees[i][0] not in self.result:
          self.result.append(self.trees[i][0])
        if self.trees[i][2] not in self.result:
          self.result.append(self.trees[i][2])
        if self.trees[i][1] not in self.result:
          self.result.append(self.trees[i][1])    
    return self.result

  def postOrder(self):
    self.result = []
    self.trees = []
    # Finish the implementation
    # You may need to add a new recursive method to do that
    print(self.key, 'key')
    print(self.left, 'left')
    print(self.right, 'right')
    print(self.result, 'result')

    self.makeTrees( self.key, self.left, self.right)
    print('trees', self.trees)
    # root= 0, right =1, left =2

    
    for i in range(len(self.trees)-1, -1, -1):
      if self.trees[i][1] == None or self.trees[i][2] == None:
        continue
      else: 
        if self.trees[i][2] not in self.result:
          self.result.append(self.trees[i][2])
        if self.trees[i][1] not in self.result:
          self.result.append(self.trees[i][1])
        if self.trees[i][0] not in self.result:
          self.result.append(self.trees[i][0]) 
                
    return self.result

  def makeTrees(self, key, left, right):
    #if 2*i + 1 < len(self.key) and 2*i + 2 < len(self.key):
    for i in range(len(key)):
      tree = [0 , 0, 0]
      tree[0] = key[i]
      tree[1] = None if right[i] == -1  else key[right[i]]
      tree[2] = None if left[i] == -1  else key[left[i]]
      self.trees.append(tree)



def main():
	tree = TreeOrders()
	tree.read()
	print(" ".join(str(x) for x in tree.inOrder()))
	print(" ".join(str(x) for x in tree.preOrder()))
	print(" ".join(str(x) for x in tree.postOrder()))

threading.Thread(target=main).start()

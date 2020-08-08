# python3

"""
Convert array into heap

Problem Introduction:
In this problem you will convert an array of integers into a heap. This is the crucial step of the sorting algorithm called HeapSort. It has guaranteed worst-case running time of o(n log n) as opposed to QuickSort’s average running time of o(n log n). QuickSort is usually used in practice, because typically it is faster, but HeapSort is used for external sort when you need to sort huge files that don’t fit into memory of your computer.

_________________________________________________________

Problem Description:
Task. The first step of the HeapSort algorithm is to create a heap from the array you want to sort By the way, did you know that algorithms based on Heaps are widely used for external sort, when you need to sort huge files that don’t fit into memory of a computer? Your task is to implement this first step and convert a given array of integers into a heap. You will do that by applying a certain number of swaps to the array. Swap is an operation which exchanges elements ai and aj of the array a for some i and j. You will need to convert the array into a heap using only o(n) swaps, as was described in the lectures. Note that you will need to use a min-heap instead of a max-heap in this problem.

__________________________________________________________

Input Format:
The first line of the input contains single integer n. 
The next line contains n space-separated integers ai
.

__________________________________________________________

Output Format:
- The first line of the output should contain single integer m — the total number of swaps.
- m must satisfy conditions 0 ≤ m ≤ 4n. The next m lines should contain the swap operations used 
    to convert the array a into a heap. Each swap is described by a pair of integers i, j — the 0-based indices of the elements to be swapped. After applying all the swaps in the specified order. - the array must become a heap, that is, for each i where 0 ≤ i ≤ n − 1 the following conditions must be true:
    1. If 2i + 1 ≤ n − 1, then ai < a2i+1.
    2. If 2i + 2 ≤ n − 1, then ai < a2i+2.
- Note that all the elements of the input array are distinct.
- Note that any sequence of swaps that has length at most 4n and after which your initial array 
    becomes a correct heap will be graded as correct.
"""



def build_heap(arr):
    swaps = []
    n = len (arr)
    # Index of last non-leaf node 
    startIdx = int((n / 2)) - 1; 
  
    # Perform reverse level order traversal 
    # from last non-leaf node and heapify 
    # each node 
    for i in range(startIdx, -1, -1): 
        heapify(swaps , arr, n, i); 
  
    return swaps

        #for j in range(i + 1, len(data)):
            # if data[i] > data[j]:
            #     swaps.append((i, j))
            #     data[i], data[j] = data[j], data[i]
        
        
           
    #print('final data' , data)
    #return swaps

# def doHeap(swaps , data , n , i):
#     l = (2*i) + 1
#     r = (2*i) +2 
#     p = i
#     pp = 0
#     parent = data[p]
#     if l < len(data):
#         left = data[l]
#     else :
#         left = None
#     if r < len(data):    
#         right = data[r]
#     else:
#         right = None
#     #[5, 4, 3, 2, 1]
#     print(parent, left, right)
#     if left == None or right == None:
#         return 
#     if left < parent:
#         swaps.append((i, l))
#         #pp = l
#         data[p], data[l] = data[l], data[p]
#         pp = data.index(data[l])
#         print('data' , data)
#     elif right < parent:
#         swaps.append((i, r))
#         #pp = r
#         data[p], data[r] = data[r], data[p]
#         pp = data.index(data[r])
#         print('data' , data)

#     return doHeap(swaps, data, n , pp)




def heapify(swaps, arr, n, i): 
    
    largest = i; # Initialize largest as root 
    l = 2 * i + 1; # left = 2*i + 1 
    r = 2 * i + 2; # right = 2*i + 2 
  
    # If left child is larger than root 
    if (l < n and arr[l] < arr[largest]): 
        largest = l; 
  
    # If right child is larger than largest so far 
    if (r < n and arr[r] < arr[largest]): 
        largest = r; 
  
    # If largest is not root 
    if (largest != i): 
        swap = arr[i]; 
        swaps.append((i,largest))
        arr[i] = arr[largest]; 
        arr[largest] = swap; 
  
        # Recursively heapify the affected sub-tree 
        heapify(swaps, arr, n, largest); 
  

def main():
    n = int(input())
    data = list(map(int, input().split()))
    assert len(data) == n

    swaps = build_heap(data)

    #print (data)

    print(len(swaps))
    for i, j in swaps:
        print(i, j)


if __name__ == "__main__":
    main()

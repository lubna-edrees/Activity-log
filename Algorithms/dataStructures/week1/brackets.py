# python3
#import numpy as np

from collections import namedtuple

Bracket = namedtuple("Bracket", ["char", "position"])


def are_matching(left, right):
    return (left + right) in ["()", "[]", "{}"]


def find_mismatch(text):
    opening_brackets_stack = []
    end = len(text)
    for i, next in enumerate(text):
    #i = 0
    #while i < end:
        #next = text[i]
        # print (i)
        # if len(text) > i+1:
        #     #if next in "([{" and text[i+1] in ")]}":
            
        #     if are_matching(next, text[i+1]):
        #         print ('doublr close')
        #         print(opening_brackets_stack)
        #         i = i + 2
        #         continue

        if next in "([{":
            # Process opening bracket, write your code here
            opening_brackets_stack.append(Bracket(next, i))
            # print ('append')
            # print(opening_brackets_stack)
            continue

        if next in ")]}":
            # Process closing bracket, write your code here
            #print( opening_brackets_stack[0].char)
            if len(opening_brackets_stack) >= 1: 
                #print (opening_brackets_stack[-1].char)   

                if are_matching(opening_brackets_stack[-1].char, next):
                    opening_brackets_stack.pop(-1)
                    #print(opening_brackets_stack)
                    #print ('remove')
                    continue
            opening_brackets_stack.append(Bracket(next, i))
            #print('append again')
            # print(opening_brackets_stack)
            

    # print(opening_brackets_stack)
    #print('here')
    if len(opening_brackets_stack) == 0:
        return 'Success'
    else:
        # a = np.array(opening_brackets_stack) # NumPy array
        # il = a.tolist()
        #for i, next in enumerate(')}]'):
        for j, nn in enumerate(opening_brackets_stack):
            # nn = opening_brackets_stack[j]
            if nn[0] in "]})":
                return nn[1] +1
        return opening_brackets_stack[0].position +1

def main():
    text = input()
    mismatch = find_mismatch(text)
    # Printing answer, write your code here
    print (mismatch)

if __name__ == "__main__":
    main()

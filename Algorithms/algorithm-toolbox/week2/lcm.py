# Least Common Multiple
# a x b = LCM(a, b) * GCD (a, b) =>   LCM(a, b) = (a x b) / GCD(a, b)

def gcd(a, b):
    if b == 0 :
        return a
    return gcd( b, a % b ) 


# def lcm(a, b):
#     if a>b:
#         c = b
#     else:
#         c = a
#     while True:
#         if ((c % a == 0) and (c % b == 0)):
#             return c
#         c += 1

def lcm(a,b): 
    return (a*b) // gcd(a,b) 



if __name__ == '__main__':
  n1  = input()
  n2 = n1.split()
  print( lcm(int(n2[0]),int(n2[1]))  ) 

    
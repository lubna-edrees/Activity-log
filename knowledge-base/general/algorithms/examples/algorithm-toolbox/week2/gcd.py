def gcd(a, b):
    if b == 0 :
        return a
    return gcd( b, a % b ) 

if __name__ == '__main__':
  n1  = input()
  n2 = n1.split()
  print( gcd(int(n2[0]),int(n2[1]))  ) 

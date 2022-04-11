def fabinocci_last(n):
    a = 0
    b =1
    res = 0

    for i in range(2, n+1):
        res = (a+b)%10
        a = b
        b = res
    return res


if __name__ == '__main__':
  n = int(input())
  print(fabinocci_last(n))

    
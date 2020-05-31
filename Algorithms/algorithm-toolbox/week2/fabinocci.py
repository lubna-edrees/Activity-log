
def feb(n):
  if n== 0:
    return print(0)
  if n ==1:
    return print(1)
  nn = []
  for x in range(n+1):
    if x == 0:
      nn.append(0)
      continue
    if x == 1:
      nn.append(1)
      continue
    else:
      nn.append(nn[x-1]+nn[x-2])
  return print(nn[-1])



if __name__ == '__main__':
  n = int(input())
  feb(n)
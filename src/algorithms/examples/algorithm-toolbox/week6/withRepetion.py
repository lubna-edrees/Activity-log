def unboundedKnapsack(W, n, val, wt): 
    
    # dp[i] is going to store maximum  
    # value with knapsack capacity i. 
    dp = [0 for i in range(W + 1)] 
    #print (dp)
  
    #ans = 0
  
    # Fill dp[] using above recursive formula 
    for i in range(W + 1):
        
        for j in range(n): 
            if (wt[j] <= i): 
                dp[i] = max(dp[i], dp[i - wt[j]] + val[j]) 
    print (dp) 
    return dp[W] 
  
# Driver program 
W = 10
val = [9,14,16,30] 
wt = [2,3,4,6] 
n = len(val) 
  
print(unboundedKnapsack(W, n, val, wt))
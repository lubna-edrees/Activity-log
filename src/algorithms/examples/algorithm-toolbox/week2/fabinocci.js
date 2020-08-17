function fibonacci_fast(n) {
    if( n==0){ return 0 }
    if( n==1 ){ return 1 }
    let nn = [];
    
    for (let i=0; i<=n; i++ ){
           if( i==0){ nn.push(0); continue; }
          if( i==1){ nn.push(1); continue; }
          else{ nn.push( nn[i-1] + nn[i-2] )}
         }

      return nn[nn.length-1] ;
}

//  console.log(getFibonacci(1))
//  console.log(getFibonacci(0))
//  console.log(getFibonacci(10))
//  console.log(getFibonacci(100))
//  console.log(getFibonacci(300))
//  console.log(getFibonacci(4000))
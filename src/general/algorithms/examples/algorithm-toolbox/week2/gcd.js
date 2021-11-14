// 
/* cost: a * b operations */
gcd = (a, b) =>{
    if(b == 0) { return a; }
    return gcd( b, a%b ) 
  }

//   var gcd = function(a, b) {
//     if (!b) {
//       return a;
//     }
  
//     return gcd(b, a % b);
//   }

console.log(gcd(234, 141));
console.log(gcd(23464646, 564865141));
console.log(gcd(234466, 5646141));
console.log(gcd(2345, 2141));
console.log(gcd(23, 11));
console.log(gcd(4, 2));
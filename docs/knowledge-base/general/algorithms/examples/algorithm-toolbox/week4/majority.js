const majorityElement = (array, max) => {
    let mm = Math.floor(max/2);
    let counts = {};
    //let m = Math.max(...A);
   // console.log('m', m);
    for(let i=0; i<=max; i++){
        counts[i]=0;
    }
    //console.log(counts)
    for (let i=0; i<A.length; i++){
     //   if(Object.keys(counts).includes(A[i].toString())){
        // if(A.includes(Number(counts[i.toString()]))){
            counts[A[i]]++;
          //  console.log('obj inside', counts);
        //}
    }
    
    let countsArray = Object.keys(counts); //.every(e => e.toString());
   // console.log('counts Array', countsArray);
   // console.log('count obj', counts)
    
    //let result =[];
    
    for(let i=0; i<countsArray.length; i++){
        if(counts[i] > mm){
            let n = counts[i];
            //console.log('n', n)
            // for(let j=0; j<n; j++){
            //     result.push(Number(countsArray[i]));
            // }
            return 1;
        }
    }

    return 0;

    // let res = result.filter((e,i) => i >= mm );

    // if (res.length == 0) return 'No majority';
    // return res;
};

///A =[512766168 ,717383758 ,5 ,126144732, 5 ,573799007 ,5 ,5 ,5 ,405079772]
//A = [2 ,3 ,9 ,2 ,2]
//A = [1, 2, 3 ,4 ,5]
//A = [1, 1, 1, 4 , 5];
//A= [2 ,3 ,9 ,2 ,2];

//m = 5;
//m=10

let m = Math.floor(Math.random() * Math.floor(10));
let A = Array.from({length: m}, () => Math.floor(Math.random() * 100000));


// for (let i=0; i<= m; i++){
// A[i]= Math.floor( Math.random * 100 ) 
// }

console.log(m)
console.log (A);
console.log (majorityElement(A, m));
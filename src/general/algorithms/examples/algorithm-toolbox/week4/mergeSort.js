
/**
 * psudo code: https://i.imgur.com/rGmTGr4.png
*/
function mergeSort(A){
    if(A.length < 2){ return A; }
    let m = Math.floor(A.length/2);
     
    let BB = mergeSort(A.slice(0,m));
    let CC = mergeSort(A.slice(m, A.length));

    let AA = merge(BB,CC);
    return AA;
}

/**
 * psuedo code: https://i.imgur.com/xlKWjXX.png
*/
function merge(B, C){
    let D =[];
    while( B.length && C.length ){
        if(B[0] <= C[0]){  D.push(B[0]); B.splice(0,1); }
       else { D.push(C.shift()); }
    }

    while(B.length){ D.push(B.shift()); }
    while(C.length){ D.push(C.shift()); }

    return D;
}

// tests
let A = [4,3,2,1];
let AA = [4,3,2,1, 0, 88, 414, -3, -616, 10078, 996, 7897, 402, 789, 20];
console.log(mergeSort2(A));
console.log(mergeSort2(AA));
function selectionSort(A){
    let n = A.length;
    for(let i=0; i<A.length; i++){
        let minIndex = i;
        for(let j= i+1; j<A.length; j++){
            if(A[j] < A[minIndex] ){ minIndex =j;}
            if(minIndex !== i){
                let c = A[minIndex];
                swap(A, A[i], c);
                // A[0,i] is now sorted.
            }
        }
    }
    return A;
}

function swap(A, B, C){
    let c = A.indexOf(C);
    let b = A.indexOf(B);
    let temp = B;
    A[b] = C;
    A[c] = temp;
}

//tests
let A = [4,3,2,1, 0, 88, 414, -3, -616, 10078, 996, 7897, 402, 789, 20];
console.log(selectionSort(A));
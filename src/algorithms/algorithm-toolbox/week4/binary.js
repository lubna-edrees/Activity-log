const binarySearch = (array, value) => {
    let min = 0;
    let max = array.length - 1;
    //let med = Math.floor((min + max)/2);
    var res = doBinary(array, min, max, value);
    console.log('res',res)
    return res;
};



// const binarySearch = (array = [], value) => {
//     const midIndex = Math.floor(array.length / 2);
//     const midValue = array[midIndex];

//     if (value === midValue) return midIndex;
//     else if (array.length >= 1 && value < midValue)
//         return binarySearch(array.slice(0, midIndex), value);
//     else if (array.length >= 1 && value > midValue)
//         return binarySearch(array.slice(midIndex + 1, array.length), value);
//     else return -1;
// };



// function doBinary(arr, min, max, key) {
// let n = arr.length;
//     // let diff = max - min;
//     while (max >= min) {
//         let med;
//         if(arr%2==0){ med = Math.floor(((min + max)/2)-1) }
//         else med = Math.floor(((min + max+ 1)/2))
//         //let med = Math.floor((min + max) / 2);
//         console.log('med', med, 'key', key, 'arr', arr)

//         if (arr[med] == key) {
//             console.log('med before return', med);
//             return res = med;
//         }

//         else if (arr[med] < key) {
//             min = med + 1;
//             // max = arr.length;
//             //   doBinary(arr, min, max, key);
//         }

//         else {
//             // min = 0;
//             max = med - 1;
//             // doBinary(arr, min, max, key);
//       }
//     }
//     return -1;
// }


function doBinary(arr, min, max, key) {
    // if (min === 0 || max === 0){ med = 0}
    //if(max < min){ return -1 ; }
    med = Math.floor((min + max) / 2);
    let diff = max - min;
    console.log('med', med, 'key', key, 'arr', arr)
    med = Math.floor((min + max) / 2);
    if (arr[med] == key) {
         console.log('med before return', med);
          return  med;
         }
    
    else if (diff > 1 && arr[med] < key) {
        min = med + 1;
         max = arr.length-1;
        return doBinary(arr, min, max, key);
    }
    else if (diff > 1 && arr[med] > key) {
        min = 0;
        max = med - 1;
        return doBinary(arr, min, max, key);

    }
    else if (diff == 1 ) { 
        if (arr[max] == key) return max;
        else if(arr[min] == key) return min;
        else return -1;
     }
    else return -1;
console.log('here');
// return med;

}



//let A = [1, 2 , 3, 4, 5];
//let keys = [1, 2, 3, 4, 5]
 let A = [1, 5, 8, 12, 13]
let keys = [8, 1, 23, 1, 11]
//let keys = [4]
let result = [];
async function printResult() {

    function loopThrough() {
        for (let i=0; i<keys.length; i++) {
            let x = binarySearch(A, keys[i]);
            result.push(x);
            console.log('x', x)
        }
    }

    await loopThrough();

    console.log('result', result)
}

printResult();
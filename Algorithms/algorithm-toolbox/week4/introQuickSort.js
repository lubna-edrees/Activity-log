const IntroquickSort = array => {
    if (array.length < 2) return array;

    //comparing povits
    const pivot1 = array[0];
    const pivot2 = array[Math.floor((array.length - 1)/2)];
    const pivot3 = array[array.length - 1];

    //chosen povit
    let pivot = Math.min(pivot1, pivot2, pivot3)
    let pivotIndex = array.indexOf(pivot);
    const left = [],
        right = [];

    for (let i = 0; i < array.length; i++) {
        if(i === pivotIndex) continue;
        else if (array[i] < pivot) left.push(array[i]);
        else right.push(array[i]);
    }

    return [...IntroquickSort(left), pivot, ...IntroquickSort(right)];
};


//tests
let A = [4,3,2,1, 0, 88, 414, -3, -616, 10078, 996, 7897, 402, 789, 20];
console.log(IntroquickSort(A));
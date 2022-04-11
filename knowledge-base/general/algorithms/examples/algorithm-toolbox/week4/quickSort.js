const quickSort = array => {
    if (array.length < 2) return array;

    //const pivot = array[array.length - 1];
    const pivot = array[0];
    const left = [],
        right = [];

    //for (let i = 0; i < array.length - 1; i++) {
        for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) left.push(array[i]);
        else right.push(array[i]);
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
};

//tests
let A = [4,3,2,1, 0, 88, 414, -3, -616, 10078, 996, 7897, 402, 789, 20];
console.log(quickSort(A));
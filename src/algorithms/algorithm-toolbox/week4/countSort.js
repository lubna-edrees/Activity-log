/**
 * psuedo code: https://i.imgur.com/Nqb0cCg.png
 * Now, works only for postivie ints.
*/
function countSort(A){
    let counts = {};
    //let s = Math.min(...A);
    let m = Math.max(...A);
   // console.log('m', m);
    for(let i=0; i<=m; i++){
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
    
    let result =[];
    
    for(let i=0; i<countsArray.length; i++){
        if(counts[i] > 0){
            let n = counts[i];
            //console.log('n', n)
            for(let j=0; j<n; j++){
                result.push(Number(countsArray[i]));
            }
        }
    }

    return result;
}

let A = [4,4,4,3,3,2,1];

console.log(countSort(A));


/*====================== Another solution ======================*/

const countingSort = (array, max) => {
	const counts = new Array(max + 1);
	counts.fill(0);
	array.forEach(value => counts[value]++);

	const result = [];
	let resultIndex = 0;

	counts.forEach((count, index) => {
		for (let i = 0; i < count; i++) {
			result[resultIndex] = index;
			resultIndex++;
		}
	});

	return result;
};
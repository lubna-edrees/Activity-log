/**
 * 
 * Algorithms: Find the Symmetric Difference
Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.

Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). For every additional symmetric difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}). The resulting array must contain only unique values (no duplicates).


 * 
 */

 /**
  * optimization: git ride of the 2 nested loops in the `symfor2` function by using sets.
  * 
  * cost N^2
  */

 function symfor2(arr1, arr2){
    let arr3 =[];
    let set1 = new Set(arr1);
    let set2 = new Set(arr2);
    
    let combinedArray = [...set1, ...set2];
    
    let countObj ={};
    
    for(let el of combinedArray){
      if(el in countObj){
        countObj[el]++;
      }else{
        countObj[el] =1;
      }
    }
    
    
    for (let ele in countObj ){
      if(countObj[ele] === 1 ){
        arr3.push(Number(ele));
      }
    }
    
    return arr3;
    }
    
    function sym() {
      let argss= [...arguments];
       let arr3= argss[0];
    for(let i=1; i<argss.length; i++){
      arr3 = symfor2(arr3, argss[i])
    }
        console.log('arr3', arr3)
      return arr3.sort((a,b) => a-b);
    }


    //tests
    sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]);
    
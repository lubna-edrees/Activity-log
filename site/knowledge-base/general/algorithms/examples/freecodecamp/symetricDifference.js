/**
 * 
 * Algorithms: Find the Symmetric Difference
Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.

Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). For every additional symmetric difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}). The resulting array must contain only unique values (no duplicates).


 * 
 */

/**
 * 
 * cost N^3
 */

 /**
  * 
  * @param array arr1 
  * @param array arr2
  * @return array - symmetric difference of 2 arrays  
  */

function symfor2(arr1, arr2){
    let arr3 =[];
    arr1.map((e)=>{
        if(arr1.includes(e) && !arr2.includes(e) ){
       if (!arr3.includes(e)){ arr3.push(e)}
        }
      })
      arr2.map(e =>{
           if(!arr1.includes(e) && arr2.includes(e) ){
       if (!arr3.includes(e)){ arr3.push(e) }
        }
        })
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
    
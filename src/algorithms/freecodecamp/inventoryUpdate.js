/**
 * 
 * Algorithms: Inventory Update
Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. Update the current existing inventory item quantities (in arr1). If an item cannot be found, add the new item and quantity into the inventory array. The returned inventory array should be in alphabetical order by item.
*
 */

function updateInventory(arr1, arr2) {
    //console.log(arr2)
    let arr3 = [...arr1];
    let temp_arr1 = [];
    arr1.map((e) => { temp_arr1.push(e[1]) });
    //console.log(temp_arr1)
    let temp_arr2 = [];
    arr2.map((e) => { temp_arr2.push(e[1]) });
    for (let i = 0; i < arr2.length; i++) {
        let e = arr2[i];
        //    console.log(e);
        if (!temp_arr1.includes(e[1])) {
            arr3.push([e[0], e[1]]);
        }
        let temp_arr3 = [];
        arr3.map((e) => { temp_arr3.push(e[1]) });
        let c = temp_arr1.indexOf(e[1]);
        let d = arr2.indexOf(e);
        let n = temp_arr3.indexOf(e[1])
        // console.log(c);
        // console.log(d)
        // console.log(n)
        if (c >= 0) {
            arr3[n][0] = arr2[d][0] + arr1[c][0]
        }

    }


    arr3 = arr3.sort((a, b) => {
        return a[1].localeCompare(b[1]);
    });
    console.log(arr3)
    return arr3;
}

/**
 * tests
 */
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);

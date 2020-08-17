
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
    const [itemsCount, knapsackCapacity] = line.toString().split(' ').map(Number);
    const values = [];
    const weights = [];
    let count = 0;

    rl.on('line', line => {
        const [v, w] = readLine(line);
        values.push(v);
        weights.push(w);

        if (++count >= itemsCount) {
            console.log(max(itemsCount, knapsackCapacity, values, weights));
            process.exit();
        }
    });
});

function readLine(line) {
    const v = parseInt(line.toString().split(' ')[0], 10);
    const w = parseInt(line.toString().split(' ')[1], 10);

    return [v, w];
}

function max(count, capacity, values, weights) {
    // write your code here
    console.log('count', count);
    console.log('capacitiy', capacity);
    console.log('values', values);
    console.log(' weughts ', weights);

    if (capacity == 0) { return 0; }

    let valuePerWeight = [];

    for (let i = 0; i < values.length; i++) {
        let vn = values[i];
        let wn = weights[i];
        valuePerWeight.push(vn / wn);
    }

    console.log('values per weight', valuePerWeight);



    // sorting weights with corresponding value
    let weights_vpw_map = sort_coresponding_elemnts(valuePerWeight, weights);

    console.log('weights vpw map sorted', weights_vpw_map);

    let our_capacity = 0;
    let ans = 0;
    // while( our_capacity < capacity ){
    for (entry of weights_vpw_map) {
        console.log(entry);
        let entry_value = entry[0];
        let entry_weight = entry[1];

        let remained_capacity = capacity - our_capacity;

        if (count == 1) {
           // if( entry_weight >= capacity ){
               // console.log('here')
                let splitted_weight = entry_weight - remained_capacity -capacity;
                our_capacity = our_capacity + splitted_weight;
                remained_capacity = capacity - our_capacity;
                ans = ans + (entry_value * splitted_weight);
                entry_weight = entry_weight - splitted_weight;
                break;
                
          //  }
           

        }

        if (remained_capacity > 0 && our_capacity + entry_weight <= capacity) {
            our_capacity = our_capacity + entry_weight;
            remained_capacity = capacity - our_capacity;
            ans = ans + (entry_value * entry_weight);
            entry_weight = 0;
        }

        if (remained_capacity > 0 && our_capacity < capacity && entry_weight > 0) {
            let splitted_weight = entry_weight - remained_capacity;
            our_capacity = our_capacity + splitted_weight;
            remained_capacity = capacity - our_capacity;
            ans = ans + (entry_value * splitted_weight);
            entry_weight = entry_weight - splitted_weight;

        }

        if (our_capacity == capacity || remained_capacity == 0) break;
    }


    //  }

    return ans;

    process.exit();

}


function sort_coresponding_elemnts(arr1, arr2) {
    let temp_map = new Map;
    for (let i = 0; i < arr1.length; i++) {
        temp_map.set(arr1[i], arr2[i]);
        //temp_map[arr1[i]] = arr2[i];
    }

    //return temp_map;
    // console.log('temp map', temp_map);
    //console.log('temp_map.keys()', temp_map.keys());

    var tupleArray = [];
    for (var key of temp_map.keys()) tupleArray.push([key, temp_map.get(key)]);
    //console.log( 'tuplar array before sorting' , tupleArray)
    tupleArray.sort(function (a, b) {
        return b[0] - a[0]
    });
    //console.log( 'tuplar array after sorting' , tupleArray)
    var sortedMap = new Map;
    tupleArray.forEach(function (el) {
        sortedMap.set(el[0], el[1]);
    });
    return sortedMap

}

module.exports = max;

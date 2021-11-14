const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const num = Number(line);

    rl.once('line', line => {
        const arr = line.toString().split(' ').slice(0).map(Number);
        let result;

        result = majorityElement(arr, num);


        process.stdout.write(result.toString());


        process.stdout.write('\n');
        process.exit();
    })
});


const majorityElement = (A, max) => {
    let mm = Math.floor(max/2);
    //console.log('mm',mm)
    //console.log('A', A)
    let counts = {};
    for(let i=0; i<=max; i++){
        counts[i.toString()]=0;
    }
    for (let i=0; i<A.length; i++){
    
            counts[A[i]]++;
     
    }
    
    let countsArray = Object.keys(counts); //.every(e => e.toString());
  
    //console.log(counts)

    for(let i=0; i<countsArray.length; i++){
        if(counts[i] > mm){
            //let n = counts[i];
            //console.log('n', n)
            // for(let j=0; j<n; j++){
            //     result.push(Number(countsArray[i]));
            // }
            return 1;
        }
    }

    return 0;

};
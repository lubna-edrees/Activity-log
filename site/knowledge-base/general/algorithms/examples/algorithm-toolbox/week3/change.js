/**
 *  Money Change
 * 
 Problem Introduction
*
*
In this problem, you will design and implement an elementary greedy algorithm
used by cashiers all over the world millions of times per day.
*
*
Problem Description
*
*
Task. The goal in this problem is to find the minimum number of coins needed to change the input value
(an integer) into coins with denominations 1, 5, and 10.
Input Format. The input consists of a single integer 𝑚.
Constraints. 1 ≤ 𝑚 ≤ 103
*
*
Output Format. Output the minimum number of coins with denominations 1, 5, 10 that changes 𝑚.
*
*
Sample 1.
*
*
Input:
2
Output:
2
2 = 1 + 1.
*
*
*
Sample 2.
Input:
28
Output:
6
28 = 10 + 10 + 5 + 1 + 1 + 1
 * 
 * 
 * 
 */




function get_change(m) {
    let arr = [10, 5, 1];
    let num = 0;
    let temp = parseInt(m);



    while (temp > 0) {

       

        if (temp % 10 === 0) {
            temp = temp - 10;
            num++;
     
        }

        else if (temp % 5 === 0) {
            temp = temp - 5;
            num++;
        
        }

        else {
            temp = temp - 1;
            num++;
        
        }

    }

    if (temp == 0) {
        return num;
    }

}

// Get process.stdin as the standard input object.
var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding('utf-8');


// When user input data and click enter key.
standard_input.on('data', function (data) {

    console.log(get_change(data));

    process.exit();

});

 
# Activity-log
daily report of where I am.

You might think of this Repo as a container of `randomley distributed unrelated pices of code`, but that's not true.

Think of how many times you take notes for some topic while you are learning it for the first time, and you needed this notes years later, simply you are not going to find them and you have to study it again. 

but for me, since I've collected those notes and puted them in one place , I can easly and quiqly get back to any nite when needed.

for `you` to make profit of this Repo, use `Ctrl + F` and search for what's in your mind, you might find some important notes about it.  

## Hot Topics
<div style="text-align:center"><img src="https://i.imgur.com/1E3jAlA.png" /></div>

## packages I dealed with
- `configStore`: store your configurations in one object easly.
- `colors`: add colors to the console.
- `inquirer`: interact with users through your cli.
- `BigNumber.js`: good library to deal with expotential numbers `n + e` as a normal big integers.
- `dg-url`: handy functions to deal with urls.
- `cheerio.io`: jquery in the server.
- `axios`: http requests library.
- `phantom`: http library allows cors.

## commands:
- `npm link`: install the cli that  you are working on it globally on your machine.

## notes for the record:
- to grap key from user command in your cli, use `proccess.argv` witch gives you an `array` and your first arg is at index `2`.
- useful number formatter (espesially for currency)


```javascript

             /**
              * initializing currency formatter
              */
             const formatter = Intl.NumberFormat('en-US', {
                 style: 'currency',
                 currency: 'GBP'
             })

 ```
 
 - if you use `string.split(/(regex)/)` will split the str keeping the regex match element.
## Wed 15-April-2020
- `cherrio.io` especially `.load()`
- `cross-origin-resourses` problem.
- social media tags:
```html
<meta property="og:title" content="#">
<meta property="og:description" content="#">
<meta property="og:image" content="#">
<meta property="og:url" content="#">

```
 
## Tue 14-Aprill-2020
- started working for `CodeYourFuture`
- started by reviewing students coding homeworks.
- made some changes for `hexltd.co` according to client preferrences.

## Mon 13-April-2020
- fixed bug in `dg-url`
- attended `Founders and Coders` session about `DOM manupualtion`
- Update my `linkedIn` account
- choosen this photo as my cover:
![](https://dl.dropbox.com/s/7whlmpqnfmvzacf/You%20Are%20In%20The%20Right%20Place%20%281%29.png?dl=0)
## Sun 12-April-2020
- implemented `dg.anchor()` witch a function to automatically fill up anchor tag attributes by extracting this data from the url itself.
- `regular expressions` again, to handle urls:

``` javascript
let regex = /^(?<start>https|http)?(?<colon_slashes>:\/\/)?(?<three_w>www.)?(?<main>[\w\-\_\:]+)(?<dot_com>\.[\w]+)\/*(?<text1>[\w\-\_\#\?\&\=]*)\/*(?<text2>[\w\-\_\#\?\&\=]*)\/*(?<text3>[\w\-\_\#\?\&\=]*)/;

```

## Sat 11-April-2020
-  `Fibonacci Numbers`: sequence of numbers `0, 1 , n1, n2= n1+1, n3=n2+n1, n4=n3+n2 .....`
- simple alograithm to calculate `Fibonacci Numbers`, only works for small n.
```javascript
 function getFibonacci(n) {
      if( n==0){ return '0' }
      if( n==1 ){ return '1' }
      let nn = [];
      
      for (let i=0; i<=n; i++ ){
             if( i==0){ nn.push(0); continue; }
            if( i==1){ nn.push(1); continue; }
            else{ nn.push( nn[i-1] + nn[i-2] )}
           }

        return `${ nn[nn.length-1]  }`;
}
```
- calculating `Big-O` costs for the algorithm above:

``` javascript
if statment => O(1)
if statment => O(1)
create an array of n elemnts => O(n)
running for loop => O(n)
operations inside  the for loop => 3 * O(n)
return statment => O(1)
__________________
sum cost = O(1) + O(1) + O(n) +  3 * O(n) * O(n) + O(1) =>  O(n^2) 
```
- efficent algorithm  to calculate `GCD greatest commom diviser` :
```javascript
/* cost: a * b operations */
gcd = (a, b) =>{
    if(b == 0) { return a; }
    return gcd( b, a%b ) 
  }

```
- algorithm for making a good algorithm:
  - always start with a `naiive algorithm` and make it works, normally slow.
  - next find a standard toolbox to help you:
    - greedy algorithm.
    - divide and conqur.
    - dynamic programming.
  - optimize your algorithm.
  
- more on algorithms here: https://github.com/aa947/data-structures-and-algorithms/tree/master/algorithm-toolbox
- `greedy algorithm`: 
```
1- make the first move.
2- test if it's a safe move or start from the begining
3- test if that move is optimized or optimize it the most
4- you get a sub-problem handle it with the same approach.
```

 
## Fri 10-April-2020
- 5 katas tpday.
- use this to pass variables to the regex.


```javascript 
let viraible_passes_to_regex = new RegExp ( `string contains a ${ var }` , 'gi' ); 
```

- `Arrays`:
  - contigous area of memory. 
  - consist of equal-size elment.
  - indexed by contigous integers.
  - constant time to access any element.
  - constant time to add/remove at the end `o(1)`.
  - linear time to add/remove at arbitary location `o(n)`.
  
- `linked-lists`: 
  - add/remove to the begging is cheap `o(1)`.
  - if there is no `tail pointer` => add/remove to end is expensive `o(n)`.
  - if `tail pointer exists` => add to end is cheap `o(1)`, remove from end still `o(n)`.
 
## Thur 9-April-2020
- generated and designed automated emails for `hexltd.co`.
- connected an e-commerce website to `PayPal API` and test it and publish it live.
- started preparing for connectint e-commerce website to `GoCardless API`.

## Wed 8-April-2020
- revised layout for `hexltd.co`, used a lot of `media queries`.
- check speed for `hexltd.co`, I enabled cach, compressed images, wiped a lot of unnesseray thing, `page loading time` reduced from `25s` to `7.2s`. still high, but it's a big website.
 
## Tue 7-April-2020 
- attended an introductory session on how to volunteer with `Code Your Future`.
- Re-checked my `LinkedIn` account, here: https://www.linkedin.com/in/ahmad-ali-07383164194/
- attended `Founders And Coders` session today.
- done a `codewars Kata` :  Replacement, revised: `arr.pop()` and `arr.unshift()` returns the single Elemnt that they worked on, My solutions: https://www.codewars.com/kata/598d89971928a085c000001a/solutions/javascript/me/best_practice 
- done a `codewars Kata` : Break camelCase, my sloution: https://www.codewars.com/kata/5208f99aee097e6552000148/solutions/javascript/me/best_practice

## Mon 6-April-2020
- made a `cli interface` following Traversy media tuorial.
- javascript code documentation.
- documented `coindex`, a cli for checking crypto currency prices, here: https://github.com/aa947/coindex-cli/tree/documented-coindex

## sun 5-April-2020
- `facebook auth` to connect to my website.
- `google auth` to connect to my website.
- `twitter API` does not provide effecient way to log in with, because it will not give the `user Email` untill they choose that from their twitter account settings before hand.
- `github actions`.
- delevered https://hexltd.co to the client.
- made a 3 videos walking him throw every part of dealing the website and managing orders.


## sat 4-April-2020
- `security`.
- cleaned a `wordpress` website full of malwares.
- dealed with `apatche` server. especially `.htaccess` files.
- migrated a full wordpress site archive to `secure http`.
- learned `ssh` command shell, and connected it to a website.


## fri 3-april-2020
- `typescript`.
- learned a bit of `typescript data structers` and `type assertion`.
- learned a bit about `grunt`.
- found out about `Getting Hired` course by `theodinproject` here: https://www.theodinproject.com/courses/getting-hired .

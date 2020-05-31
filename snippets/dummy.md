
## notes for the record:


- Best resource for Grunt : https://www.coursera.org/learn/bootstrap-4/supplement/SIHkS/exercise-instructions-grunt-part-2



## Thur-30-April-2020 -> Fir-8-May-2020

- algorhims: https://github.com/ahmad-ali14/data-structures-and-algorithms/tree/master/algorithm-toolbox
  



## Wed-29-April-2020



## Tue-28-April-2020

- more algorithms.








## Mon-27_April-2020





## Sun-26-April-2020



## Sat-25-April-2020:



## Fri-24-April-2020



## Thur-23-April-2020



## Wed-22-April-2020


## Tue 21-April-2020

- UI frameworks.
- bootsrap

 


## Mon 20-April-2020

- webinar: business communication by Refugee council- London.
- playing with front end simple portfolio.

## sun 19-April-2020

- cyf class: 'debugging'.

## Sat 18-April-2020

- added blog functionality to my portfolio.
- more active on LinkedIn.
- continued with oddin project on how to get hired.

## Fri 17-April-2020

- algorithms again.
- `eventEmitters` in node.js.
- sloved the
## Thur 16-April-2020

- performance for https://ahmad-ali.co.uk/ fixed:
  ![](https://dl.dropbox.com/s/b7ejapt58wv0epe/chrome_iYqs0WCnpg.png?dl=0)
- `sitemap` for `hexltd.co` and `ahmad-ali.co.uk`

## Wed 15-April-2020

- `cherrio.io` especially `.load()`
- `cross-origin-resourses` problem.



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

## Sat 11-April-2020

- `Fibonacci Numbers`: sequence of numbers `0, 1 , n1, n2= n1+1, n3=n2+n1, n4=n3+n2 .....`
- simple alograithm to calculate `Fibonacci Numbers`, only works for small n.

```javascript
function getFibonacci(n) {
  if (n == 0) {
    return "0";
  }
  if (n == 1) {
    return "1";
  }
  let nn = [];

  for (let i = 0; i <= n; i++) {
    if (i == 0) {
      nn.push(0);
      continue;
    }
    if (i == 1) {
      nn.push(1);
      continue;
    } else {
      nn.push(nn[i - 1] + nn[i - 2]);
    }
  }

  return `${nn[nn.length - 1]}`;
}
```

- calculating `Big-O` costs for the algorithm above:

```javascript
if statment => O(1)
if statment => O(1)
create an array of n elemnts => O(n)
running for loop => O(n)
operations inside  the for loop => 3 * O(n)
return statment => O(1)
__________________
sum cost = O(1) + O(1) + O(n) +  3 * O(n) * O(n) + O(1) =>  O(n^2)
```

- efficent algorithm to calculate `GCD greatest commom diviser` :

```javascript
/* cost: a * b operations */
gcd = (a, b) => {
  if (b == 0) {
    return a;
  }
  return gcd(b, a % b);
};
```


## Fri 10-April-2020

- 5 katas tpday.

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
- done a `codewars Kata` :
- 
- done a `codewars Kata` :

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
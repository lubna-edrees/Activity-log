# Activity-log
daily report of where I am

## Hot Topics
<div style="text-align:center"><img src="https://i.imgur.com/YvoyA3M.png" /></div>

## packages I dealed with
- `configStore`: store your configurations in one object easly.
- `colors`: add colors to the console.
- `inquirer`: interact with users through your cli.

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

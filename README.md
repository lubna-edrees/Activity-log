# Div Snippets

Reference for code snippets, shortcuts or notes I faced while working.

<div style="text-align:center; margin:auto; padding:auto;"><img style="margin:auto;" src="https://i.imgur.com/lRrDFLo.png" /></div>

## Index

- [Div Snippets](#div-snippets)
  - [Index](#index)
  - [packages Index](#packages-index)
  - [commands](#commands)
  - [Git](#git)
  - [APIs](#apis)
  - [General JS](#general-js)
  - [Functions](#functions)
  - [Objects](#objects)
  - [Arrays](#arrays)
  - [Strings](#strings)
  - [Numbers](#numbers)
  - [DOM](#dom)
  - [React](#react)
  - [Bootstrap](#bootstrap)
  - [CSS](#css)
  - [Algorithms](#algorithms)
  - [Meta](#meta)
  - [CLI](#cli)
  - [SEO](#seo)
  - [URLs](#urls)
  - [Grunt](#grunt)
  - [codeWars katas](#codewars-katas)
  - [Python](#python)
  - [Projects](#projects)
  - [General web development](#general-web-development)


## packages Index 

- `configStore`: store your configurations in one object easly.
- `colors`: add colors to the console.
- `inquirer`: interact with users through your cli.
- `BigNumber.js`: good library to deal with expotential numbers `n + e` as a normal big integers.
- `dg-url`: handy functions to deal with urls.
- `cheerio.io`: jquery in the server.
- `axios`: http requests library.
- `phantom`: http library allows cors.
- `react-chartjs-2`: displaying charts easily.
- `parallelshell` : execute commands in parallel.
- `onChange` : watch until files changes then triger a command or a task.
- `rimraf`: quickly clean a folder.
- `copyfiles`: quickly copy files between folders.
- `imagemin-cli`: quiqckly minimze images before deploy.
- `UglifyJS 3`: minimize js before deploy.
- `htmlmin` : minimze html before deploy.
- `usemin-cli`: combine those previous three `minimizors` into cli.
- `grunt-cli`: cli for grunt.
- `react-document-title`: change pages titles dynamically
- `react-helmet`: manage head meta tags.
- `ElGrapho`: nice data representaions.
- `NProgress.js`: slim progress bar.
- `loader`: js library has a lot of shortcuts.

## commands

- `npm link`: install the cli that you are working on it globally on your machine.

## Git

- list all branches : 
  
    ```js
      git branch -a  // list local and remote branches
      git branch -r  // list remote branches only
      git show-branch // list branches and their last commit

    ```
- unstage last commit:
  
    ```js
    git reset --soft HEAD~1 // unstage last commit and keep the changes
    git reset --hard HEAD~1 // unstage last commit and discard the changes ** careful
    ```
- loging info about repo status:
    ```js
    git log --oneline --graph // list all coments, line for every commit
    ```

## APIs

- code wars api: <https://www.codewars.com/api/v1/users/ahmad.ali>

## General JS

- js functions: `arr.find()` `Number()` `arr.every()` `str.startsWith()` `str.endsWith()`
- make a new promise:

```js
function sleep(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//get the result after a second
sleep(1000).then((data) => console.log("data", data));
```

- this and that in js, that refering to the main this in a scope, while you are going deeper into a scope `this` will refer to the deeper element, while `that` will refer to the parent:

```javascript
function MyConstructor(options) {
  let that = this;

  this.someprop = options.someprop || "defaultprop";

  document.addEventListener("click", (event) => {
    alert(that.someprop);
  });
}

new MyConstructor({
  someprop: "Hello World",
});
```
- get a human raedable date:
```js
let date = new Date().toLocalString()
```

- swap quickly:
  `js >>> x =1; y=240; >>> [x,y] = [y,x] >>> x, y 240 , 1`

## Functions

- get all arguments to a function if you don't know the number of args in advance:

```javascript
let argss = [...arguments]; //args will not work in all cases.
//OR
let argss = [].slice.call(arguments);
```

## Objects

- looping throgh an object: - `for (let el in Obj)` will loop over the keys. - `for (let el of bj)` will loop over the valuse ??

## Arrays

- create an array of length n filled with random numbers less than max:

```js
Array.from({ length: n }, () => Math.floor(Math.random() * max));
```

- use `localCompare()` to sort nested structures. example:

```javascript
arr3 = arr3.sort((a, b) => {
  return a[1].localeCompare(b[1]); //a and b are both arrays.
});
```

- `arr.pop()` and `arr.unshift()` returns the single Elemnt that they worked on.

## Strings

- if you use `string.split(/(regex)/)` will split the str keeping the regex match element.
- use this to pass variables to the regex.

```javascript
let viraible_passes_to_regex = new RegExp ( `string contains a ${ var }` , 'gi' );
```

## Numbers

- `e == 0` will return `true` if `e = flase` or any other falsey value, `e === 0` strict for 0 only.

- useful number formatter (espesially for currency)

```javascript
/**
 * initializing currency formatter
 */
const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GBP",
});
```

- find Min and Max elemnt of an Array:

```javascript
var numbers = [1, 2, 3, 4];
Math.max.apply(null, numbers); // 4
Math.min.apply(null, numbers); // 1

//OR

Math.max(...numbers); // 4
Math.min(...numbers); // 1
```

- generating random number between 0 and max:

```javascript
Math.floor(Math.random() * Math.floor(max));
```

## DOM

- `input.value` is alaways string, event if its type was number.
- client side temporary storage:

```js
window.x = value;   => window.x;
window.localStorage.x = value; => window.loacalStorage.x;
```

- add event listener to the key and use the key name intead of key code.

```javascript
window.addEventListener("key-event", (event) => {
  event.key == "arrowLeft"; //you can use key name instead of key code.
});
```

- make textarea with inly one line and disable multilines:
  `js <textarea rows="1" value ={ value } > { value } </textare> textarea.onChange = (e) => { let x = e.target.value; // deleting every new line signs from textarea value x.replace(/(\r\n|\n|\r)/gm, ""); }`

- sanitize third party code before inject it into your website using `innerHTML`

```javascript
var sanitizeHTML = function (str) {
  var temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
};
```

- quickly check existance of a file using vanilla js:

```javascript
function doesFileExist(urlToFile) {
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", urlToFile, false);
  xhr.send();

  if (xhr.status == "404") {
    return false;
  } else {
    return true;
  }
}
```

## React

- when you design your routes, make sure that front end routes differe from back-end routes. especially when using `react-node` app.

## Bootstrap

- bootsrap : `<i class="material-icons">Ahmad Ali</i>`
- div `.col-12 col-sm-6` : 12 on xs, 6 on sm and above.
- div `.col`: 12 on all.
- div `.col-sm-4`, div `.col-sm`, div `.col-sm-3` : from sm and above, first div 4, last div 3, middle div will take the rest.
- item `.d-sm-none d-md-block` : hide from sm and above, until find another `d` will show from md and above.
- class `order`: EX: `.sm-order-first` and `.sm-order-last`.
- center vertically: `.align-items-center` or `align-self-center`
- center Horizontally : `text-center` or `justify-content-center`
- navbar:
  - nav: `.navbar navbar-dark navbar-expand-sm bg-primary` : dark blue nav, stacked on sm.
  - nav > ul : `.navbar-nav mr-auto` : left side menu.
  - nav > ul > li : `.nav-item` :
  - nav > ul > li: `.active` : highlight current page link.
  - nav > ul > li > a : `.nav-link`
  - navbar menu button: `<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu-id" >`
  - menu button > span : `.navbar-toggler-icon`
  - surround ul menu with div: `<div class="collapse navbar-collapse" id="#menu-id">`
- push elemnt as much as you cant to the left (margin right): `.mr-auto`.
- push elemnt as much as you cant to the right (margin left): `.ml-auto`.

- bootsrap breadcrumbs:

```html
<ol class="col-12 breadcrumb">
  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
  <li class="breadcrumb-item active">About</li>
</ol>
```

- `.table-responsive`: should added in a wrapper div, not applied to the table directly.
- addtional html tags: `dl` `dt` `dd` `blockqoute` `embed` `object`
- bootsrap images: `.umg-fluid` `.rounded` `.rounded-corners` `.rounded-circle`
- Bootstrap javascript:
  - `tabs` and `pills` navigation.
    ![nav pills](https://i.imgur.com/Z8m15k0.png)
  - `accordion` navigation
  - `tooltips` `popover` `modals`
  - tooltips code: `data-toggle="tooltip" data-html="true" title="string" data-placement="bottom"`

## CSS

- prevent users from selecting text => `give the elemnt class of "noselect"`:

```css
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}
```

- make all elements(divs) third of the screen with same height:

```css
#wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.third {
  width: 33%;
}
```

- flexbox: boxes = inner divs, parrent = parrent div.

  - add `display:flex` to the parent => boxes will be same height ( EQUAL HEIGHT COLUMNS ).
  - add `display:flex` to parent + add `flex:1` to each box => boxes will take same width and height ( EQUAL HEIGHT + WIDTH COLUMNS ).
  - add `display:flex; justify-content: space-between;` to parent + add `width:32%; margin:1%;` to each box => EQUAL HEIGHT + WIDTH COLUMNS WITH MARGINS
  - add `flex-wrap: wrap` to the parent, with all previous code => EQUAL HEIGHT COLUMNS WITH MARGINS IN MULTIPLE ROWS

## Algorithms

- in practice: you start using `quick sort` algorithm, if you find it a bit slow: you stop and chamge to `heap sort`
- studying algorithms: [algorithms stuff](https://github.com/ahmad-ali14/Activity-log/blob/master/algorithms.md)
- knapsack problem here: <https://github.com/ahmad-ali14/data-structures-and-algorithms/blob/master/algorithm-toolbox/week3/maximum_loot.js>
- algorithm for making a good algorithm:

  - always start with a `naiive algorithm` and make it works, normally slow.
  - next find a standard toolbox to help you:
    - greedy algorithm.
    - divide and conqur.
    - dynamic programming.
  - optimize your algorithm.

- more on algorithms here: <https://github.com/aa947/data-structures-and-algorithms/tree/master/algorithm-toolbox>
- `greedy algorithm`:

```js
1- make the first move.
2- test if it's a safe move or start from the begining
3- test if that move is optimized or optimize it the most
4- you get a sub-problem handle it with the same approach.
```

## Meta

- check if your client using mobile or not:

```js
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
}
```

- dowonloading a file without user approval \*\*:

```js
function downloadFile(url, name) {
  const elink = document.createElement("a");
  elink.style.display = "none";
  elink.href = url;
  elink.download = name;
  document.body.appendChild(elink);
  elink.click();
  document.body.removeChild(elink);
}
```

## CLI

- to grap key from user command in your cli, use `proccess.argv` witch gives you an `array` and your first arg is at index `2`.
- tricky chain of functions : take user input, convert to string, split over ' ', extract numbers from str and assign them to item1 and item2.

```javascript
const [item1, item2] = input.toString().split(" ").map(Number);
```

## SEO

- retrieve how google caching your website, visit:

```js
cache: example.com;
```

- refresh yuor sitemap:

```js
https://www.google.com/ping?sitemap=`url to your siteMap`
```

- social media tags:

```html
<meta property="og:title" content="#" />
<meta property="og:description" content="#" />
<meta property="og:image" content="#" />
<meta property="og:url" content="#" />
<meta name="twitter:card" content="#" />
<meta name="twitter:image" content="#" />
<meta name="author" content="[Author name here]" />
```

## URLs

- chain of funtions to hanlde urls:

```js
function getExt(url) {
  if (url.includes("?")) {
    return getExt(url.split("?")[0]);
  }
  if (url.includes("#")) {
    return getExt(url.split("#")[0]);
  }

  //change those functions depends on the situation
  return url.trim().toLowerCase().split(".").pop();
}
```

- `regular expressions` again, to handle urls:

```javascript
let regex = /^(?<start>https|http)?(?<colon_slashes>:\/\/)?(?<three_w>www.)?(?<main>[\w\-\_\:]+)(?<dot_com>\.[\w]+)\/*(?<text1>[\w\-\_\#\?\&\=]*)\/*(?<text2>[\w\-\_\#\?\&\=]*)\/*(?<text3>[\w\-\_\#\?\&\=]*)/;
```

## Grunt

- `task runners` : simplfiy the pre-proccesses of deployment: `grunt` `gulp`.
- `grunt`: - `npm i grunt` - touch `Gruntfile.js` - npm i `grunt-contrib-less` `time-grunt` `jit-grunt` - npm i `grunt-contrib-watch` `grunt-browser-sync` - simple grunt file for watching and compieling `.less` files:

```javascript
module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require("time-grunt")(grunt);

  // Automatically load required Grunt tasks
  require("jit-grunt")(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    less: {
      css: {
        files: {
          "css/styles.css": "css/styles.less",
        },
      },
    },
    watch: {
      files: "css/*.less",
      tasks: ["less"],
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["css/*.css", "*.html", "js/*.js"],
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./",
          },
        },
      },
    },
  });

  grunt.registerTask("css", ["less"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
};
```

- Grunt:
  - at the `cmd`: `grunt less` => All `.less` files compiling into css.
  - at the `cmd`: `grunt` => watching and compiling automatically
  - for pre-deploy process we need: - `grunt-contrib-copy`: copying files to `dist` folder.
  - `grunt-contrib-clean`: clean `dist` each time before run `build`
  - `grunt-contrib-imagemin` : minimizing images. - `grunt-contrib-concat` : concat files. - `grunt-contrib-cssmin`: min css.
  - `grunt-contrib-htmlmin` : min html.
  - `grunt-contrib-uglify`: min js.
  - `grunt-filerev`. - `grunt-usemin`: use all min files.
- Best resource for Grunt : <https://www.coursera.org/learn/bootstrap-4/supplement/SIHkS/exercise-instructions-grunt-part-2>

## codeWars katas

- human readable time: <https://www.codewars.com/kata/52685f7382004e774f0001f7>
- valid parenthesis : <https://www.codewars.com/kata/52774a314c2333f0a7000688>
- moving zeros : <https://www.codewars.com/kata/52597aa56021e91c93000cb0/>
- Replacement: <https://www.codewars.com/kata/598d89971928a085c000001a/solutions/javascript/me/best_practice>
- Break camelCase: <https://www.codewars.com/kata/5208f99aee097e6552000148/solutions/javascript/me/best_practice>

## python:

- ternary operations:
    ```py
    state = "nice" if is_nice else "not nice"
    ```

## Projects

- slider from scratch: <https://peaceful-wozniak-036720.netlify.app/>
- Tv Show : <https://loving-benz-169884.netlify.app/>

## General web development

- competeions:

  - ACM ICPC.
  - Google code jam.
  - facebook hacker cup.
  - TopCoder. - code forces.
  - code chief - hacker rank.
  - sphere online judge
  - CSAcamedy

- found out about `Getting Hired` course by `theodinproject` here: <https://www.theodinproject.com/courses/getting-hired> .

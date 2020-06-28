# General JS

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
  let date = new Date().toLocalString();
  ```

- swap quickly:
  `js >>> x =1; y=240; >>> [x,y] = [y,x] >>> x, y 240 , 1`

- double exclamation points `!!` to get a boolean value from non-boolean:
  ```js
  let x = "abc"; // x is truthy;  !x = false; !!x = true;
  let y = null; // y is falsey; !y = true; !!y= false;
  ```

* `arr.pop()` and `arr.unshift()` returns the single Elemnt that they worked on.

### if you are returning a single element from an array, use `arr.find()` instead of `arr.filter()`

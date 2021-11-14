<!-- markdownlint-disable MD004 MD026 MD009 MD046 MD033 -->
# process.argv

- using this variable, we can grab the all vars and flags passed to the current process.
- in this example, we will create a function to grab a specific flag when passed to a process.
- when passed to a process means that you specify the flag when calling `node filename -flag flagValue`

```js
// grab content of a specific flag
const grab = (flag) => {
  let indexAfterFlag = process.argv.indexOf(flag) + 1; // calculate the indexAfterFlag
  return process.argv[indexAfterFlag];
};

// in our file
const myFlagContent1 = grab("-flag1"); // grab content of `-flag1`
const myFlagContent2 = grab("--flag2");
console.log(myFlagContent1, myFlagContent2);
```

## grab content of flags passed from terminal

- this function will grab the particular flag, no matter the order of the flags is.
  
 <br />

  ```js
    // grab content of a specific flag
    const grab = flag => {
      let indexAfterFlag = process.argv.indexOf(flag) +1;
      return process.argv[indexAfterFlag];
    }
  ```

  ```js
    // in our file
    const myFlagContent1 = grab('-flag1');
    const myFlagContent2 = grab('--flag2');
    console.log(myFlagContent1, myFlagContent2);

  ```
  
  ```js
    // in terminal
    >> node file.js -flag1 test --flag2 "test with spaces"
    /* logs */ test test with space
  ```


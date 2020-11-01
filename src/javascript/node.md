<!-- markdownlint-disable MD004 MD026 MD009 MD046 MD033 -->
# Node.js

## notes

- if your request is empty, check if you have body-parser
- `res.send()` can't send a number, you should respond with object `{ result: number }`

## post request with fetch

  ```javascript
       fetch("https://cyf-chat-server--ahmadali5.repl.co/messages/newMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMsg)
          })
  ```

## Get the full url of the route

  ```js
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  ```
  
## error anatomy

  ```js
      var err = { message: "error message", // accessed by err or err.message
                  stack: "c:\pth\to\file",
                  errors: { /* more error data */ }
                  }
  ```

## global object

global object contains functions, vars and objects we can use without requiring any external module. and it contains:

1. console: `console.log(any)`
2. __dirname: gives us the absolute path to the current directory.
3. __filename: gives us the absolute path to the current file.
4. [require() function](#require-function): import other modules.
5. [process object](#process-object): contains info about the current process.

## Require() function

1. node core modules.
2. our own modules.
3. third party modules

## path module

1. path.basename(): get the file name only. `path.basename(__filename)`

## process object

1. `process.pid` : get  current process id.
2. `process.versions.node`: get current node version.
3. get environment information and vars.
4. communicate with the terminal or parent processes through standard input and standard output.
5. [process.argv](/src/javascript/argv.md): get an array of all arguments passed to this process.
6. [process.stdout, process.stdin](/src/javascript/stdout.md): regulates interactions between terminal and our program.
7. exit the current process. `process.exit()`

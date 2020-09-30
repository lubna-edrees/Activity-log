# Node.js

## notes

* if your request is empty, check if you have body-parser 
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

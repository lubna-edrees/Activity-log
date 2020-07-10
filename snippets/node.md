# Node.js

## notes

* if your request is empty, check if you have body-parser 

## post request with fetch

```javascript
  fetch("https://cyf-chat-server--ahmadali5.repl.co/messages/newMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg)
      })
```


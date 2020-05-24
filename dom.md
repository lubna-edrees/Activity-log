# DOM

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

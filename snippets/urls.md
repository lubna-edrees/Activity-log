# URLs

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

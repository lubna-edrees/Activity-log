# Meta

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

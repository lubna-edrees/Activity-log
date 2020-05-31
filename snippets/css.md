# CSS

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

- for all text thing of those css rules as `mandatory`:
    ```css
      .form-header {
      font-weight: 300;
      font-size: 60px;
      line-height: 82px;
      letter-spacing: -0.5px;
      }
    ```

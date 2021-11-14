<!-- markdownlint-disable MD004 MD026 MD009 MD046 -->
# CSS

## Notes 

- 1 line layouts article: https://1linelayouts.glitch.me/

## No select

* prevent users from selecting text =&gt; `give the elemnt class of "noselect"`:

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

## one Third

* make all elements\(divs\) third of the screen with same height:

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

## Flexbox

* flexbox: boxes = inner divs, parrent = parrent div.
  * add `display:flex` to the parent =&gt; boxes will be same height \( EQUAL HEIGHT COLUMNS \).
  * add `display:flex` to parent + add `flex:1` to each box =&gt; boxes will take same width and height \( EQUAL HEIGHT + WIDTH COLUMNS \).
  * add `display:flex; justify-content: space-between;` to parent + add `width:32%; margin:1%;` to each box =&gt; EQUAL HEIGHT + WIDTH COLUMNS WITH MARGINS
  * add `flex-wrap: wrap` to the parent, with all previous code =&gt; EQUAL HEIGHT COLUMNS WITH MARGINS IN MULTIPLE ROWS
* for all text thing of those css rules as `mandatory`:

  ```css
      .form-header {
      font-weight: 300;
      font-size: 60px;
      line-height: 82px;
      letter-spacing: -0.5px;
      }
  ```

## super centered

- center everything with no problems, add this class to the parent element.

  ```css
    .parent{
      display: grid;
      place-items: center;
    }
  ```

## The Deconstructed Pancake 

- Elements beside each other on desktop, stacked on phone without meia queries
- `flex: 0 1 <baseWidth>`;

  ```css
    .parent {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .element {
      flex: 1 1 150px; /*  Stretching: */
      flex: 0 1 150px; /*  No stretching: */
      /* choose only one of this 2 rules */
    }
  ```

## sidebar width

- determain min and max width of sidebar.
- will not go down the min.
- the max is percentage, so it will change with the screen width

  ```css
    .parent {
      display: grid;
      grid-template-columns: minmax(150px, 25%) 1fr; 
      /* minmax(min sidebar, percentage of width when we are over min width) prerecentage of width for the main view */
    }
  ```
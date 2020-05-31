# Strings

- if you use `string.split(/(regex)/)` will split the str keeping the regex match element.
- use this to pass variables to the regex.

  ```javascript
  let viraible_passes_to_regex = new RegExp ( `string contains a ${ var }` , 'gi' );
  ```

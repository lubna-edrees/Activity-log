# IS?

## is string ?

```js
/**
 * Checks whether given value's type is a string
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isString(str) {
    return Object.prototype.toString.call(str) === "[object String]";
}
```

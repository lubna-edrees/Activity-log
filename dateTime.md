# Date and Time

- basic Date Time operations

  ```js
  // you can pass a date or duration (number) or empty to get the time now
  > x = new Date("2020-05-26T12:19:38.430Z")  //Tue May 26 2020 13:19:38 GMT+0100 (British Summer Time)
  > x.getFullYear() // 2020
  > x.getMonth() //4
  > const month = x.toLocaleString('default', { month: 'long' }); // May
  > let duration = ( new Date() ).getTime() - x.getTime(); //208426207 // distance between 2 dates
  > duration.toLocaleString() // "208,426,207"
  > duration.toString() //"208426207"
  > x.getDay() // 2 // second day on the week Tuesday
  > x.getDate() // 26 // day of the month
  
  ```

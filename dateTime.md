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
  
- display the distance between a date and the moment
    
    ```js
      const calculateDuration = (num) => {
      let durationDate = new Date(num);
      var epoch = new Date('1970-01-01 00:00:00-0600');
      var diff_years = durationDate.getYear() - epoch.getYear();
      var diff_month = durationDate.getMonth() - epoch.getMonth();
      var diff_days = durationDate.getDate() - epoch.getDate();

      let yy = diff_years ? diff_years + ' years ' : '';
      let mm = diff_month ? diff_month + ' months ' : '';
      let dd = diff_days ? diff_days + ' days ' : '';

      return `${yy} ${mm} ${dd}`
    }
    
    /*
    * if num = "208426207" => calculateDuration is `2 days`.
    */
    ```
    
 - usinu day.js:
  
    ```js
     // duration from now
     > dayjs(date).fromNow() // 2 years ago
     > dayjs(date).fromNow(true) // 2 years
     > dayjs(date).fromNow() // 2 days ago // time from now up to ${date}

     // duration between 2 dates 
     > dayjs(date1).from(date2) // 2 years ago
     > daysjs(date1).from(date2, true) // 2 years

     //format date
      > dayjs(date).format('DD MMMM YYYY') // 20 May 2020
    ```
    
## resources

- https://day.js.org/docs/en/display/display

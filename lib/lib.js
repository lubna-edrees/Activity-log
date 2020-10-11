const fs = require("fs");
const path = require("path");

/**
 *@param {* filePath relative path from root to the file } 
 * @param {*  fileName to save the log to } 
 * @param {* where url where the error happend } 
 * @param {*  msg error message }
 * @returns {* Void - save the error message with error stack to a text file.}
 */
export const saveError = (filePath, fileName, where, msg) => {
  msg = `${new Date()} \n  at:  ${where} \n  msg: ${msg} \n  full error: ${JSON.stringify(
    msg.errors
  )}  \n \n`;
  fs.appendFile(path.join(filePath, fileName), msg, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};


/**
 * 
 * @param {* period how manny days you you want to add or subtract
 * @param  {* sign use '+' for addition, '-' for subtraction 
 * @param  {* date optional: date to add/sub from, if not provided it will count from now  
 * @returns {* ISO Date - New Date after you add/sub the number of days .} 
 */

export const get_new_date_from_preiod = (period, sign, date = "") => {
  var d;
  date === "" ? (d = new Date()) : (d = new Date(date));
  if (sign === "-") {
    const temp = d.setDate(d.getDate() - period);
    return new Date(temp).toISOString();
  }
  if (sign === "+") {
    const temp = d.setDate(d.getDate() + period);

    return new Date(temp).toISOString();
  }
};

/**
 * @param  {* date1 date to calculate period from
 * @param {* date2 optional second date , if not provided it will consider today
 * @returns {* number of days between 2 dates .. 
 *                  .. if number is positive the date1 in the past
 *                  .. if number is negative the date1 in the future 
 *                  .. if number is 0, same day }
 */
export const get_days_number_from_date = (date1, date2 = "") => {
   var d2 = date2 === "" ? new Date() : new Date(date2);
   var d1 = new Date(date1);

   var Difference_In_Time = d2.getTime() - d1.getTime();
   var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

   return parseInt(Difference_In_Days);
};


function ExcelDateToJSDate(serialNum1) {
  const serialNum = String(serialNum1).split(".");
  let ogDate;
  let oneDay = 24 * 60 * 60 * 1000;
  let firstDate = new Date(1899, 11, 30);
  let days = serialNum[0];
  let ms = serialNum[1] * oneDay;
  ms = String(ms).substring(0, 8);

  firstDate.setDate(days);

  ogDate = new Date(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    firstDate.getDate(),
    0,
    0,
    0,
    ms
  );
  return ogDate;
  // var utc_days = Math.floor(serial - 25569);
  // var utc_value = utc_days * 86400;
  // var date_info = new Date(utc_value * 1000);

  // var fractional_day = serial - Math.floor(serial) + 0.0000001;

  // var total_seconds = Math.floor(86400 * fractional_day);

  // var seconds = total_seconds % 60;

  // total_seconds -= seconds;

  // var hours = Math.floor(total_seconds / (60 * 60));
  // var minutes = Math.floor(total_seconds / 60) % 60;

  // return new Date(
  //   date_info.getFullYear(),
  //   date_info.getMonth(),
  //   date_info.getDate(),
  //   hours,
  //   minutes,
  //   seconds
  // );
}

/*
// serialDate is whole number of days since Dec 30, 1899
// offsetUTC is -(24 - your timezone offset)
function SerialDateToJSDate(serialDate, offsetUTC) {
  return new Date(Date.UTC(0, 0, serialDate, offsetUTC));
}

-------------------------------
var exdate = 33970; // represents Jan 1, 1993
var e0date = new Date(0); // epoch "zero" date
var offset = e0date.getTimezoneOffset(); // tz offset in min

// calculate Excel xxx days later, with local tz offset
var jsdate = new Date(0, 0, exdate-1, 0, -offset, 0);

jsdate.toJSON() => '1993-01-01T00:00:00.000Z'

*/

export default ExcelDateToJSDate;

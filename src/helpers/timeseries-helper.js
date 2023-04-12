import { subHours, parseJSON } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

// Function to take array of [time, value] and return last [time, value]
const LastValueSet = (tsvArray) => {
  const arrayLen = tsvArray.length;
  if (!arrayLen) {
    console.log('LastValueSet - tsvArray has no length');
    return null;
  }
  let _obj = {};
  _obj['latest_time'] = tsvArray[arrayLen - 1][0];
  _obj['latest_value'] = tsvArray[arrayLen - 1][1];

  return _obj;
};

// Given a tsvArray
// Get the latest time/value
// Go back "h"oursBack" number of hours
// Get that time/value
// Compute value delta between the two

const LookBackValueSet = (tsvArray, hoursBack = 24) => {
  const arrayLen = tsvArray.length;
  if (!arrayLen) {
    console.log('LookBackValueSet - tsvArray has no length');
    return null;
  }

  let _obj = {};

  // Get the latest time/value array from tsvArray
  const lastRecord = LastValueSet(tsvArray);

  // Using the latest time, subtract hoursBack to determine lookBackDateTime
  const lookBackDateTime = subHours(
    parseJSON(lastRecord.latest_time),
    hoursBack
  );

  // Convert lookBackDateTime to UTC string for searching
  const lookBackDateTimeSearchString = formatInTimeZone(
    lookBackDateTime,
    'UTC',
    "yyyy-MM-dd'T'HH:mm:ssXXX"
  );

  // Find the index based on the lookBackDateTimeSearchString
  const lookBackDateTimeIndex = tsvArray.findIndex((arr) =>
    arr.includes(lookBackDateTimeSearchString)
  );

  // console.log(
  //   `-- returning lookBackDateTimeIndex of ${lookBackDateTimeIndex} --`
  // );

  _obj['latest_time'] = tsvArray[lookBackDateTimeIndex][0];
  _obj['latest_value'] = tsvArray[lookBackDateTimeIndex][1];

  return _obj;
};

export { LastValueSet, LookBackValueSet };

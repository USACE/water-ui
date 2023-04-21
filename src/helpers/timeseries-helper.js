import { subHours, parseJSON } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
// import { useConnect } from 'redux-bundler-hook';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';

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

  // console.log(`--Looking for ${lookBackDateTimeSearchString}`);

  // Find the index based on the lookBackDateTimeSearchString
  const lookBackDateTimeIndex = tsvArray.findIndex((arr) =>
    arr.includes(lookBackDateTimeSearchString)
  );

  if (lookBackDateTimeIndex === -1) {
    // no match found
    return null;
  }

  // console.log(
  //   `-- returning lookBackDateTimeIndex of ${lookBackDateTimeIndex} --`
  // );

  _obj['latest_time'] = tsvArray[lookBackDateTimeIndex][0];
  _obj['latest_value'] = tsvArray[lookBackDateTimeIndex][1];

  return _obj;
};

const ConvertUnitsToEn = (unitLookup, param, units, value) => {
  //const param = tsObj.base_parameter || tsObj.parameter;
  console.log(param);

  const unitConversion = unitLookup[param];

  console.log('--convertUnits()--');
  console.log(`got param of ${param} and unit of ${units}`);
  console.log(unitConversion);

  const newValue = value / unitConversion.factor;

  return { value: newValue, units: unitConversion.transform_to_unit };
};

const DeltaChange = ({ delta }, { title = '24 hour change' }) => {
  return delta ? (
    <>
      {delta > 0 ? (
        <ArrowUpIcon
          className="h-5 w-5 flex-shrink-0 self-center text-green-500"
          aria-hidden="true"
        />
      ) : (
        <ArrowDownIcon
          className="h-5 w-5 flex-shrink-0 self-center text-red-500"
          aria-hidden="true"
        />
      )}
      {/* <span className="">
                              {' '}
                              {p.delta24hr > 0
                                ? '24hr increase'
                                : '24hr decrease'}{' '}
                              of
                            </span> */}
      <span className="ml-1 cursor-default" aria-label={title} title={title}>
        {delta}
      </span>
    </>
  ) : null;
};

export { LastValueSet, LookBackValueSet, ConvertUnitsToEn, DeltaChange };

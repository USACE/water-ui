import { subHours, parseJSON } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
// import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';
import { mapObjectArrayByKey } from './misc-helpers';

// Function to take array of [time, value] and return last [time, value]
const LastValueSet = (tsvArray) => {
  const arrayLen = tsvArray?.length;
  if (!arrayLen) {
    console.log('LastValueSet - tsvArray has no length');
    return null;
  }
  let _obj = {};
  _obj['latest_time'] = tsvArray[arrayLen - 1][0];
  _obj['latest_value'] = tsvArray[arrayLen - 1][1];

  return _obj;
};

const TsvIndexFromTime = (tsvArray, timeString) => {
  // Find the index based on the lookBackDateTimeSearchString
  const lookBackDateTimeIndex = tsvArray?.findIndex((arr) =>
    arr.includes(timeString)
  );

  // can return -1 if not found
  return lookBackDateTimeIndex;
};

// Given a tsvArray
// Get the latest time/value
// Go back "h"oursBack" number of hours
// Get that time/value
// Compute value delta between the two

const LookBackValueSet = (tsvArray, hoursBack = 24) => {
  const arrayLen = tsvArray?.length;
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

  const lookBackDateTimeIndex = TsvIndexFromTime(
    tsvArray,
    lookBackDateTimeSearchString
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

const DeltaChange = ({ delta }, { title = '24 hour change' }) => {
  return delta ? (
    <>
      {delta > 0 ? (
        <HiArrowUp
          className='h-5 w-5 flex-shrink-0 self-center text-green-500'
          aria-hidden='true'
        />
      ) : (
        <HiArrowDown
          className='h-5 w-5 flex-shrink-0 self-center text-red-500'
          aria-hidden='true'
        />
      )}
      {/* <span className="">
                              {' '}
                              {p.delta24hr > 0
                                ? '24hr increase'
                                : '24hr decrease'}{' '}
                              of
                            </span> */}
      <span className='ml-1 cursor-default' aria-label={title} title={title}>
        {delta}
      </span>
    </>
  ) : null;
};

const GetTsidParts = (tsid) => {
  const tsidArray = tsid.split('.');
  return {
    location: tsidArray[0],
    parameter: tsidArray[1],
    parameter_type: tsidArray[2],
    interval: tsidArray[3],
    duration: tsidArray[4],
    version: tsidArray[5],
  };
};

const PrecipTotal = (paramObj, tsvArray) => {
  // const {
  //   providerTimeseriesValuesItemsObject: tsvObj,
  //   doProviderTimeseriesValuesFetchById,
  //   timeseriesDateRange: dateRange,
  // } = useConnect(
  //   'selectProviderTimeseriesValuesItemsObject',
  //   'doProviderTimeseriesValuesFetchById',
  //   'selectTimeseriesDateRange'
  // );

  const tsid = paramObj?.tsid;
  const pathParts = GetTsidParts(tsid);

  // if the timeseries is already cumuluative, return the 24hr delta
  if (pathParts?.parameter_type === 'Inst' && pathParts?.duration === '0') {
    return paramObj.delta24hr;
  }

  let precipTotal = 0;

  if (pathParts.parameter_type === 'Total') {
    // if no timeseries in state, make a request
    // if (tsvObj[tsid] === undefined) {
    //   doProviderTimeseriesValuesFetchById({
    //     timeseriesId: tsid,
    //     dateRange,
    //   });
    // }

    //const tsvArray = tsvObj[tsid]?.values;

    const lookBackRecord = LookBackValueSet(tsvArray, 24);
    const index = TsvIndexFromTime(tsvArray, lookBackRecord?.latest_time);
    // console.log('--lookbackRecord--');
    // console.log(lookBackRecord);
    // console.log('--index--');
    // console.log(index);

    // loop over all values from 24hrs back to end of array
    // sum the total
    for (let x = index; x < tsvArray?.length; x++) {
      //console.log(tsvArray[x]);
      precipTotal += parseFloat(tsvArray[x][1]);
    }
  }

  // console.log('--precipTotal--');
  // console.log(precipTotal);

  // console.log('--path parts--');
  // console.log(GetTsidParts(tsid));
  // if (tsvArray?.length) {
  //   console.log('--precip has values--');
  // }

  // console.log(tsvObj[tsid]);
  // console.log(tsvObj[tsid]?.values);
  // console.log(`-returning precip total of: ${precipTotal}`);
  return precipTotal?.toFixed(2);
};

const GetTsObjByLabel = (timeseries, label) => {
  const tsMap = mapObjectArrayByKey(timeseries, 'label');
  return tsMap[label];
};

// display timeseries values with different precision based on parameter
const DisplayValue = (tsObj) => {
  if (tsObj?.base_parameter === 'Flow' || tsObj?.base_parameter === 'Stor') {
    return tsObj?.latest_value?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  }
  return tsObj?.latest_value?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export {
  LastValueSet,
  LookBackValueSet,
  DeltaChange,
  PrecipTotal,
  GetTsObjByLabel,
  DisplayValue,
};

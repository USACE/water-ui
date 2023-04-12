import { useState } from 'react';
import { subDays, differenceInDays } from 'date-fns';
import { useConnect } from 'redux-bundler-hook';

export default function DateLookbackSelector() {
  const {
    timeseriesDateRange: dateRange,
    doTimeseriesDateRangeUpdate,
    providerTimeseriesValuesIsLoading: tsIsLoading,
  } = useConnect(
    'selectTimeseriesDateRange',
    'doTimeseriesDateRangeUpdate',
    'selectProviderTimeseriesValuesIsLoading'
  );
  const options = [
    { name: 'last 7 days', value: 7 },
    { name: 'last 14 days', value: 14 },
    { name: 'last month', value: 30 },
  ];
  // const [daysBack] = useState(parseInt(options[0].value));
  const [daysBack, setDaysBack] = useState(
    differenceInDays(dateRange?.endDate, dateRange?.beginDate)
  );

  // console.log('---daysBack--');
  // console.log(daysBack);

  const handleChange = (e) => {
    // only process if different selection is chosen
    if (parseInt(e.target.value) !== daysBack) {
      console.log(`--Setting daysBack to ${parseInt(e.target.value)}`);
      doTimeseriesDateRangeUpdate(
        subDays(new Date(), parseInt(e.target.value)),
        new Date()
      );
      setDaysBack(parseInt(e.target.value));
    }
  };
  return (
    <div className="-mt-2 mb-2 mr-2 flex justify-end">
      {/* {tsIsLoading ? 'Loading...' : 'Done'} */}
      {options.map((option, idx) => (
        <button
          className={`${
            option.value === daysBack
              ? 'cursor-default bg-blue-200'
              : 'bg-gray-100'
          } inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium text-gray-600 hover:bg-blue-300`}
          onClick={handleChange}
          value={option.value}
          key={idx}
        >
          {option.name}
        </button>
      ))}

      {/* <select
        onChange={handleChange}
        className="b-gray-50 w-full rounded-md bg-white text-black duration-300 hover:bg-gray-200 focus:bg-gray-200 focus:ring-0 lg:w-40"
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.name}
          </option>
        ))}
      </select> */}
    </div>
  );
}

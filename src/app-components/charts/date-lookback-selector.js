import { useState } from 'react';
import { subDays } from 'date-fns';

export default function DateLookbackSelector({ onInputValueChange }) {
  const options = [
    { name: 'last 7 days', value: 7 },
    { name: 'last 14 days', value: 14 },
    { name: 'last month', value: 30 },
  ];
  const [daysBack, setDaysBack] = useState(parseInt(options[0].value));

  const handleChange = (e) => {
    // only process if different selection is chosen
    if (parseInt(e.target.value) !== daysBack) {
      setDaysBack(parseInt(e.target.value));
      onInputValueChange([subDays(new Date(), daysBack), new Date()]);
    }
  };
  return (
    <div className="-mt-2 mb-2 mr-2 flex justify-end">
      {options.map((option, idx) => (
        <button
          className={`${
            option.value === daysBack
              ? 'cursor-default bg-blue-300'
              : 'bg-gray-100'
          } inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium text-gray-800 hover:bg-blue-300`}
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

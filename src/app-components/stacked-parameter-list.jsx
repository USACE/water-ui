import { useState, useEffect } from 'react';
// import { ClockIcon } from '@heroicons/react/24/outline';
// import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';
import { PiClockThin } from 'react-icons/pi';
import { parseISO } from 'date-fns';
import { Placeholder } from './content-placeholder';
import { Tooltip } from 'react-tooltip';
import { DisplayValue } from '../helpers/timeseries-helper';

export default function StackedParameterList({ parameters }) {
  const [params, setParams] = useState();

  useEffect(() => {
    // ensure parameter values change properly when parameters object changes
    if (!parameters) {
      return;
    }
    setParams(parameters);
  }, [parameters]);
  return (
    <div className='overflow-hidden bg-white shadow'>
      <ul className='divide-y divide-gray-200'>
        {params?.length &&
          params
            .filter((p) =>
              Object.prototype.hasOwnProperty.call(p, 'latest_value')
            )
            .sort((a, b) => (a.sort_order > b.sort_order ? 1 : -1))
            .map((p, idx) => (
              <li key={idx}>
                {/* <a href="/" className="block hover:bg-gray-50"> */}
                <div className='px-4 py-3 sm:px-6'>
                  <div className='flex items-center justify-between'>
                    <p className='font-lg truncate text-lg font-semibold text-black'>
                      {p.label}
                    </p>
                    <div className='ml-2 flex flex-shrink-0'>
                      <p className='inline-flex px-2 text-lg font-semibold leading-5 text-black'>
                        <Placeholder
                          ready={!isNaN(p.latest_value)}
                          className={'w-20 rounded-lg'}
                        >
                          {p.base_parameter !== 'Precip'
                            ? DisplayValue(p)
                            : (p.precip_total && p.precip_total) || '-'}
                          <span className='ml-1 text-sm font-normal text-gray-400'>
                            {p.unit}
                          </span>
                        </Placeholder>
                      </p>
                    </div>
                  </div>
                  <div className='mt-2 flex justify-between'>
                    <div className='sm:flex'>
                      <p className='flex items-center text-sm text-gray-500'>
                        <Placeholder
                          ready={p.latest_time}
                          className={'w- w-48 rounded-lg'}
                        >
                          <PiClockThin
                            className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600'
                            aria-hidden='true'
                          />
                          <time dateTime={p.latest_time}>
                            {p.latest_time &&
                              parseISO(p.latest_time).toLocaleString('en-US', {
                                day: 'numeric',
                                year: 'numeric', // numeric, 2-digit
                                month: 'short', // numeric, 2-digit, long, short, narrow
                                hour: 'numeric', // numeric, 2-digit
                                minute: 'numeric', // numeric, 2-digit
                                // second: 'numeric', // numeric, 2-digit
                                timeZoneName: 'short',
                              })}
                          </time>
                        </Placeholder>
                      </p>
                    </div>
                    <div className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0'>
                      <p className='flex items-baseline text-sm '>
                        {p.base_parameter !== 'Precip' ? (
                          <>
                            {p.delta24hr > 0 ? (
                              <HiArrowUp
                                className='h-5 w-5 flex-shrink-0 self-center text-green-500'
                                aria-hidden='true'
                              />
                            ) : p.delta24hr < 0 ? (
                              <HiArrowDown
                                className='h-5 w-5 flex-shrink-0 self-center text-red-500'
                                aria-hidden='true'
                              />
                            ) : null}
                            {/* <span className="">
                              {' '}
                              {p.delta24hr > 0
                                ? '24hr increase'
                                : '24hr decrease'}{' '}
                              of
                            </span> */}
                            <span
                              className='ml-1 cursor-default border-b-2 border-dotted border-b-gray-300'
                              // title="24 hour change"
                              aria-label='24 hour change'
                              data-tooltip-id='delta24-tooltip'
                              data-tooltip-content='24 hour change'
                            >
                              {p.delta24hr !== 0 && p.delta24hr}
                            </span>
                          </>
                        ) : (
                          '24hr total'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {/* </a> */}
              </li>
            ))}
        <Tooltip id='delta24-tooltip' />
      </ul>
    </div>
  );
}

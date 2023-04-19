import { ClockIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { parseISO, format } from 'date-fns';
import { Placeholder } from './content-placeholder';

// const parameters = [
// {
//   label: "Elevation",
//   latest_time: "2023-04-12T16:30:00Z"
//   latest_value: 408.96
//   delta24hr: "-0.19",
//   levels: []
//   parameter: "Elev"
//   sort_order: 1
//   tsid: "Eureka-Meramec.Elev.Inst.30Minutes.0.lrgsShef-rev"
//   unit: "ft"
//   values:[]
// }
// ];

export default function StackedParameterList({ parameters }) {
  // console.log('--StackedParameterList--');
  // console.log(parameters);
  // return (
  //   <>
  //     {/* JSON.stringify(parameters) */}
  //     {parameters.map((parameter, idx) => (
  //       <li key={idx}>{JSON.stringify(parameters)}</li>
  //     ))}
  //   </>
  // );
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {parameters?.length &&
          parameters
            .filter((p) => p.hasOwnProperty('latest_value'))
            .sort((a, b) => (a.sort_order > b.sort_order ? 1 : -1))
            .map((p, idx) => (
              <li key={idx}>
                {/* <a href="/" className="block hover:bg-gray-50"> */}
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="font-lg truncate text-lg font-semibold text-black">
                      {p.label}
                    </p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex px-2 text-lg font-semibold leading-5 text-black">
                        <Placeholder
                          ready={!isNaN(p.latest_value)}
                          className={'w-20 rounded-lg'}
                        >
                          {p.latest_value?.toLocaleString()}
                          <span className="ml-1 text-sm font-normal text-gray-400">
                            {p.unit}
                          </span>
                        </Placeholder>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <Placeholder
                          ready={p.latest_time}
                          className={'w- w-48 rounded-lg'}
                        >
                          <ClockIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <time dateTime={p.latest_time}>
                            {p.latest_time &&
                              format(
                                parseISO(p.latest_time),
                                'dd-LLL-yyyy @ p'
                              )}
                          </time>
                        </Placeholder>
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p className="flex items-baseline text-sm ">
                        {p.delta24hr ? (
                          <>
                            {p.delta24hr > 0 ? (
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
                            <span className="ml-1" aria-label="24 hour change">
                              {p.delta24hr}
                            </span>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>
                </div>
                {/* </a> */}
              </li>
            ))}
      </ul>
    </div>
  );
}

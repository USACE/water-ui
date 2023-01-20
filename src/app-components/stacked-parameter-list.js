import { ClockIcon } from '@heroicons/react/20/solid';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

// const parameters = [
//   {
//     id: 1,
//     title: 'Pool/Lake Elevation',
//     val: '1046.79',
//     unit: 'FT',
//     dateTime: '2023-01-09T:18:00+00:00',
//     delta24hr: 0.89,
//   },
//   {
//     id: 2,
//     title: 'Inflow',
//     val: '4829',
//     unit: 'CFS',
//     dateTime: '2023-01-09T:18:00+00:00',
//   },
//   {
//     id: 3,
//     title: 'Outflow',
//     val: '4948',
//     unit: 'CFS',
//     dateTime: '2023-01-09T:18:00+00:00',
//   },
// ];

export default function StackedParameterList({ parameters }) {
  //console.log(parameters);
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
        {parameters.length &&
          parameters.map((p, idx) => (
            <li key={idx}>
              <a href="/" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-md font-lg truncate font-bold text-black">
                      {p.label}
                    </p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex px-2 text-lg font-semibold leading-5 text-black">
                        {p.latest_value}
                        <span className="ml-1 text-sm text-gray-400">
                          ({p.units})
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <ClockIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <time dateTime={p.latest_time}>{p.latest_time}</time>
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
                            <span className="">
                              {' '}
                              {p.delta24hr > 0
                                ? '24hr increase'
                                : '24hr decrease'}{' '}
                              of
                            </span>
                            <span className="ml-1">{p.delta24hr}</span>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

import { ClockIcon } from '@heroicons/react/20/solid';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

const items = [
  {
    id: 1,
    title: 'Big Sandy River',
    val: '1046.79',
    unit: 'FT',
    dateTime: '2023-01-09T:18:00+00:00',
    delta24hr: 0.89,
  },
  {
    id: 2,
    title: 'Inflow',
    val: '4829',
    unit: 'CFS',
    dateTime: '2023-01-09T:18:00+00:00',
  },
  {
    id: 3,
    title: 'Outflow',
    val: '4948',
    unit: 'CFS',
    dateTime: '2023-01-09T:18:00+00:00',
  },
];

export default function StackedListTwoColumn() {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id}>
            <a href="/" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-md font-lg truncate font-bold text-black">
                    {item.title}
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex px-2 text-lg font-semibold leading-5 text-black">
                      {item.val}
                      <span className="ml-1 text-sm text-gray-400">
                        ({item.unit})
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {/* <UsersIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      {position.unit} */}
                      <ClockIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <time dateTime={item.dateTime}>{item.dateTime}</time>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    {/* <ClockIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      <time dateTime={position.dateTime}>
                        {position.dateTime}
                      </time>
                    </p> */}
                    <p className="flex items-baseline text-sm ">
                      {item.delta24hr ? (
                        <>
                          {item.delta24hr > 0 ? (
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
                            {item.delta24hr > 0
                              ? '24hr increase'
                              : '24hr decrease'}{' '}
                            of
                          </span>
                          <span className="ml-1">{item.delta24hr}</span>
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

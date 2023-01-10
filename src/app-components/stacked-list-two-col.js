import { ClockIcon } from '@heroicons/react/20/solid';

const positions = [
  {
    id: 1,
    title: 'Pool/Lake Elevation',
    val: '1046.79',
    unit: 'FT',
    dateTime: '2023-01-09T:18:00+00:00',
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
        {positions.map((position) => (
          <li key={position.id}>
            <a href="/" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-md font-lg truncate font-bold text-black">
                    {position.title}
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex px-2 text-lg font-semibold leading-5 text-black">
                      {position.val}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  {/* <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <UsersIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      {position.unit}
                    </p>
                  </div> */}
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <ClockIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      <time dateTime={position.dateTime}>
                        {position.dateTime}
                      </time>
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

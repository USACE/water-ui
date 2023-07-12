// import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';
// import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
// import { BiWater } from 'react-icons/bi';
// import { MdWaterDrop } from 'react-icons/md';

// const stats = [
//   {
//     id: 1,
//     name: 'Flood Storage Utilized',
//     stat: '2.9%',
//     icon: BiWater,
//     change: '0.8%',
//     changeType: 'increase',
//   },
//   {
//     id: 2,
//     name: 'Conservation Storage Utilized',
//     stat: '58.16%',
//     icon: MdWaterDrop,
//     change: '5.4%',
//     changeType: 'increase',
//   },
//   {
//     id: 3,
//     name: 'undecided stat',
//     stat: '24.57%',
//     icon: CursorArrowRaysIcon,
//     change: '3.2%',
//     changeType: 'decrease',
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function StatsWIcon({ stats }) {
  return (
    <div>
      <dl className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
        {stats.map((item) => (
          <div
            key={item.id}
            className='relative overflow-hidden rounded-lg bg-white px-4 pb-0 pt-5 shadow sm:px-6 sm:pt-6'
          >
            <dt>
              <div className='absolute rounded-md bg-gray-400 p-3'>
                <item.icon className='h-6 w-6 text-white' aria-hidden='true' />
              </div>
              <p className='ml-16 truncate text-sm font-medium text-gray-500'>
                {item.name}
              </p>
            </dt>
            <dd className='ml-16 flex items-baseline pb-6'>
              <p className='text-2xl font-semibold text-gray-900'>
                {item.stat}
              </p>
              <p
                className={classNames(
                  item.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <HiArrowUp
                    className='h-5 w-5 flex-shrink-0 self-center text-green-500'
                    aria-hidden='true'
                  />
                ) : item.changeType === 'decrease' ? (
                  <HiArrowDown
                    className='h-5 w-5 flex-shrink-0 self-center text-red-500'
                    aria-hidden='true'
                  />
                ) : null}

                <span className='sr-only'>
                  {' '}
                  {item.changeType === 'increase'
                    ? 'Increased by '
                    : item.changeType === 'decrease'
                    ? 'Decreased by '
                    : null}
                </span>
                {item.change}
              </p>
              {/* <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="/"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {' '}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div> */}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

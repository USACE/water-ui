import { useConnect } from 'redux-bundler-hook';
import { TbTableShortcut } from 'react-icons/tb';
import { GrMap } from 'react-icons/gr';
import { TbMap } from 'react-icons/tb';
import { HiMapPin } from 'react-icons/hi2';

export default function MapOverviewToggle({ showLabels }) {
  const {
    isMapView,
    providerLocationByRoute: location,
    providerByRoute: provider,
    doUpdateUrl,
  } = useConnect(
    'selectIsMapView',
    'selectProviderLocationByRoute',
    'selectProviderByRoute',
    'doUpdateUrl'
  );

  const btnBaseStyles = `relative inline-flex items-center px-2 py-2 ring-1 ring-inset ring-gray-300 font-medium focus:z-10`;
  const btnEnabledStyles =
    'bg-white text-gray-500 hover:bg-gray-300 hover:text-black';
  const btnDisabledStyles = 'bg-gray-100 text-gray-400 hover:cursor-default';

  return (
    <span className='isolate rounded-md shadow-sm'>
      <button
        type='button'
        title='Switch to Detail View'
        disabled={!isMapView}
        onClick={() =>
          doUpdateUrl(`/overview/${provider?.slug}/locations/${location?.slug}`)
        }
        className={`${btnBaseStyles} rounded-l-md ${
          !isMapView ? btnDisabledStyles : btnEnabledStyles
        }`}
      >
        <span className='sr-only'>Detail View</span>
        <TbTableShortcut
          className={`mr-1 h-5 w-5 ${
            !isMapView
              ? 'fill-white stroke-gray-400'
              : 'fill-white stroke-gray-500'
          }`}
          aria-hidden='true'
        />
        {showLabels && 'Details'}
      </button>
      <button
        type='button'
        disabled={isMapView}
        title='Switch to Map View'
        onClick={() =>
          doUpdateUrl(`/map/${provider?.slug}/locations/${location?.slug}`)
        }
        className={`${btnBaseStyles} -ml-px mr-1 rounded-r-md ${
          isMapView ? btnDisabledStyles : btnEnabledStyles
        }`}
      >
        <span className='sr-only'>Map View</span>
        <HiMapPin
          className={`h-5 w-5 ${
            isMapView
              ? 'fill-gray-300 stroke-gray-500'
              : 'fill-gray-500 stroke-gray-500'
          }`}
          aria-hidden='true'
        />
        {showLabels && 'Map'}
      </button>
    </span>
  );

  //   return (
  //     <button
  //       type='button'
  //       className='ml-4 hover:cursor-pointer'
  //       title='Switch to Details View'
  //       onClick={() =>
  //         doUpdateUrl(`/overview/${provider?.slug}/locations/${location?.slug}`)
  //       }
  //     >
  //       <span className='sr-only'>Switch to Details View</span>
  //       <TbTableShortcut className='h-6 w-6 text-gray-400' aria-hidden='true' />
  //     </button>
  //   );
}

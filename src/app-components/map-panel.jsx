import { useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { HiOutlineXMark } from 'react-icons/hi2';
import DamProfileChart from './charts/dam-profile-chart/chart';
import LocationSideBarAccordian from './location-detail/sidebar-accordian';

export default function DetailPanel() {
  const [setOpen] = useState(true);

  const { providerLocationByRoute: location } = useConnect(
    'selectMapLocationSelected',
    'selectProviderLocationByRoute'
  );

  return (
    <div className="absolute bottom-0 z-10 h-3/4 w-full bg-blue-100 lg:right-0 lg:h-full lg:w-1/3">
      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
        <div className="px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative mt-6 flex-1 overflow-auto px-4 sm:px-6">
          <div className="bg-green-50 py-2 text-xl">
            {location?.public_name}
          </div>
          {/* {JSON.stringify(location)} */}
          <div className="w-full">
            {location?.kind === 'PROJECT' && (
              <DamProfileChart location={location} />
            )}
          </div>
          <div className="">
            <LocationSideBarAccordian location={location} />
          </div>
        </div>
      </div>
    </div>
  );
}

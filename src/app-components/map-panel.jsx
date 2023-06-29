import { useState, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { HiOutlineXMark } from 'react-icons/hi2';
import DamProfileChart from './charts/dam-profile-chart/chart';
import LocationSideBarAccordian from './location-detail/sidebar-accordian';
import PageHead from './page-head';
import ProjectTimeseriesCharts from './charts/location-timeseries-charts';
import { hasRequiredLevels } from '../helpers/project-helper';
import { Placeholder } from './content-placeholder';

export default function DetailPanel() {
  const [setOpen] = useState(true);
  const [timeseriesIds, setTimeseriesId] = useState([]);

  const { providerLocationByRoute: location, providerByRoute: provider } =
    useConnect(
      'selectMapLocationSelected',
      'selectProviderLocationByRoute',
      'selectProviderByRoute'
    );

  /** Load specific timeseries ids into state when new configurations are loaded */
  useEffect(() => {
    const timeseriesIdArray = location?.timeseries
      ? location?.timeseries?.map((ts) => {
          return ts.tsid;
        })
      : [];

    setTimeseriesId(timeseriesIdArray);
  }, [location]);

  const addonSections = [
    {
      title: 'Timeseries Charts',
      content: (
        <div className="pt-5">
          {timeseriesIds?.length ? (
            <ProjectTimeseriesCharts location={location} />
          ) : null}
        </div>
      ),
      defaultOpen: false,
    },
  ];

  return (
    <div className="absolute bottom-0 z-10 h-3/4 w-full border-t-2 border-gray-400 bg-blue-100 text-base lg:right-0 lg:top-0 lg:top-24 lg:h-full lg:w-1/3 lg:border-white">
      <div className="flex h-full flex-col overflow-y-scroll bg-white py-2 shadow-xl">
        <div className="bg-white">
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
        <div className="relative mt-2 flex-1 overflow-auto px-4">
          <div className="mb-5">
            <PageHead
              title={location?.public_name}
              subTitle={`provided by ${provider?.name}`}
            />
          </div>

          {location?.kind === 'PROJECT' && hasRequiredLevels(location) ? (
            <div className="my-5 w-full">
              <Placeholder
                ready={location?.levels?.length}
                className="h-96 w-full"
              >
                <DamProfileChart location={location} />
              </Placeholder>
            </div>
          ) : null}

          {/* <div className="mt-5">
            {timeseriesIds?.length ? (
              <ProjectTimeseriesCharts location={location} />
            ) : null}
          </div> */}
          <div className="">
            <LocationSideBarAccordian
              location={location}
              addonSections={addonSections}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

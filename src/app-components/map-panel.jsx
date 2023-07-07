import { useState, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { HiOutlineXMark } from 'react-icons/hi2';
import DamProfileChart from './charts/dam-profile-chart/chart';
import LocationSideBarAccordian from './location-detail/sidebar-accordian';
import PageHead from './page-head';
import { hasRequiredLevels } from '../helpers/project-helper';
import { Placeholder } from './content-placeholder';
import { LoadingBar } from '../app-components/loading';
// import { BiExpandHorizontal } from 'react-icons/bi';
import { TbTableShortcut } from 'react-icons/tb';
import { FcExpand } from 'react-icons/fc';

export default function DetailPanel() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const {
    mapLocationSelected,
    providerLocationByRoute: location,
    providerByRoute: provider,
    doUpdateUrl,
  } = useConnect(
    'selectMapLocationSelected',
    'selectProviderLocationByRoute',
    'selectProviderByRoute',
    'doUpdateUrl'
  );

  useEffect(() => {
    mapLocationSelected?.slug && location && setOpen(true);
    console.log(mapLocationSelected);
  }, [mapLocationSelected, location]);

  const ExpandToggle = () => {
    return (
      <div className="hidden h-full w-4 flex-col justify-center bg-gray-100 lg:flex">
        <button className="h-full" onClick={() => setExpanded(!expanded)}>
          <span className="sr-only">resize panel</span>
          <FcExpand
            className={`h-4 w-4 ${expanded ? '-rotate-90' : 'rotate-90'}`}
            aria-hidden="true"
          />
        </button>
      </div>
    );
  };

  return (
    <>
      <ExpandToggle />
      <div
        className={`bottom-0 h-2/3 border-t-2 border-t-gray-400 lg:h-full lg:border-t-0 ${
          !open ? 'hidden' : null
        } ${expanded ? 'lg:w-2/3' : 'lg:w-2/5'}`}
      >
        <div className="flex h-full flex-col overflow-y-scroll bg-white py-2">
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
                {/* <button onClick={() => setExpanded(!expanded)}>
                  <span className="sr-only">expand panel</span>
                  <BiExpandHorizontal
                    className="ml-5 hidden h-6 w-6 text-gray-400 lg:inline"
                    aria-hidden="true"
                  />
                </button> */}
                <button
                  type="button"
                  className="ml-4 hover:cursor-pointer"
                  title="Switch to Details View"
                  onClick={() =>
                    doUpdateUrl(
                      `/overview/${provider?.slug}/locations/${location?.slug}`
                    )
                  }
                >
                  <span className="sr-only">Switch to Details View</span>
                  <TbTableShortcut
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
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

            <div className="bg-gray-300 text-center align-bottom">
              <LoadingBar isLoading={!location} />
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
                // addonSections={addonSections}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

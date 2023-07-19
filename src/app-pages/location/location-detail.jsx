import { useState, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import TabsComponent from '../../app-components/tabs';
import PageWrapper from '../page-wrapper';
import LocationTimeseriesCharts from '../../app-components/charts/location-timeseries-charts';
//import SimpleStats from '../../app-components/stats-simple';
import DamProfileChart from '../../app-components/charts/dam-profile-chart/chart';
import { BiExpandHorizontal } from 'react-icons/bi';
import LocationSideBarAccordian from '../../app-components/location-detail/sidebar-accordian';
import ProjectStats from '../../app-components/location-detail/project-stats';
import { Placeholder } from '../../app-components/content-placeholder';
import { mapObjectArrayByKey } from '../../helpers/misc-helpers';
import { hasRequiredLevels } from '../../helpers/project-helper';
import { FcDam, FcAreaChart } from 'react-icons/fc';
import { locationTitle } from '../../helpers/location-helper';

export default function ProjectDetail() {
  const {
    providerByRoute: provider,
    providerLocationByRoute: location,
    providerLocationIsLoading,
    doProviderLocationTimeseriesFetchAll,
    providerLocationTimeseriesLatestValues: latestTimeseries,
    // providerTimeseriesValuesItemsObject: tsvObj,
  } = useConnect(
    'selectProviderByRoute',
    'selectProviderLocationByRoute',
    'selectProviderLocationIsLoading',
    'doProviderLocationTimeseriesFetchAll',
    'selectProviderLocationTimeseriesLatestValues'
    // 'selectProviderTimeseriesValuesItemsObject'
  );

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    location && doProviderLocationTimeseriesFetchAll(location);
  }, [doProviderLocationTimeseriesFetchAll, location]);

  if (!location && !providerLocationIsLoading) {
    return (
      <PageWrapper title='404 - Location Not Found' subTitle=''>
        <div className='mx-auto h-96'>Unable to find your location.</div>
      </PageWrapper>
    );
  }

  const isProject = location?.kind === 'PROJECT' && location?.levels?.length;

  // ADA Screen reader text for dam profile chart
  const ProjectStatusDescription = ({ location: l }) => {
    if (!l?.timeseries) {
      return null;
    }
    const tsMap = mapObjectArrayByKey(l?.timeseries, 'label');
    const elevObj = tsMap['Elevation'];
    const poolElev = elevObj?.latest_value || null;
    const poolDirection = elevObj?.delta24hr > 0 ? 'increased' : 'decreased';

    return (
      <p className='sr-only bg-blue-100 p-5' aria-label='Project Status'>
        {l?.public_name} is located in the state of {l?.state}. The current pool
        elevation is {poolElev} feet and has {poolDirection} in elevation{' '}
        {elevObj?.delta24hr} feet in the last 24 hours.
        {/* The project is currently utilizing 3.3% of it's total flood storage. */}
      </p>
    );
  };

  const tabs = [
    {
      name: 'Dam Profile',
      content: (
        <>
          <ProjectStatusDescription location={location} />

          <Placeholder ready={location?.levels?.length} className='h-96 w-full'>
            <DamProfileChart
              location={location}
              timeseries={latestTimeseries}
            />
          </Placeholder>
        </>
      ),
      icon: <FcDam size={22} />,
    },

    {
      name: 'Timeseries',
      content:
        location && location?.timeseries?.length ? (
          <div className='bg-white pt-5'>
            <LocationTimeseriesCharts location={location} />
          </div>
        ) : null,
      icon: <FcAreaChart size={22} />,
    },
  ];

  const handleExpandToggle = () => {
    // Not sure this works as intended
    setExpanded(!expanded);
    window.dispatchEvent(new Event('resize'));
    return;
  };

  const ToggleExpandButton = () => {
    return (
      <div className='mb-2 hidden w-full lg:flex '>
        <BiExpandHorizontal
          size={32}
          title='Expand or Collapse this section'
          className='-mb-0 ml-auto cursor-pointer rounded-md border-2 border-gray-100 bg-white px-1 text-gray-400 shadow-md hover:text-gray-900'
          onClick={handleExpandToggle}
        />
      </div>
    );
  };

  return (
    <PageWrapper
      title={locationTitle(location)}
      subTitle={`provided by ${provider?.name}`}
      isLoading={providerLocationIsLoading}
    >
      <div
        className={`mt-0 duration-300 ease-in-out md:gap-x-8 ${
          expanded ? 'lg:flex-wrap' : 'lg:flex'
        } flex flex-col-reverse md:flex-col lg:flex-row`}
      >
        <div
          className={`mt-5 flex-auto lg:mt-0 ${
            expanded ? 'lg:w-full' : 'lg:w-3/5'
          }`}
        >
          <ToggleExpandButton />

          {isProject && hasRequiredLevels(location) ? (
            <>
              <div className='mb-5'>
                {isProject && (
                  <ProjectStats
                    location={location}
                    timeseries={latestTimeseries}
                  />
                )}
              </div>
              <div className=''>
                <TabsComponent tabs={tabs} />
              </div>
            </>
          ) : (
            <Placeholder
              ready={location?.timeseries?.length}
              className='h-96 w-full'
            >
              <LocationTimeseriesCharts location={location} />
            </Placeholder>
          )}
        </div>

        <div className={`flex-auto p-0 ${expanded ? 'xl:w-full' : 'xl:w-1/5'}`}>
          <LocationSideBarAccordian location={location} />
        </div>
      </div>
    </PageWrapper>
  );
}

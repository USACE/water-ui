import { useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import TabsComponent from '../../app-components/tabs';
import PageWrapper from '../page-wrapper';
import LocationTimeseriesCharts from '../../app-components/charts/location-timeseries-charts';
//import SimpleStats from '../../app-components/stats-simple';
import StatsWIcon from '../../app-components/stats-with-icon';
import DamProfileChart from '../../app-components/charts/dam-profile-chart/chart';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { ProjectFloodStoragePercent } from '../../helpers/project-helper';
import LocationSideBarAccordian from '../../app-components/location-detail/sidebar-accordian';

export default function ProjectDetail() {
  const { providerLocationByRoute: location } = useConnect(
    'selectProviderLocationByRoute'
  );

  const [expanded, setExpanded] = useState(false);

  const tabs = [
    {
      name: 'Dam Profile',
      content: <DamProfileChart />,
    },

    {
      name: 'Timeseries',
      content: location ? (
        <div className="bg-white pt-5">
          <LocationTimeseriesCharts location={location} />
        </div>
      ) : null,
    },
  ];

  const handleExpandToggle = () => {
    //alert('hello');
    setExpanded(!expanded);
  };

  // const stats = [
  //   { name: 'Flood Storage Utilized', stat: '1%' },
  //   { name: 'Conservation Storage Utilized', stat: '1%' },
  //   { name: 'Pool Elevation', stat: '646.35' },
  //   { name: 'Inflow', stat: '303.22' },
  //   { name: 'Discharge', stat: 447 },
  // ];

  const ToggleExpandButton = () => {
    return (
      <div className="hidden w-full bg-gray-100 lg:flex ">
        <HiOutlineArrowsExpand
          size={32}
          title="Expand or Collapse this section"
          className="-mb-0 ml-auto cursor-pointer text-gray-400 hover:text-gray-900"
          onClick={handleExpandToggle}
        />
      </div>
    );
  };

  return (
    <PageWrapper
      title={location?.attributes.public_name}
      subTitle={`provided by ${location?.provider_name}`}
    >
      <StatsWIcon />
      {ProjectFloodStoragePercent(500, 200, 250)}
      {/* <SimpleStats stats={stats} title="" /> */}
      <div
        className={`mt-8 md:gap-x-8 ${expanded ? 'lg:flex-wrap' : 'lg:flex'}`}
      >
        <div className={`flex-auto ${expanded ? 'lg:w-full' : 'lg:w-3/5'}`}>
          <ToggleExpandButton />

          {location?.attributes?.kind === 'PROJECT' &&
          location?.levels?.length ? (
            <>
              <TabsComponent tabs={tabs} />
            </>
          ) : (
            location && <LocationTimeseriesCharts location={location} />
          )}
          {/* {location && location.timeseries && (
            <StackedParameterList parameters={location.timeseries} />
          )} */}
        </div>
        <div
          className={`flex-auto bg-white p-0 ${
            expanded ? 'lg:w-full' : 'lg:w-1/5'
          }`}
        >
          <LocationSideBarAccordian location={location} />
        </div>
      </div>
    </PageWrapper>
  );
}

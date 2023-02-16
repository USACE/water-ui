import { useState } from 'react';
import { useMemo } from 'react';
import { useConnect } from 'redux-bundler-hook';
import StackedParameterList from '../../app-components/stacked-parameter-list';
import TabsComponent from '../../app-components/tabs';
import PageWrapper from '../page-wrapper';
import Accordion from '../../app-components/accordion';
import SimpleTable from '../../app-components/table-simple';
import LocationTimeseriesCharts from '../../app-components/charts/location-timeseries-charts';
//import SimpleStats from '../../app-components/stats-simple';
import StatsWIcon from '../../app-components/stats-with-icon';
import DamProfileChart from '../../app-components/charts/dam-profile-chart/chart';
import { HiOutlineArrowsExpand } from 'react-icons/hi';

const Metadata = ({ metadata }) => {
  //convert object into list with key pairs
  const meta_array = useMemo(
    () => [
      { name: 'State', value: metadata?.state_name },
      { name: 'Provider', value: metadata?.provider_name },
      { name: 'Project Purpose', value: metadata?.attributes?.project_purpose },
    ],
    [metadata]
  );

  return (
    <SimpleTable
      headers={['Name', 'Value']}
      items={meta_array}
      itemFields={[{ key: 'name' }, { key: 'value' }]}
    />
  );
};
const Levels = ({ levels }) => {
  console.log('hello from levels');
  return (
    <SimpleTable
      headers={['Label', 'Parameter', 'Value', 'Units']}
      items={levels}
      itemFields={[
        {
          key: 'label',
        },
        {
          key: 'parameter',
        },
        {
          key: 'latest_value',
        },
        {
          key: 'units',
        },
      ]}
    />
  );
};

// const DamProfileChart = () => {
//   return (
//     <img src={DamProfileMockup} className="w-full" alt="Dam Profile Chart" />
//   );
// };

export default function ProjectDetail() {
  const { providerLocationByRoute: location } = useConnect(
    'selectProviderLocationByRoute'
  );

  const [expanded, setExpanded] = useState(false);

  const tabs = [
    {
      name: 'Dam Profile',
      content: (
        <>
          <DamProfileChart />
        </>
      ),
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
      {/* <SimpleStats stats={stats} title="" /> */}
      <div
        className={`mt-8 md:gap-x-8 ${expanded ? 'lg:flex-wrap' : 'lg:flex'}`}
      >
        <div className={`flex-auto ${expanded ? 'lg:w-full' : 'lg:w-2/4'}`}>
          <ToggleExpandButton />

          {location?.attributes?.kind === 'PROJECT' ? (
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
            expanded ? 'lg:w-full' : 'lg:w-1/4'
          }`}
        >
          <Accordion
            sections={[
              {
                title: 'Current Values',
                content: (
                  <StackedParameterList parameters={location?.timeseries} />
                ),
                defaultOpen: true,
              },
              {
                title: 'Metadata',
                content: <Metadata metadata={location} />,
              },
              {
                title: 'Location Data',
                content: JSON.stringify(location?.geometry),
              },
              {
                title: 'Levels',
                content: <Levels levels={location?.levels} />,
              },
              {
                title: 'Documents',
                content: 'docs here',
              },
            ]}
          />
        </div>
      </div>
    </PageWrapper>
  );
}

import { useMemo } from 'react';
import { useConnect } from 'redux-bundler-hook';
import DamProfileMockup from '../../images/mockup/dam-profile-chart.png';
import StackedParameterList from '../../app-components/stacked-parameter-list';
import TabsComponent from '../../app-components/tabs';
import PageWrapper from '../page-wrapper';
import Accordion from '../../app-components/accordion';
import SimpleTable from '../../app-components/table-simple';
import LocationTimeseriesCharts from '../../app-components/charts/location-timeseries-charts';
//import SimpleStats from '../../app-components/stats-simple';
import StatsWIcon from '../../app-components/stats-with-icon';

const Metadata = ({ metadata }) => {
  //convert object into list with key pairs
  const meta_array = useMemo(
    () => [
      { name: 'State', value: metadata?.state_name },
      { name: 'Provider', value: metadata?.provider_name },
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

const DamProfileChart = () => {
  return (
    <img src={DamProfileMockup} className="w-full" alt="Dam Profile Chart" />
  );
};

export default function ProjectDetail() {
  const { providerLocationByRoute: location } = useConnect(
    'selectProviderLocationByRoute'
  );

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

  // const stats = [
  //   { name: 'Flood Storage Utilized', stat: '1%' },
  //   { name: 'Conservation Storage Utilized', stat: '1%' },
  //   { name: 'Pool Elevation', stat: '646.35' },
  //   { name: 'Inflow', stat: '303.22' },
  //   { name: 'Discharge', stat: 447 },
  // ];

  return (
    <PageWrapper
      title={location?.attributes.public_name}
      subTitle={`provided by ${location?.provider_name}`}
    >
      <StatsWIcon />
      {/* <SimpleStats stats={stats} title="" /> */}
      <div className="mt-8 flex-none md:gap-x-8 lg:flex">
        <div className="flex-auto lg:w-2/3">
          {location?.attributes.kind === 'PROJECT' ? (
            <TabsComponent tabs={tabs} />
          ) : (
            <>
              {/* <SimpleHydrographChart /> */}
              <LocationTimeseriesCharts location={location} />
              {/* <SynchronizedCharts /> */}
            </>
          )}
          {/* {location && location.timeseries && (
            <StackedParameterList parameters={location.timeseries} />
          )} */}
          {/* <div className="h-20 bg-blue-100">
            <SynchronizedCharts />
          </div> */}
        </div>
        <div className="flex-auto bg-white p-0 lg:w-1/3">
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
              { title: 'Location Data', content: JSON.stringify(location) },
              { title: 'Timeseries', content: 'sample data' },
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
          {/* <CardSimple title="test">{JSON.stringify(location)}</CardSimple> */}
        </div>
      </div>
    </PageWrapper>
  );
}

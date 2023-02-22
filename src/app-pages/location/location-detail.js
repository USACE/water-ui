import { useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import TabsComponent from '../../app-components/tabs';
import PageWrapper from '../page-wrapper';
import LocationTimeseriesCharts from '../../app-components/charts/location-timeseries-charts';
//import SimpleStats from '../../app-components/stats-simple';
import DamProfileChart from '../../app-components/charts/dam-profile-chart/chart';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import LocationSideBarAccordian from '../../app-components/location-detail/sidebar-accordian';
import ProjectStats from '../../app-components/location-detail/project-stats';

export default function ProjectDetail() {
  const { providerLocationByRoute: location } = useConnect(
    'selectProviderLocationByRoute'
  );

  const [expanded, setExpanded] = useState(false);

  const isProject =
    location?.attributes?.kind === 'PROJECT' && location?.levels?.length;

  // const ProjectStatusDescription = () => (
  //   <div className="sr-only bg-red-100 p-10" aria-label="Project Status">
  //     Dewey Lake is located in the state of Kentucky. The current pool elevation
  //     is 646.35 ft. The lake has decreased in elevation 0.37 ft in the last 24
  //     hours. The project is currently utilizing 3.3% of it's total flood
  //     storage.
  //   </div>
  // );

  const tabs = [
    {
      name: 'Dam Profile',
      content: (
        <>
          {/* <ProjectStatusDescription /> */}
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
      {/* {isProject && <ProjectStats location={location} />} */}

      {/* <SimpleStats stats={stats} title="" /> */}
      <div
        className={`mt-8 md:gap-x-8 ${expanded ? 'lg:flex-wrap' : 'lg:flex'}`}
      >
        <div className={`flex-auto ${expanded ? 'lg:w-full' : 'lg:w-3/5'}`}>
          <ToggleExpandButton />

          {isProject ? (
            <>
              <div className="mb-5">
                {isProject && <ProjectStats location={location} />}
              </div>
              <div className="">
                <TabsComponent tabs={tabs} />
              </div>
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

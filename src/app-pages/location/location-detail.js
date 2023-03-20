import { useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import TabsComponent from '../../app-components/tabs';
import PageWrapper from '../page-wrapper';
import LocationTimeseriesCharts from '../../app-components/charts/location-timeseries-charts';
//import SimpleStats from '../../app-components/stats-simple';
import DamProfileChart from '../../app-components/charts/dam-profile-chart/chart';
import { BiExpandHorizontal } from 'react-icons/bi';
import LocationSideBarAccordian from '../../app-components/location-detail/sidebar-accordian';
import ProjectStats from '../../app-components/location-detail/project-stats';

export default function ProjectDetail() {
  const { providerLocationByRoute: location, providerLocationIsLoading } =
    useConnect(
      'selectProviderLocationByRoute',
      'selectProviderLocationIsLoading'
    );

  const [expanded, setExpanded] = useState(false);

  if (!location && !providerLocationIsLoading) {
    return (
      <PageWrapper title="404 - Location Not Found" subTitle="">
        <div className="mx-auto h-96">Unable to find your location.</div>
      </PageWrapper>
    );
  }

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
    // Not sure this works as intended
    setExpanded(!expanded);
    window.dispatchEvent(new Event('resize'));
    return;
  };

  const ToggleExpandButton = () => {
    return (
      <div className="mb-2 hidden w-full lg:flex ">
        <BiExpandHorizontal
          size={32}
          title="Expand or Collapse this section"
          className="-mb-0 ml-auto cursor-pointer rounded-md border-2 border-gray-100 bg-white px-1 text-gray-400 shadow-md hover:text-gray-900"
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
      <div
        className={`mt-0 duration-300 ease-in-out md:gap-x-8 ${
          expanded ? 'lg:flex-wrap' : 'lg:flex'
        } flex flex-col-reverse lg:flex-row`}
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
        </div>

        <div
          className={`flex-auto bg-white p-0 ${
            expanded ? 'xl:w-full' : 'xl:w-1/5'
          }`}
        >
          <LocationSideBarAccordian location={location} />
        </div>
      </div>
    </PageWrapper>
  );
}

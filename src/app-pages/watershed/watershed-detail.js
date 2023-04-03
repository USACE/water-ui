//import { useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import MockWatershedMap from '../../images/mockup/map-watershed-focus.png';
import SimpleStats from '../../app-components/stats-simple';
import CardSimple from '../../app-components/card-simple';
import PageWrapper from '../page-wrapper';
import ProjectsTable from '../../app-components/projects-table';

export default function WatershedDetail() {
  const {
    providerByRoute: provider,
    providerWatershedByRoute: watershed,
    providerLocationsItems: locations,
  } = useConnect(
    'selectProviderByRoute',
    'selectProviderWatershedByRoute',
    'selectProviderLocationsItems'
  );

  // useEffect(() => {
  //   document.title = `${provider && provider.provider_name} | ${
  //     document.title
  //   }`;
  // }, []);

  // const provider_locations = locations.filter(
  //   (location) => location.provider === provider.provider
  // );

  const projects = !watershed
    ? []
    : locations.filter(
        (location) => location.kind === 'PROJECT'
        // location.kind === 'PROJECT' &&
        // location.watershed_slug === watershed.slug
      );

  const stats = [
    { name: 'Projects', stat: projects.length },
    { name: 'Locations', stat: locations.length },
    { name: 'Flood Storage', stat: '1%' },
    {
      name: 'Drainage Area',
      stat: watershed?.drainage_total > 0 ? watershed?.drainage_total : 'N/A',
    },
  ];

  return (
    <PageWrapper
      title={watershed?.public_name}
      subTitle={`provided by ${provider?.name}`}
    >
      <SimpleStats stats={stats} title="" />

      <div className="mt-8 flex-none lg:flex lg:gap-x-8">
        <div className="flex-auto lg:w-2/3">
          <ProjectsTable projects={projects} />
        </div>
        <div className="flex-auto lg:w-1/3">
          <CardSimple title={watershed && watershed.code}>
            <img src={MockWatershedMap} alt="mockup watershed map" />
          </CardSimple>
        </div>
      </div>
    </PageWrapper>
  );
}

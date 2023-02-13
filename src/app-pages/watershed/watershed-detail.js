//import { useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import MockWatershedMap from '../../images/mockup/map-watershed-focus.png';
import SimpleStats from '../../app-components/stats-simple';
import SimpleTable from '../../app-components/table-simple';
import CardSimple from '../../app-components/card-simple';
import PageWrapper from '../page-wrapper';

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
        (location) =>
          location.attributes.kind === 'PROJECT' &&
          location.attributes.watershed_slug === watershed.slug
      );

  const stats = [
    { name: 'Projects', stat: projects.length },
    { name: 'Locations', stat: locations.length },
    { name: 'Flood Storage', stat: '1%' },
    { name: 'Drainage Area', stat: 38080 },
  ];

  const ProjectLink = ({ href, title }) => {
    return (
      <a className="hover:underline" href={href}>
        {title}
      </a>
    );
  };

  const MockElevationStorage = () => {
    return <>{parseInt(Math.floor(Math.random() * (1500 - 900 + 1) + 900))}</>;
  };

  const MockElevationChange = () => {
    return (
      <>{parseInt(Math.floor(Math.random() * (4 - -3 + 1) + -3)).toFixed(2)}</>
    );
  };

  const MockStorage = () => {
    return <>{parseInt(Math.floor(Math.random() * (15 - 2 + 1) + 2)) + '%'}</>;
  };

  const MockFlow = () => {
    return <>{parseInt(Math.floor(Math.random() * (3000 - 100 + 1) + 100))}</>;
  };

  return (
    <PageWrapper
      title={watershed?.code}
      subTitle={`provided by ${provider?.name}`}
    >
      <SimpleStats stats={stats} title="" />

      <div className="mt-8 flex-none lg:flex lg:gap-x-8">
        <div className="flex-auto lg:w-2/3">
          <SimpleTable
            headers={[
              'Project',
              'Current Elevation (ft)',
              '24 Hour Change (ft)',
              'Flood Storage Utilized',
              'Inflow/Outflow (cfs)',
            ]}
            items={projects}
            itemFields={[
              {
                key: 'code',
                render: (location) => {
                  return (
                    <ProjectLink
                      title={location.attributes.public_name}
                      href={''.concat(
                        '/overview/',
                        `${provider.slug}`,
                        '/location/',
                        `${location.slug}`
                      )}
                    />
                  );
                },
              },
              {
                key: 'code',
                render: MockElevationStorage,
              },
              {
                key: 'code',
                render: MockElevationChange,
              },
              { key: 'slug', render: MockStorage },
              {
                key: 'slug',
                render: () => {
                  return (
                    <>
                      <MockFlow /> {' / '} <MockFlow />
                    </>
                  );
                },
              },
            ]}
          />
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

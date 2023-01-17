//import { useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import Breadcrumb from '../../app-components/breadcrumb';
import PageHead from '../../app-components/page-head';
import MockWatershedMap from '../../images/mockup/map-watershed-focus.png';
import SimpleStats from '../../app-components/simple-stats';
import SimpleTable from '../../app-components/simple-table';
import CardSimple from '../../app-components/card-simple';
import { Helmet } from 'react-helmet-async';

export default function WatershedDetail() {
  const {
    providerByRoute: provider,
    watershedByRoute: watershed,
    providerLocationItems: locations,
  } = useConnect(
    'selectPathname',
    'selectProviderByRoute',
    'selectWatershedByRoute',
    'selectProviderLocationItems'
  );

  // useEffect(() => {
  //   document.title = `${provider && provider.provider_name} | ${
  //     document.title
  //   }`;
  // }, []);

  // const provider_locations = locations.filter(
  //   (location) => location.provider === provider.provider
  // );

  const projects = locations.filter(
    (location) => location.attributes.kind === 'PROJECT'
  );

  const stats = [
    { name: 'Projects', stat: projects.length },
    { name: 'Locations', stat: locations.length },
    { name: 'Flood Storage', stat: '1%' },
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

  return (
    <div className="mx-auto px-4 lg:max-w-screen-2xl lg:px-0">
      <Helmet>
        <title>
          {watershed && watershed.code} {' | '}
          {provider && provider.provider_name}
        </title>
      </Helmet>
      <div className="mb-8 px-8 py-5">
        <Breadcrumb />
      </div>
      {/* Page Header */}
      <PageHead
        title={watershed && watershed.code}
        subTitle={provider && provider.provider_name}
      />

      {/* <h3>{provider?.provider_name}</h3> */}

      <div className="">
        <div className="py-2">
          <SimpleStats stats={stats} title="" />
        </div>
        <div className="mt-8 flex-none md:flex md:gap-x-8">
          <div className="flex-auto lg:w-1/3">
            <SimpleTable
              headers={[
                'Project',
                'Current Elevation (ft)',
                '24 Hour Change (ft)',
                'Flood Storage Utilized',
              ]}
              items={projects}
              itemFields={[
                {
                  key: 'code',
                  render: (location) => {
                    return (
                      <ProjectLink
                        title={location.attributes.public_name}
                        href={''.concat('/location/', `${location.slug}`)}
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
              ]}
            />

            {/* <h4 className="py-2 text-xl font-bold">Projects</h4>
            <ul className="bg-blue-100">
              {locations &&
                provider_projects.map((location) => (
                  <li className="p-2 text-lg" key={location.slug}>
                    <a
                      className="hover:underline"
                      href={''.concat('/location/', `${location.slug}`)}
                    >
                      {location.attributes.public_name}
                    </a>
                  </li>
                ))}
            </ul> */}
          </div>
          <div className="flex-auto p-2 lg:w-1/3">
            <CardSimple title={watershed && watershed.code}>
              <img src={MockWatershedMap} alt="mockup watershed map" />
            </CardSimple>
          </div>
        </div>
      </div>
    </div>
  );
}

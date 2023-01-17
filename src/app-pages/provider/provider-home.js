//import { useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import Breadcrumb from '../../app-components/breadcrumb';
import PageHead from '../../app-components/page-head';
import MockDistrictMap from '../../images/mockup/map-district-focus.png';
import SimpleStats from '../../app-components/simple-stats';
import CardSimple from '../../app-components/card-simple';
import SimpleTable from '../../app-components/simple-table';
import { Helmet } from 'react-helmet-async';

export default function ProviderHome() {
  const {
    pathname,
    providerByRoute: provider,
    providerLocationItems: locations,
    providerWatershedItems: watersheds,
  } = useConnect(
    'selectPathname',
    'selectProviderByRoute',
    'selectProviderLocationItems',
    'selectProviderWatershedItems'
  );

  const provider_projects = locations.filter(
    (location) => location.attributes.kind === 'PROJECT'
  );

  const stats = [
    { name: 'Watersheds', stat: watersheds.length },
    { name: 'Projects', stat: provider_projects.length },
    { name: 'Locations', stat: locations.length },
    { name: 'Flood Storage', stat: '1%' },
  ];

  const WatershedLink = ({ href, title }) => {
    return (
      <a className="hover:underline" href={href}>
        {title}
      </a>
    );
  };

  const MockStorage = () => {
    return <>{parseInt(Math.floor(Math.random() * (15 - 2 + 1) + 2)) + '%'}</>;
  };

  return (
    <div className="mx-auto px-4 lg:max-w-screen-2xl lg:px-0">
      <Helmet>
        <title>{provider && provider.provider_name}</title>
      </Helmet>
      <div className="mb-8 px-8 py-5">
        <Breadcrumb />
      </div>
      {/* Page Header */}
      <PageHead title={provider?.provider_name} subTitle="City, State" />

      {/* <h3>{provider?.provider_name}</h3> */}

      <div className="">
        <div className="py-2">
          <SimpleStats stats={stats} title="" />
        </div>
        <div className="mt-8 flex-none md:flex md:gap-x-8">
          <div className="w-full flex-auto lg:w-1/3">
            {/* <CardSimple title="Watersheds"> */}
            {/* <h4 className="py-2 text-xl font-bold">Watersheds</h4> */}
            <SimpleTable
              headers={['Watershed', 'Flood Storage Utilized']}
              items={watersheds}
              itemFields={[
                {
                  key: 'code',
                  render: (watershed) => {
                    return (
                      <WatershedLink
                        title={watershed.code}
                        href={''.concat(
                          pathname,
                          '/watershed/',
                          `${watershed.slug}`
                        )}
                      />
                    );
                  },
                },
                { key: 'slug', render: MockStorage },
              ]}
            />

            {/* <ul className="px-5 py-5">
              {watersheds &&
                watersheds.map((location) => (
                  <li className="p-2 text-lg" key={location.slug}>
                    <a
                      className="hover:underline"
                      href={''.concat(
                        pathname,
                        '/watershed/',
                        `${location.slug}`
                      )}
                    >
                      {location.code}
                    </a>
                  </li>
                ))}
            </ul> */}
            {/* </CardSimple> */}
          </div>
          <div className="w-full flex-auto lg:w-1/3">
            <CardSimple title={provider && provider.provider_name}>
              <img src={MockDistrictMap} alt="mockup district map" />
            </CardSimple>
          </div>
        </div>
      </div>
    </div>
  );
}

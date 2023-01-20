//import { useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import MockDistrictMap from '../../images/mockup/map-district-focus.png';
import SimpleStats from '../../app-components/simple-stats';
import CardSimple from '../../app-components/card-simple';
import SimpleTable from '../../app-components/simple-table';
import PageWrapper from '../page-wrapper';

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
    { name: 'Flood Storage Utilized', stat: '1%' },
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
    <PageWrapper title={provider?.name} subTitle="SubTitle">
      {/* <div className=""> */}

      <SimpleStats stats={stats} title="" />

      <div className="mt-4 flex-none md:flex md:gap-x-8">
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
        </div>
        <div className="w-full flex-auto lg:w-1/3">
          <CardSimple title={provider && provider.provider_name}>
            <img src={MockDistrictMap} alt="mockup district map" />
          </CardSimple>
        </div>
      </div>
      {/* </div> */}
    </PageWrapper>
  );
}

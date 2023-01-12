//import { useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import Breadcrumb from '../../app-components/breadcrumb';
import PageHead from '../../app-components/page-head';
import MockConusMap from '../../images/mockup/conus-map.png';
import SimpleStats from '../../app-components/simple-stats';
import { Helmet } from 'react-helmet-async';

export default function WatershedHome() {
  const {
    pathname,
    providerByRoute: provider,
    providerLocationItems: locations,
  } = useConnect(
    'selectPathname',
    'selectProviderByRoute',
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

  const provider_watersheds = locations.filter(
    (location) => location.datatype === 'cwms-watershed'
  );

  const stats = [
    { name: 'Watersheds', stat: provider_watersheds.length },
    { name: 'Locations', stat: locations.length },
    { name: 'Flood Storage', stat: '1%' },
  ];

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
          <div className="flex-auto lg:w-1/3">
            <h4 className="py-2 text-xl font-bold">Watersheds</h4>
            <ul className="bg-blue-100">
              {locations &&
                provider_watersheds.map((location) => (
                  <li className="p-2 text-lg" key={location.slug}>
                    <a
                      className="hover:underline"
                      href={''.concat(pathname, '/', `${location.slug}`)}
                    >
                      {location.code}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex-auto p-2 lg:w-2/3">
            <img src={MockConusMap} alt="mockup conus map" />
          </div>
        </div>
      </div>
    </div>
  );
}

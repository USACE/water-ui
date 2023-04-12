import React from 'react';
import { useConnect } from 'redux-bundler-hook';
import SimpleTable from '../../app-components/table-simple';
import PageWrapper from '../page-wrapper';

export default function ProviderLocationList() {
  const {
    pathname,
    providerLocationsItems: locations,
    providerByRoute: provider,
  } = useConnect(
    'selectPathname',
    'selectProviderLocationsItems',
    'selectProviderByRoute'
  );

  const LocationLink = ({ href, title }) => {
    return (
      <a className="hover:underline" href={href}>
        {title}
      </a>
    );
  };

  const allowedKinds = ['SITE', 'STREAM_LOCATION', 'PROJECT', 'BASIN'];

  const filteredLocations = locations.filter(
    (l) => l.public_name && l.state !== '00' && allowedKinds.includes(l.kind)
  );

  return (
    <PageWrapper
      title={provider?.name || 'Loading Locations'}
      subTitle={provider?.name && `provided by ${provider?.name}`}
    >
      <SimpleTable
        headers={['Name', 'Kind', 'State']}
        items={filteredLocations}
        itemFields={[
          {
            key: 'slug',
            render: (location) => {
              return (
                <LocationLink
                  title={location.public_name}
                  href={''.concat(
                    pathname,
                    '/',
                    `${location?.slug?.toLowerCase()}`
                  )}
                />
              );
            },
          },
          {
            key: 'kind',
            render: (location) => {
              return location?.kind;
            },
          },
          {
            key: 'state',
          },
        ]}
      />
    </PageWrapper>
  );
}

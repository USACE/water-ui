import React from 'react';
import { useConnect } from 'redux-bundler-hook';
import { SimpleTable, TableLink } from '../../app-components/table-simple';
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
        headers={['Name', 'Latest Data', 'Kind', 'State']}
        items={filteredLocations}
        itemFields={[
          {
            key: 'slug',
            render: (location) => {
              return (
                <TableLink
                  text={location.public_name}
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
            render: (l) => {
              return l.timeseries
                ? l.timeseries[0].parameter +
                    ' - ' +
                    l.timeseries[0]?.latest_value +
                    ' @ ' +
                    l.timeseries[0]?.latest_time
                : null;
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

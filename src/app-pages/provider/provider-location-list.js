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

  return (
    <PageWrapper title={`${provider?.name} Locations`} subTitle="SubTitle">
      <SimpleTable
        headers={['Name', 'Kind', 'State']}
        items={locations}
        itemFields={[
          {
            key: 'slug',
            render: (location) => {
              return (
                <LocationLink
                  title={location.attributes.public_name}
                  href={''.concat(
                    pathname,
                    '/',
                    `${location.slug.toLowerCase()}`
                  )}
                />
              );
            },
          },
          {
            key: 'kind',
            render: (location) => {
              return location.attributes && location.attributes.kind;
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

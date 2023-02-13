import React from 'react';
import { useConnect } from 'redux-bundler-hook';
import SimpleTable from '../../app-components/table-simple';
import PageWrapper from '../page-wrapper';

export default function ProviderList() {
  const { providerItems: providers } = useConnect('selectProviderItems');

  const ProviderLink = ({ href, title }) => {
    return (
      <a className="hover:underline" href={href}>
        {title}
      </a>
    );
  };

  return (
    <PageWrapper title="Providers" subTitle="SubTitle">
      <SimpleTable
        headers={['Reports to', 'Name']}
        items={providers}
        itemFields={[
          {
            key: 'slug',
            render: (provider) => {
              return (
                provider.parent_provider &&
                provider.parent_provider.toUpperCase()
              );
            },
          },

          {
            key: 'name',
            render: (provider) => {
              return (
                <ProviderLink
                  title={provider.name}
                  href={''.concat(
                    '/overview/',
                    `${provider.slug.toLowerCase()}`
                  )}
                />
              );
            },
          },
        ]}
      />
    </PageWrapper>
  );
}

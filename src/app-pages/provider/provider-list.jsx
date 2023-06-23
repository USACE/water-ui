import React from 'react';
import { useConnect } from 'redux-bundler-hook';
//import SimpleTable from '../../app-components/table-simple';
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

  const ProviderTable = ({ providers }) => (
    <div className="flex flex-col shadow-lg">
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Region
                  </td>
                  <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Name
                  </td>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {providers?.map((p) => (
                  <tr
                    key={p.slug}
                    className={`${
                      p.type === 'msc' ? 'bg-gray-200 text-gray-800' : null
                    }`}
                  >
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {p.office_group?.toUpperCase()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <ProviderLink
                        title={''.concat(
                          p.name,
                          ' (',
                          p.slug?.toUpperCase(),
                          ')'
                        )}
                        href={''.concat(
                          '/overview/',
                          `${p.slug?.toLowerCase()}`
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageWrapper title="Data Management Offices" subTitle="">
      <ProviderTable providers={providers} />
      {/* <SimpleTable
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
      /> */}
    </PageWrapper>
  );
}

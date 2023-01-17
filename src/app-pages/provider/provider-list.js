import React from 'react';
import { useConnect } from 'redux-bundler-hook';
import Breadcrumb from '../../app-components/breadcrumb';
import PageHead from '../../app-components/page-head';
import SimpleTable from '../../app-components/simple-table';

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
    <div className="mx-auto px-4 lg:max-w-screen-2xl lg:px-0">
      <div className="mb-8 px-8 py-5">
        <Breadcrumb />
      </div>
      {/* Page Header */}
      <PageHead title="Providers" subTitle="City, State" />

      <div className="mt-5 lg:px-8">
        <SimpleTable
          headers={['Name']}
          items={providers}
          itemFields={[
            {
              key: 'provider_name',
              render: ({ provider, provider_name }) => {
                return (
                  <ProviderLink
                    title={provider_name}
                    href={''.concat('/overview/', `${provider}`)}
                  />
                );
              },
            },
          ]}
        />

        {/* <ul>
          {providers &&
            providers.length &&
            providers.map((p) => (
              <li key={p.provider}>
                <a
                  className="hover:underline"
                  href={''.concat(pathname, '/', `${p.provider}`)}
                >
                  {`${p.provider}: ${p.provider_name}`}{' '}
                </a>
              </li>
            ))}
        </ul> */}
      </div>
    </div>
  );
}

// export default function Home() {
//   return (
//     <>
//       <section>
//         <h3>Data Providers</h3>
//         <ProviderList />
//       </section>
//     </>
//   );
// }

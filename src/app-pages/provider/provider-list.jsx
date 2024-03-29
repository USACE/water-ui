import { useConnect } from 'redux-bundler-hook';
//import SimpleTable from '../../app-components/table-simple';
import PageWrapper from '../page-wrapper';
import { providerLinks } from '../../helpers/provider-links';
import { FiExternalLink } from 'react-icons/fi';
import { ImTable2 } from 'react-icons/im';
import { HiMapPin } from 'react-icons/hi2';

export default function ProviderList() {
  const { providerItems: providers } = useConnect('selectProviderItems');

  const ProviderLink = ({ href, title }) => {
    return (
      <a className='hover:underline' href={href}>
        {title}
      </a>
    );
  };

  const ProviderTable = ({ providers }) => (
    <div className='flex flex-col shadow-lg'>
      <div className='overflow-x-auto '>
        <div className='inline-block min-w-full align-middle'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead className='bg-gray-50'>
                <tr>
                  <td className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    Region
                  </td>
                  <td className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    Name
                  </td>
                  <td className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    Locations View
                  </td>

                  <td className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    Office Link
                  </td>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {providers?.map((p) => (
                  <tr
                    key={p.slug}
                    className={`${
                      p.type === 'msc' ? 'bg-gray-200 text-gray-800' : null
                    }`}
                  >
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {p.office_group?.toUpperCase()}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
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
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {p.type !== 'msc' ? (
                        <>
                          <span className=''>
                            <ImTable2 size={15} className='mb-1 mr-1 inline' />
                            <ProviderLink
                              title='List View'
                              href={''.concat(
                                '/overview/',
                                `${p.slug?.toLowerCase()}/locations`
                              )}
                            />
                          </span>
                          <span className='ml-2'>
                            <HiMapPin size={15} className='mb-1 mr-1 inline' />
                            <ProviderLink
                              title='Map View'
                              href={''.concat(
                                '/map/',
                                `${p.slug?.toLowerCase()}`
                              )}
                            />
                          </span>
                        </>
                      ) : null}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {providerLinks[p?.slug?.toLowerCase()] && (
                        <a
                          target='_blank'
                          rel='noreferrer'
                          title='external link to office website'
                          href={providerLinks[p.slug.toLowerCase()].wm}
                          className='inline-block'
                        >
                          <FiExternalLink
                            className='h-4 w-4'
                            aria-hidden='true'
                          />
                        </a>
                      )}
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
    <PageWrapper title='Data Management Offices' subTitle=''>
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

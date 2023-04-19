import { useConnect } from 'redux-bundler-hook';
import MockDistrictMap from '../../images/mockup/map-district-focus.png';
import SimpleStats from '../../app-components/stats-simple';
import CardSimple from '../../app-components/card-simple';
import { SimpleTable, TableLink } from '../../app-components/table-simple';
import ProjectsTable from '../../app-components/projects-table';
import PageWrapper from '../page-wrapper';

export default function ProviderHome() {
  const {
    pathname,
    providerByRoute: provider,
    providerItems: providers,
    providerLocationsItems: locations,
    providerWatershedsItems: watersheds,
  } = useConnect(
    'selectPathname',
    'selectProviderItems',
    'selectProviderByRoute',
    'selectProviderLocationsItems',
    'selectProviderWatershedsItems'
  );

  const MockStorage = () => {
    return <>{parseInt(Math.floor(Math.random() * (15 - 2 + 1) + 2)) + '%'}</>;
  };

  const MscDistrictsTable = ({ mscSlug }) => {
    const districts = providers.filter((p) => p.parent_provider === mscSlug);

    return districts?.length ? (
      <SimpleTable
        headers={['Office', 'Flood Storage Utilized']}
        items={districts}
        itemFields={[
          {
            key: 'code',
            render: (p) => {
              return (
                <TableLink
                  text={p.name}
                  href={''.concat('/overview/', `${p.slug}`)}
                />
              );
            },
          },
          { key: 'slug', render: MockStorage },
        ]}
      />
    ) : null;
  };

  const provider_projects = locations.filter(
    (location) => location.kind === 'PROJECT'
  );

  const stats = [
    { name: 'Watersheds', stat: watersheds.length },
    { name: 'Projects', stat: provider_projects.length },
    { name: 'Locations', stat: locations.length },
    { name: 'Flood Storage Utilized', stat: '1%' },
  ];

  return (
    <PageWrapper title={provider?.name} subTitle="">
      {/* <div className=""> */}

      <SimpleStats stats={stats} title="" />

      <div className="mt-4 flex-none md:flex md:gap-x-8">
        <div className="w-full flex-auto lg:w-1/3">
          {/* <CardSimple title="Watersheds"> */}
          {/* <h4 className="py-2 text-xl font-bold">Watersheds</h4> */}
          {(provider?.type === 'msc' || provider?.type === 'hq') && (
            <MscDistrictsTable mscSlug={provider?.slug} />
          )}
          {watersheds?.length ? (
            <SimpleTable
              headers={['Watershed', 'Total Drainage Area (sq. mi)']}
              items={watersheds}
              itemFields={[
                {
                  key: 'code',
                  render: (watershed) => {
                    return (
                      <TableLink
                        text={watershed.public_name}
                        href={''.concat(
                          pathname,
                          '/watershed/',
                          `${watershed.slug}`
                        )}
                      />
                    );
                  },
                },
                { key: 'drainage_total' },
              ]}
            />
          ) : (
            <span className="inline-block w-full bg-yellow-100 p-2 text-center">
              no watersheds available
            </span>
          )}
          {!watersheds?.length && provider?.type === 'dis' && (
            <ProjectsTable projects={provider_projects} />
          )}
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

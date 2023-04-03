import { useConnect } from 'redux-bundler-hook';
import SimpleTable from './table-simple';

export default function ProjectsTable({ projects }) {
  const { providerByRoute: provider } = useConnect('selectProviderByRoute');

  const ProjectLink = ({ href, title }) => {
    return (
      <a className="hover:underline" href={href}>
        {title}
      </a>
    );
  };

  const MockElevationStorage = () => {
    return <>{parseInt(Math.floor(Math.random() * (1500 - 900 + 1) + 900))}</>;
  };

  const MockElevationChange = () => {
    return (
      <>{parseInt(Math.floor(Math.random() * (4 - -3 + 1) + -3)).toFixed(2)}</>
    );
  };

  const MockStorage = () => {
    return <>{parseInt(Math.floor(Math.random() * (15 - 2 + 1) + 2)) + '%'}</>;
  };

  const MockFlow = () => {
    return <>{parseInt(Math.floor(Math.random() * (3000 - 100 + 1) + 100))}</>;
  };

  return (
    <SimpleTable
      headers={[
        'Project',
        'Current Elevation (ft)',
        '24 Hour Change (ft)',
        'Flood Storage Utilized',
        'Inflow/Outflow (cfs)',
      ]}
      items={projects}
      itemFields={[
        {
          key: 'code',
          render: (location) => {
            return (
              <ProjectLink
                title={location.public_name}
                href={''.concat(
                  '/overview/',
                  `${provider.slug}`,
                  '/locations/',
                  `${location.slug}`
                )}
              />
            );
          },
        },
        {
          key: 'code',
          render: MockElevationStorage,
        },
        {
          key: 'code',
          render: MockElevationChange,
        },
        { key: 'slug', render: MockStorage },
        {
          key: 'slug',
          render: () => {
            return (
              <>
                <MockFlow /> {' / '} <MockFlow />
              </>
            );
          },
        },
      ]}
    />
  );
}

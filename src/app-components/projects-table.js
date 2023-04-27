import { useConnect } from 'redux-bundler-hook';
import { SimpleTable, TableLink } from './table-simple';
import { mapObjectArrayByKey } from '../helpers/misc-helpers';
import { DeltaChange } from '../helpers/timeseries-helper';
import { GetProjectFloodStorage } from '../helpers/project-helper';

export default function ProjectsTable({ projects }) {
  const { providerByRoute: provider } = useConnect('selectProviderByRoute');

  const getTsObjByLabel = (timeseries, label) => {
    const tsMap = mapObjectArrayByKey(timeseries, 'label');
    return tsMap[label];
  };

  // const MockElevationStorage = () => {
  //   return <>{parseInt(Math.floor(Math.random() * (1500 - 900 + 1) + 900))}</>;
  // };

  // const MockElevationChange = () => {
  //   return (
  //     <>{parseInt(Math.floor(Math.random() * (4 - -3 + 1) + -3)).toFixed(2)}</>
  //   );
  // };

  // const MockStorage = () => {
  //   return <>{parseInt(Math.floor(Math.random() * (15 - 2 + 1) + 2)) + '%'}</>;
  // };

  // const MockFlow = () => {
  //   return <>{parseInt(Math.floor(Math.random() * (3000 - 100 + 1) + 100))}</>;
  // };

  return (
    <SimpleTable
      headers={[
        'Project',
        'Current Elevation (ft)',
        '24 Hour Change (ft)',
        'Flood Storage Utilized',
        'Outflow (cfs)',
      ]}
      items={projects}
      itemFields={[
        {
          key: 'code',
          render: (location) => {
            return (
              <TableLink
                text={location.public_name}
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
          key: null,
          render: (l) => {
            return (
              getTsObjByLabel(l?.timeseries, 'Elevation')?.latest_value.toFixed(
                1
              ) || null
            );
          },
        },
        {
          key: null,
          render: (l) => {
            return (
              <div className="flex items-baseline text-sm">
                <DeltaChange
                  delta={getTsObjByLabel(l?.timeseries, 'Elevation')?.delta24hr}
                />
              </div>
            );
          },
        },
        {
          key: null,
          render: (l) => {
            return GetProjectFloodStorage(l)?.toFixed(1);
          },
        },
        {
          key: null,
          render: (l) => {
            return getTsObjByLabel(
              l?.timeseries,
              'Outflow'
            )?.latest_value.toFixed(0);
          },
        },
      ]}
      options={{ shadow: true }}
    />
  );
}

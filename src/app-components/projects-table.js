import { useState, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { SimpleTable, TableLink, TableValueWithTime } from './table-simple';
import {
  DeltaChange,
  getTsObjByLabel,
  displayValue,
} from '../helpers/timeseries-helper';
import { GetProjectFloodStorage } from '../helpers/project-helper';
import { FcDam } from 'react-icons/fc';
import { Switch } from '@headlessui/react';
// import {
//   parseISO,
//   format,
//   formatDistanceStrict,
//   differenceInHours,
// } from 'date-fns';

export default function ProjectsTable({ projects }) {
  const {
    providerByRoute: provider,
    providerLocationsIsLoading,
    providerProjectsWithFloodStorage: projectsWithFloodStorage,
  } = useConnect(
    'selectProviderByRoute',
    'selectProviderLocationsIsLoading',
    'selectProviderProjectsWithFloodStorage'
  );

  const [displayProjects, setDisplayProjects] = useState();

  useEffect(() => {
    setDisplayProjects(projects);
  }, [projects]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const [floodStorageEnabled, setFloodStorageEnabled] = useState(false);

  const FloodStorageFilter = () => {
    const FloodStorageToggle = (e) => {
      e === true
        ? setDisplayProjects(projectsWithFloodStorage)
        : setDisplayProjects(projects);

      setFloodStorageEnabled(e);
      // console.log(e);
    };

    return (
      <Switch.Group as="div" className="flex items-center bg-slate-100 p-2">
        <Switch
          checked={floodStorageEnabled}
          onChange={FloodStorageToggle}
          className={classNames(
            floodStorageEnabled ? 'bg-blue-400' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              floodStorageEnabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">Has Flood Storage</span>{' '}
          {/* <span className="text-gray-500">(Save 10%)</span> */}
        </Switch.Label>
      </Switch.Group>
    );
  };

  const StorageBar = ({ percent }) => {
    if (isNaN(percent)) {
      return null;
    }
    const p = parseInt(percent) < 0 ? 0 : parseInt(percent);
    const pString = p?.toFixed(0);

    return (
      <div className="flex w-2/3 bg-gray-200 text-right shadow">
        <div
          style={{ width: `${p}%` }}
          className={`bg-blue-400  py-1 text-center text-xs leading-none text-white`}
        >
          {p >= 20 ? pString + '%' : null}
        </div>

        {p < 20 ? <div className="w-full text-center">{pString}%</div> : null}
      </div>
    );
  };

  return (
    <>
      <FloodStorageFilter />
      <SimpleTable
        headers={[
          { text: 'Kind', className: 'hidden lg:table-cell' },
          { text: 'Project', className: null },
          { text: 'Pool Elevation/Stage (ft)', className: 'w-14 lg:w-auto' },
          { text: '24 Hour Change (ft)', className: null },
          { text: 'Flood Storage Utilized (%)', className: null },
          { text: 'Inflow (cfs)', className: null },
          { text: 'Outflow (cfs)', className: null },
        ]}
        items={displayProjects}
        itemFields={[
          {
            key: 'kind',
            className: 'hidden lg:table-cell',
            render: (l) => {
              return <FcDam size="32" alt={l.kind} title={l.kind} />;
            },
          },
          {
            key: 'public_name',
            className: 'block w-40 lg:w-auto truncate',
            render: (l) => {
              return (
                <TableLink
                  text={l.public_name}
                  href={''.concat(
                    '/overview/',
                    `${provider.slug}`,
                    '/locations/',
                    `${l.slug}`
                  )}
                />
              );
            },
          },
          {
            key: null,
            className: 'w-14 lg:w-auto',
            render: (l) => {
              const elev = getTsObjByLabel(l?.timeseries, 'Elevation');
              const stage = getTsObjByLabel(l?.timeseries, 'Stage');
              return elev ? (
                <TableValueWithTime tsObj={elev} />
              ) : (
                <TableValueWithTime tsObj={stage} />
              );
            },
            // return (
            //   getTsObjByLabel(
            //     l?.timeseries,
            //     'Elevation'
            //   )?.latest_value?.toFixed(1) || null
            // );
          },
          {
            key: null,
            render: (l) => {
              const elevChange = getTsObjByLabel(
                l?.timeseries,
                'Elevation'
              )?.delta24hr;
              const stageChange = getTsObjByLabel(
                l?.timeseries,
                'Stage'
              )?.delta24hr;
              return (
                <div className="flex items-baseline text-sm">
                  {elevChange ? (
                    <DeltaChange delta={elevChange} />
                  ) : (
                    <DeltaChange delta={stageChange} />
                  )}
                </div>
              );
            },
          },
          {
            key: null,
            render: (l) => {
              const FloodStorageUtilized = GetProjectFloodStorage(l);
              return FloodStorageUtilized && !isNaN(FloodStorageUtilized) ? (
                <StorageBar percent={FloodStorageUtilized} />
              ) : (
                'n/a'
              );
            },
          },
          {
            key: null,
            render: (l) => {
              return displayValue(getTsObjByLabel(l?.timeseries, 'Inflow'));
            },
          },
          {
            key: null,
            render: (l) => {
              return displayValue(getTsObjByLabel(l?.timeseries, 'Outflow'));
            },
          },
        ]}
        options={{ shadow: true, rowBlur: providerLocationsIsLoading }}
      />
    </>
  );
}

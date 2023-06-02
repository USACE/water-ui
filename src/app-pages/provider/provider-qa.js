import { useState, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { SimpleTable, TableLink } from '../../app-components/table-simple';
//import ProjectsTable from '../../app-components/projects-table';
import PageWrapper from '../page-wrapper';
// import ProviderLocationsTabs from '../provider/provider-home/locations-tabs';
//import CardSimple from '../../app-components/card-simple';
import Accordion from '../../app-components/accordion';
import { mapObjectArrayByKey } from '../../helpers/misc-helpers';

export default function ProviderQA() {
  const {
    //pathname,
    providerByRoute: provider,
    providerItems: providers,
    providerLocationsItems: locations,
    providerLocationsIsLoading,
    //providerWatershedsItems: watersheds,
  } = useConnect(
    //'selectPathname',
    'selectProviderItems',
    'selectProviderByRoute',
    'selectProviderLocationsItems',
    'selectProviderLocationsIsLoading'
    //'selectProviderWatershedsItems'
  );

  const [missingPublicName, SetMissingPublicName] = useState();
  const [missingTimeseries, SetMissingTimeseries] = useState();
  const [projectsMissingLevels, SetProjectsMissingLevels] = useState();
  const [projects, SetProjects] = useState();
  const [sections, setSections] = useState();

  const MissingPublicNameTable = ({ dataArray }) => (
    <SimpleTable
      headers={[{ text: 'Location' }, { text: 'Public Name' }]}
      items={dataArray}
      itemFields={[
        {
          key: 'code',
          className: 'text-blue-500',
          render: (l) => {
            return (
              <TableLink
                text={l.code}
                href={''.concat(
                  '/overview',
                  `/${provider.slug}`,
                  '/locations/',
                  `${l?.slug?.toLowerCase()}`
                )}
              />
            );
          },
        },
        {
          key: 'public_name',
          className: 'text-red-500 italic',
          render: () => 'missing',
        },
      ]}
    />
  );

  const MissingTimeseriesTable = ({ dataArray }) => (
    <SimpleTable
      headers={[
        { text: 'Location' },
        { text: 'Public Name' },
        { text: 'Timeseries' },
      ]}
      items={dataArray}
      itemFields={[
        {
          key: 'code',
          className: 'text-blue-500',
          render: (l) => {
            return (
              <TableLink
                text={l.code}
                href={''.concat(
                  '/overview',
                  `/${provider.slug}`,
                  '/locations/',
                  `${l?.slug?.toLowerCase()}`
                )}
              />
            );
          },
        },
        { key: 'public_name' },
        {
          key: 'timeseries',
          render: (l) => {
            return JSON.stringify(l.timeseries);
          },
        },
      ]}
    />
  );

  const ProjectsMissingLevelsTable = ({ dataArray }) => (
    <SimpleTable
      headers={[
        { text: 'Location' },
        { text: 'Public Name' },
        { text: 'Levels' },
      ]}
      items={dataArray}
      itemFields={[
        {
          key: 'code',
          className: 'text-blue-500',
          render: (l) => {
            return (
              <TableLink
                text={l.code}
                href={''.concat(
                  '/overview',
                  `/${provider.slug}`,
                  '/locations/',
                  `${l?.slug?.toLowerCase()}`
                )}
              />
            );
          },
        },
        { key: 'public_name' },
        {
          key: 'levels',
          render: (l) => {
            return JSON.stringify(l.levels);
          },
        },
      ]}
    />
  );

  const ProjectsLevelsTable = ({ dataArray }) => (
    <SimpleTable
      headers={[
        { text: 'Location' },
        { text: 'Public Name' },
        { text: 'Levels' },
      ]}
      items={dataArray}
      itemFields={[
        {
          key: 'code',
          className: 'text-blue-500',
          render: (l) => {
            return (
              <TableLink
                text={l.code}
                href={''.concat(
                  '/overview',
                  `/${provider.slug}`,
                  '/locations/',
                  `${l?.slug?.toLowerCase()}`
                )}
              />
            );
          },
        },
        { key: 'public_name' },
        {
          key: 'levels',
          render: (l) => {
            return <ProjectLevelsCheckList levels={l.levels} />;
          },
        },
      ]}
    />
  );

  const ProjectLevelsCheckList = ({ levels }) => {
    const levelsMap = mapObjectArrayByKey(levels, 'slug');
    const required = [
      { slug: 'elev.streambed', label: 'Streambed (elev)' },
      { slug: 'stor.streambed', label: 'Streambed (stor)' },
      { slug: 'elev.top of dam', label: 'Top of Dam (elev)' },
      { slug: 'stor.top of dam', label: 'Top of Dam (stor)' },
      { slug: 'elev.top of flood', label: 'Top of Flood (elev)' },
      { slug: 'stor.top of flood', label: 'Top of Flood (stor)' },
      { slug: 'elev.bottom of flood', label: 'Bottom of Flood (elev)' },
      { slug: 'stor.bottom of flood', label: 'Bottom of Flood (stor)' },
    ];
    const displayList = required;
    const result = displayList.map((item) => {
      //return <li key={slug}>{JSON.stringify(levelsMap[slug])}</li>;
      return (
        <li
          key={item.slug}
          className={`${
            levelsMap[item.slug] ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {levelsMap[item.slug]
            ? levelsMap[item.slug].label +
              ' - ' +
              levelsMap[item.slug].tsid +
              ' - ' +
              levelsMap[item.slug].latest_value +
              '(' +
              levelsMap[item.slug].units +
              ')'
            : `${item.label} not set`}
        </li>
      );
    });

    return result;
  };

  useEffect(() => {
    const locationsMissingPublicName = locations.length
      ? locations.filter((l) => l.public_name === '' || l.public_name === null)
      : [];

    SetMissingPublicName(locationsMissingPublicName);

    const locationsMissingTimeseries = locations.length
      ? locations.filter((l) => l.timeseries === null)
      : [];

    SetMissingTimeseries(locationsMissingTimeseries);

    const projLocationsMissingLevels = locations.length
      ? locations.filter((l) => l.kind === 'PROJECT' && l.levels === null)
      : [];

    SetProjectsMissingLevels(projLocationsMissingLevels);

    const _projects = locations.length
      ? locations.filter((l) => l.kind === 'PROJECT' && l.levels !== null)
      : [];

    SetProjects(_projects);
  }, [locations]);

  useEffect(() => {
    const _sections = [
      {
        title: `Locations Missing Public Name (${missingPublicName?.length})`,
        content: <MissingPublicNameTable dataArray={missingPublicName} />,
        defaultOpen: missingPublicName?.length > 0 ? true : false,
      },
      {
        title: `Locations Missing Timeseries (${missingTimeseries?.length})`,
        content: <MissingTimeseriesTable dataArray={missingTimeseries} />,
        defaultOpen: missingTimeseries?.length > 0 ? true : false,
      },
      {
        title: `Projects Missing Levels (${projectsMissingLevels?.length})`,
        content: (
          <ProjectsMissingLevelsTable dataArray={projectsMissingLevels} />
        ),
        defaultOpen: projectsMissingLevels?.length > 0 ? true : false,
      },

      {
        title: `Projects Levels (${projects?.length})`,
        content: <ProjectsLevelsTable dataArray={projects} />,
        defaultOpen: projects?.length > 0 ? true : false,
      },
    ];

    setSections(_sections);
  }, [missingPublicName, missingTimeseries, projectsMissingLevels, projects]);

  return (
    <PageWrapper
      title={provider?.name}
      subTitle=""
      isLoading={providerLocationsIsLoading}
    >
      <ul className="mt-5">
        {providers
          .filter((p) => p.type === 'dis')
          .map((p) => (
            <li
              key={p.slug}
              className={`mr-2 inline rounded-md border-2 border-blue-200  p-1 hover:bg-blue-300 ${
                provider.slug === p.slug ? 'bg-blue-200' : 'bg-blue-100'
              }`}
            >
              <a href={`/overview/${p.slug}/qa`}>{p.slug}</a>
            </li>
          ))}
      </ul>
      <div className="mt-5">
        <Accordion sections={sections} />
      </div>
    </PageWrapper>
  );
}

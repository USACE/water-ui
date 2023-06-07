import { useState, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { SimpleTable, TableLink } from '../../app-components/table-simple';
//import ProjectsTable from '../../app-components/projects-table';
import PageWrapper from '../page-wrapper';
// import ProviderLocationsTabs from '../provider/provider-home/locations-tabs';
//import CardSimple from '../../app-components/card-simple';
import Accordion from '../../app-components/accordion';
import { mapObjectArrayByKey } from '../../helpers/misc-helpers';
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai';

export default function ProviderQA() {
  const {
    //pathname,
    providerByRoute: provider,
    providerItems: providers,
    providerLocationsItems: locations,
    providerLocationsIsLoading,
    //providerWatershedsItems: watersheds,,
    doProviderLocationsFetch,
  } = useConnect(
    //'selectPathname',
    'selectProviderItems',
    'selectProviderByRoute',
    'selectProviderLocationsItems',
    'selectProviderLocationsIsLoading',
    //'selectProviderWatershedsItems',
    'doProviderLocationsFetch'
  );

  const [projects, SetProjects] = useState();
  const [sections, setSections] = useState();
  const [locationIssues, setLocationIssues] = useState();

  const SectionInstructions = ({ instructions }) => {
    return <div className="bg-yellow-100 p-2 font-medium">{instructions}</div>;
  };

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
                  `/${provider?.slug}`,
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
      options={{ shadow: true, rowBlur: providerLocationsIsLoading }}
    />
  );

  const LocationIssueHelp = () => {
    return (
      <ul className="list-inside list-disc">
        <li>
          project levels missing - Flood Control projects need appropraite
          levels set. Nav only Projects can ignore.
        </li>
        <li>
          timeseries missing - upward reporting paths have been set, but have no
          valid data
        </li>
      </ul>
    );
  };

  const LocationIssuesTable = ({ dataArray }) => (
    <>
      <SectionInstructions instructions={<LocationIssueHelp />} />
      <SimpleTable
        headers={[
          { text: 'Location' },
          { text: 'Kind' },
          { text: 'Public Name' },
          { text: 'State' },
          { text: 'Timeseries' },
          { text: 'Levels' },
          { text: 'Issue' },
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
                    `/${provider?.slug}`,
                    '/locations/',
                    `${l?.slug?.toLowerCase()}`
                  )}
                />
              );
            },
          },
          {
            key: 'kind',
          },
          {
            key: 'public_name',
          },
          {
            key: 'state',
          },
          {
            key: 'timeseries',
            render: (l) => {
              return l.timeseries?.length || 0;
            },
          },
          {
            key: 'levels',
            render: (l) => {
              return l.levels?.length || 0;
            },
          },
          {
            key: 'public_name',
            className: 'text-red-500 italic',
            render: (l) => {
              let issues = [];
              if (
                l.kind === 'PROJECT' &&
                l.public_name?.split(' ')?.length === 1
              ) {
                issues.push('project public name is single word');
              }
              if (l.public_name === null || l.public_name === '') {
                issues.push('public name missing');
              }
              if (l.timeseries === null) {
                issues.push('timeseries missing');
              }
              if (l.kind === 'PROJECT' && l.levels === null) {
                issues.push('project levels missing');
              }
              if (l.state === null || l.state === '' || l.state === '00') {
                issues.push('state missing');
              }

              return issues.join('; ');
            },
          },
        ]}
        options={{ shadow: true, rowBlur: providerLocationsIsLoading }}
      />
    </>
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
          className={`mb-1 list-none ${
            levelsMap[item.slug] ? 'text-green-600' : 'text-red-500'
          }`}
        >
          <span className="mr-2 inline-block align-middle">
            {levelsMap[item.slug] ? (
              <AiFillCheckCircle size={18} />
            ) : (
              <AiFillWarning size={18} />
            )}
          </span>
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
    doProviderLocationsFetch();
  }, [doProviderLocationsFetch]);

  useEffect(() => {
    const _projects = locations.length
      ? locations.filter((l) => l.kind === 'PROJECT' && l.levels !== null)
      : [];

    SetProjects(_projects);

    const locationsIssues = locations?.length
      ? locations.filter(
          (l) =>
            l.public_name === '' ||
            l.public_name === null ||
            (l.kind === 'PROJECT' && l.public_name?.split(' ')?.length === 1) ||
            l.timeseries === null ||
            (l.kind === 'PROJECT' && l.levels === null)
        )
      : [];

    setLocationIssues(locationsIssues);
  }, [locations]);

  useEffect(() => {
    const _sections = [
      {
        title: `Locations with Issues (${locationIssues?.length})`,
        content: <LocationIssuesTable dataArray={locationIssues} />,
        defaultOpen: locationIssues?.length > 0 ? true : false,
      },

      {
        title: `Projects Levels Review (${projects?.length})`,
        content: <ProjectsLevelsTable dataArray={projects} />,
        defaultOpen: projects?.length > 0 ? true : false,
      },
    ];

    setSections(_sections);
  }, [locationIssues, projects]);

  return (
    <PageWrapper
      title={provider?.name}
      subTitle=""
      isLoading={providerLocationsIsLoading}
    >
      <ul className="mt-5">
        {providers
          .filter((p) => p.type === 'dis' || p.type === 'mscr')
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

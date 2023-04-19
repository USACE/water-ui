import { useConnect } from 'redux-bundler-hook';
import { useMemo } from 'react';
import Accordion from '../accordion';
import { SimpleTable, TableLink } from '../table-simple';
import StackedParameterList from '../stacked-parameter-list';
import { GrDocumentDownload } from 'react-icons/gr';
import { BsFiletypeJson } from 'react-icons/bs';
import distance from '@turf/distance';

export default function LocationSideBarAccordian({ location }) {
  const {
    timeseriesDateRange: dateRange,
    providerLocationsItems,
    pathname,
  } = useConnect(
    'selectTimeseriesDateRange',
    'selectProviderLocationsItems',
    'selectPathname'
  );

  const Metadata = ({ metadata }) => {
    //convert object into list with key pairs
    const meta_array = useMemo(
      () => [
        { name: 'State', value: metadata?.state },
        { name: 'Provider', value: metadata?.provider },
        {
          name: 'Project Purpose',
          value: metadata?.project_purpose,
        },
      ],
      [metadata]
    );

    return (
      <SimpleTable
        headers={['Name', 'Value']}
        items={meta_array}
        itemFields={[{ key: 'name' }, { key: 'value' }]}
      />
    );
  };

  const Levels = ({ levels }) => {
    console.log('hello from levels');
    return (
      <SimpleTable
        headers={['Label', 'Parameter', 'Value', 'Units']}
        items={levels}
        itemFields={[
          {
            key: 'label',
          },
          {
            key: 'parameter',
          },
          {
            key: 'latest_value',
          },
          {
            key: 'units',
          },
        ]}
      />
    );
  };

  const DataSources = ({ sources, type, provider }) => {
    // 'https://cwms-data.usace.army.mil/cwms-data/timeseries?name=BEND.Precip.Inst.1Hour.0.Best-MRBWM&office=NWDM&begin=2023-04-10T14%3A49%3A52%2B00%3A00&end=2023-04-16T14%3A49%3A52%2B00%3A00';

    const createApiUrl = (tsid) => {
      const cdaHost = 'https://cwms-data.usace.army.mil/cwms-data';
      return (
        cdaHost +
        '/' +
        type.toLowerCase() +
        `?name=${tsid}&office=${provider}&begin=${dateRange.beginDate.toISOString()}&end=${dateRange.endDate.toISOString()}`
      );
    };
    return (
      <SimpleTable
        headers={['Parameter', 'Source URL']}
        items={sources}
        itemFields={[
          {
            key: 'label',
          },
          {
            key: 'parameter',
            render: (p) => {
              return (
                <>
                  <TableLink
                    text={<BsFiletypeJson size={18} />}
                    title={p.label}
                    href={createApiUrl(p.tsid)}
                    target="_blank"
                  />
                  {/* <TableLink
                    title={p.label}
                    href={createApiUrl(p.tsid) + '&format=csv'}
                    target="_blank"
                    download={createApiUrl(p.tsid) + '&format=csv'}
                  /> */}
                </>
              );
            },
          },
        ]}
      />
    );
  };

  const DocumentLink = ({ href, title }) => {
    return (
      <>
        <a className="hover:underline" href={href}>
          <span className="mr-2 inline-block">
            <GrDocumentDownload size={16} />
          </span>
          {title}
        </a>
      </>
    );
  };

  const Documents = ({ docs }) => {
    return (
      <SimpleTable
        headers={[]}
        items={docs}
        itemFields={[
          {
            key: 'title',
            render: (docs) => {
              return <DocumentLink title={docs.title} href={docs.url} />;
            },
          },
        ]}
      />
    );
  };

  const NearbyLocations = ({ locationCoords, locations }) => {
    const allowedKinds = ['SITE', 'PROJECT', 'STREAM_LOCATION'];

    const filteredLocsWithDistance = locations
      .filter(
        (l) =>
          l.public_name && l.state !== '00' && allowedKinds.includes(l.kind)
      )
      .map((l) => {
        l['distance'] = distance(locationCoords, l.geometry?.coordinates, {
          units: 'miles',
        });

        return l;
      })
      .filter((l) => l.distance > 0 && l.distance <= 15)
      .sort((a, b) => (a.distance > b.distance ? 1 : -1));

    return (
      <SimpleTable
        headers={['Name', 'State', 'Distance (mi)']}
        items={filteredLocsWithDistance}
        itemFields={[
          {
            key: 'public_name',
            render: (l) => (
              <TableLink
                text={l.public_name}
                title={l.public_name}
                href={pathname.replace(location.slug, l.slug)}
              />
            ),
          },
          {
            key: 'state',
          },
          {
            key: null,
            render: (l) => {
              return l.distance.toFixed(2);
            },
          },
        ]}
      />
    );
  };

  // general location sections
  let sections = [
    {
      title: 'Current Values',
      content: <StackedParameterList parameters={location?.timeseries} />,
      defaultOpen: true,
    },
    {
      title: 'Metadata',
      content: <Metadata metadata={location} />,
    },
    {
      title: 'Location Data',
      content: JSON.stringify(location?.geometry),
    },
    {
      title: 'Levels',
      content: <Levels levels={location?.levels} />,
    },
    {
      title: 'Timeseries Sources',
      content: (
        <DataSources
          sources={location?.timeseries}
          type="timeseries"
          provider={location?.provider}
        />
      ),
    },
    {
      title: 'Nearby Locations',
      content: (
        <NearbyLocations
          locationCoords={location?.geometry?.coordinates}
          locations={providerLocationsItems}
        />
      ),
    },
  ];

  // Project only sections
  const projectSections = [
    {
      title: 'Documents',
      content: <Documents docs={location?.documents} />,
    },
  ];

  if (location?.kind === 'PROJECT' && location?.documents?.length) {
    sections.push(...projectSections);
  }

  return <Accordion sections={sections} />;
}

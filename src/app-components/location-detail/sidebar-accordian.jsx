import { useConnect } from 'redux-bundler-hook';
import { useMemo, useEffect, useState } from 'react';
import Accordion from '../accordion';
import { SimpleTable, TableLink } from '../table-simple';
import StackedParameterList from '../stacked-parameter-list';
import { GrDocumentDownload } from 'react-icons/gr';
import { BsFiletypeJson, BsFiletypeCsv } from 'react-icons/bs';
import distance from '@turf/distance';
import ProjectTimeseriesCharts from '../charts/location-timeseries-charts';
import { mapObjectArrayByKey } from '../../helpers/misc-helpers';

export default function LocationSideBarAccordian({
  location,
  // addonSections = [],
}) {
  const {
    timeseriesDateRange: dateRange,
    providerLocationsItems,
    pathname,
    isMapView,
    providerLocationsFloodObject: locationFloodObj,
  } = useConnect(
    'selectTimeseriesDateRange',
    'selectProviderLocationsItems',
    'selectPathname',
    'selectIsMapView',
    'selectProviderLocationsFloodObject'
  );

  const [timeseriesIds, setTimeseriesId] = useState([]);
  const [alertCount, setAlertCount] = useState();

  /** Load specific timeseries ids into state when new configurations are loaded */
  useEffect(() => {
    const timeseriesIdArray = location?.timeseries
      ? location?.timeseries?.map((ts) => {
          return ts.tsid;
        })
      : [];

    setTimeseriesId(timeseriesIdArray);
  }, [location]);

  const Alerts = ({ location }) => {
    if (locationFloodObj[location?.slug]) {
      const floodLevel = mapObjectArrayByKey(location?.levels, 'slug')[
        'stage.flood'
      ].latest_value;
      const stageValue = mapObjectArrayByKey(location?.timeseries, 'label')[
        'Stage'
      ].latest_value;
      console.log(stageValue);
      if (stageValue >= floodLevel) {
        return (
          <div className="bg-red-500 p-2 text-white">
            {`Current stage of ${stageValue} (ft) has exceeded flood stage of ${floodLevel} (ft).`}
          </div>
        );
      }
    }
    setAlertCount(0);
    return null;
  };

  const Metadata = ({ metadata }) => {
    //convert object into list with key pairs
    const meta_array = useMemo(
      () => [
        { name: 'Elevation', value: metadata?.elevation },
        { name: 'Horizontal Datum', value: metadata?.horizontal_datum },
        { name: 'Nearest City', value: metadata?.nearest_city },
        { name: 'Provider', value: metadata?.provider.toUpperCase() },
        { name: 'State', value: metadata?.state },
      ],
      [metadata]
    );

    return (
      <SimpleTable
        headers={[{ text: 'Name' }, { text: 'Value' }]}
        items={meta_array}
        itemFields={[{ key: 'name' }, { key: 'value' }]}
        options={{ shadow: true }}
      />
    );
  };

  const Levels = ({ levels }) => {
    return (
      <SimpleTable
        headers={[
          { text: 'Label' },
          { text: 'Parameter' },
          { text: 'Value' },
          { text: 'Units' },
        ]}
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
            render: (l) => {
              return l.latest_value?.toLocaleString();
            },
          },
          {
            key: 'units',
          },
        ]}
        options={{ shadow: true }}
      />
    );
  };

  const DataSources = ({ sources, provider }) => {
    // 'https://cwms-data.usace.army.mil/cwms-data/timeseries?name=BEND.Precip.Inst.1Hour.0.Best-MRBWM&office=NWDM&begin=2023-04-10T14%3A49%3A52%2B00%3A00&end=2023-04-16T14%3A49%3A52%2B00%3A00';

    const createApiUrl = (tsid) => {
      const apiUrl = import.meta.env.VITE_WATER_API_URL;

      return (
        apiUrl +
        '/providers/' +
        provider.toLowerCase() +
        `/timeseries?name=${tsid}&begin=${dateRange.beginDate.toISOString()}&end=${dateRange.endDate.toISOString()}`
      );
    };
    return (
      <SimpleTable
        headers={[{ text: 'Parameter' }, { text: 'JSON' }, { text: 'CSV' }]}
        items={sources}
        itemFields={[
          {
            key: 'label',
          },
          {
            key: 'parameter',
            render: (p) => {
              return (
                <TableLink
                  text={<BsFiletypeJson size={18} />}
                  title={p.label}
                  href={createApiUrl(p.tsid)}
                  target="_blank"
                />
              );
            },
          },
          {
            key: 'parameter',
            render: (p) => {
              return (
                <TableLink
                  text={<BsFiletypeCsv size={18} />}
                  title={p.label}
                  href={createApiUrl(p.tsid) + '&format=csv'}
                  target="_blank"
                  download={createApiUrl(p.tsid) + '&format=csv'}
                />
              );
            },
          },
        ]}
        options={{ shadow: true }}
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
        options={{ shadow: true }}
      />
    );
  };

  const NearbyLocations = ({ locationCoords, locations }) => {
    const allowedKinds = ['SITE', 'PROJECT', 'STREAM_LOCATION'];

    const filteredLocsWithDistance = locations
      .filter(
        (l) =>
          l.public_name &&
          l.timeseries?.length &&
          l.state !== '00' &&
          allowedKinds.includes(l.kind) &&
          l.geometry?.coordinates?.length === 2
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
        headers={[
          { text: 'Name' },
          { text: 'State' },
          { text: 'Distance (mi)' },
        ]}
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
              return l.distance?.toFixed(2);
            },
          },
        ]}
        options={{ shadow: true }}
      />
    );
  };

  // general location sections
  let sections = [
    {
      title: 'Alerts',
      content: <Alerts location={location} />,
      defaultOpen: false,
      display: alertCount > 0,
      count: { value: 1, className: 'bg-red-500' },
    },
    {
      title: 'Current Values',
      content: <StackedParameterList parameters={location?.timeseries} />,
      defaultOpen: true,
      display: true,
      count: { value: location?.timeseries?.length },
    },
    {
      title: 'Timeseries Charts',
      content: (
        <div className="pt-5">
          {timeseriesIds?.length ? (
            <ProjectTimeseriesCharts location={location} />
          ) : null}
        </div>
      ),
      defaultOpen: false,
      display: isMapView,
      count: { value: location?.timeseries?.length },
    },
    {
      title: 'Metadata',
      content: <Metadata metadata={location} />,
      display: true,
    },
    {
      title: 'Location Data',
      content: JSON.stringify(location?.geometry),
      display: !isMapView, //hide in map view
    },
    {
      title: 'Levels',
      content: <Levels levels={location?.levels} />,
      display: location?.levels?.length,
      count: { value: location?.levels?.length },
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
      display: true,
      count: { value: location?.timeseries?.length },
    },
    {
      title: 'Nearby Locations',
      content: (
        <NearbyLocations
          locationCoords={location?.geometry?.coordinates}
          locations={providerLocationsItems}
        />
      ),
      display: !isMapView,
    },
    {
      title: 'Documents',
      content: <Documents docs={location?.documents} />,
      display: location?.kind === 'PROJECT',
    },
  ];

  return <Accordion sections={sections.filter((s) => s.display)} />;
}

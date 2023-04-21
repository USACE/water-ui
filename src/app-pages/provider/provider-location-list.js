import React from 'react';
import { useState, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { SimpleTable, TableLink } from '../../app-components/table-simple';
import PageWrapper from '../page-wrapper';
import { FcDam } from 'react-icons/fc';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsCloudRain } from 'react-icons/bs';
import { isPrecipOnly } from '../../helpers/location-helper';
import { DeltaChange } from '../../helpers/timeseries-helper';
// import LocationFilterInput from '../../app-components/inputs/location-filter-input';

export default function ProviderLocationList() {
  const {
    pathname,
    providerLocationsItems: locations,
    providerByRoute: provider,
  } = useConnect(
    'selectPathname',
    'selectProviderLocationsItems',
    'selectProviderByRoute'
  );

  // const allowedKinds = ['SITE', 'STREAM_LOCATION', 'PROJECT', 'BASIN'];
  // const filteredLocations = locations?.filter(
  //   (l) => l.public_name && l.state !== '00' && allowedKinds.includes(l.kind)
  // );
  //const _locations = locations?.filter((l) => l?.timeseries?.length);

  const [displayedLocations, setDisplayedLocations] = useState(locations);
  const [searchQuery, setQuery] = useState('');

  useEffect(() => {
    const filteredLocations = locations?.filter((l) => l?.timeseries?.length);
    setDisplayedLocations(filteredLocations);
  }, [locations]);

  const filterBySearch = (e) => {
    const query = e.target.value;
    setQuery(query);
    if (query.length > 2) {
      console.log(e);

      const results = locations.filter((item) => {
        return (
          item.public_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
      setDisplayedLocations(results);
    } else {
      setDisplayedLocations(locations);
    }
  };

  const LocationFilterInput = () => {
    return (
      <input
        type="search"
        value={searchQuery}
        placeholder="Name Filter"
        onChange={filterBySearch}
      />
    );
  };

  return (
    <PageWrapper
      title={provider?.name || 'Loading Locations'}
      subTitle={provider?.name && `provided by ${provider?.name}`}
    >
      <div className="my-5">{LocationFilterInput()}</div>
      <SimpleTable
        headers={[
          'Kind',
          'Name',
          'Latest Data',
          'Elev',
          'Elev 24hr Change',
          'Stage',
          'State',
        ]}
        items={displayedLocations}
        itemFields={[
          {
            key: 'kind',
            render: (l) => {
              return l.kind === 'PROJECT' ? (
                <FcDam size="32" alt={l.kind} title={l.kind} />
              ) : isPrecipOnly(l) ? (
                <BsCloudRain size="28" alt={l.kind} title={l.kind} />
              ) : (
                <HiOutlineLocationMarker
                  size="28"
                  className="text-gray-400"
                  alt={l.kind}
                  title={l.kind}
                />
              );
            },
          },
          {
            key: 'public_name',
            render: (l) => {
              return (
                <TableLink
                  text={l.public_name}
                  href={''.concat(pathname, '/', `${l?.slug?.toLowerCase()}`)}
                />
              );
            },
          },
          {
            key: null,
            render: (l) => {
              return l.timeseries
                ? l.timeseries[0].parameter +
                    ' - ' +
                    l.timeseries[0]?.latest_value +
                    ' @ ' +
                    l.timeseries[0]?.latest_time
                : null;
            },
          },
          // {
          //   key: 'kind',
          //   render: (location) => {
          //     return location?.kind;
          //   },
          // },
          {
            key: null,
            render: (l) => {
              const elevObj =
                l?.timeseries?.length &&
                l?.timeseries?.filter((ts) => ts.label === 'Elevation')[0];
              return elevObj?.latest_value || null;
            },
          },
          {
            key: null,
            render: (l) => {
              const elevObj =
                l?.timeseries?.length &&
                l?.timeseries?.filter((ts) => ts.label === 'Elevation')[0];
              return (
                (
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <DeltaChange delta={elevObj?.delta24hr} />
                  </div>
                ) || null
              );
            },
          },
          {
            key: null,
            render: (l) => {
              const stageObj =
                l?.timeseries?.length &&
                l?.timeseries?.filter((ts) => ts.label === 'Stage')[0];
              return stageObj?.latest_value || null;
            },
          },

          {
            key: 'state',
          },
        ]}
      />
    </PageWrapper>
  );
}

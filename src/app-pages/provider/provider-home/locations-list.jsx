import { useState, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { FcDam } from 'react-icons/fc';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsCloudRain, BsWater } from 'react-icons/bs';
import { isPrecipOnly } from '../../../helpers/location-helper';
import {
  DeltaChange,
  GetTsObjByLabel,
} from '../../../helpers/timeseries-helper';
import { CiTempHigh } from 'react-icons/ci';
import { GiWaterfall } from 'react-icons/gi';
import { SlEnergy } from 'react-icons/sl';
import {
  SimpleTable,
  TableLink,
  TableValueWithTime,
} from '../../../app-components/table-simple';

export default function ProviderLocationList2({ locations }) {
  const debug = parseInt(import.meta.env.VITE_APP_DEBUG);
  const [displayedLocations, setDisplayedLocations] = useState(locations);
  const [searchQuery, setQuery] = useState('');

  const { pathname, providerLocationsFloodObject, providerLocationsIsLoading } =
    useConnect(
      'selectPathname',
      'selectProviderLocationsFloodObject',
      'selectProviderLocationsIsLoading'
    );

  useEffect(() => {
    // by default, only show locations with a public name and configured timeseries
    const filteredLocations = locations?.filter(
      (l) => l?.timeseries?.length && l.public_name
    );
    setDisplayedLocations(filteredLocations);
  }, [locations]);

  // @TODO: This filter needs work

  const filterBySearch = (e) => {
    const query = e.target.value;
    setQuery(query);
    if (query.length > 1) {
      if (debug) {
        console.log(e);
      }

      const results = locations?.filter((item) => {
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
        type='search'
        value={searchQuery}
        placeholder='Name Filter'
        onChange={filterBySearch}
        className='rounded'
      />
    );
  };

  const LocationIcons = ({ locationTimeseries }) => {
    //const paramArray = locationTimeseries.map((ts) => ts?.parameter);
    let icons = [];
    locationTimeseries
      ?.sort((a, b) => (a.sort_order > b.sort_order ? 1 : -1))
      .forEach((ts) => {
        if (ts?.base_parameter === 'Stage') {
          icons.push(<BsWater key={ts?.label} title={ts?.label} size={20} />);
        }
        if (ts?.label === 'Outflow' && !icons.includes(ts?.base_parameter)) {
          icons.push(
            <GiWaterfall key={ts?.label} title={ts?.label} size={20} />
          );
        }
        if (ts.base_parameter === 'Precip') {
          icons.push(
            <BsCloudRain key={ts?.label} title={ts?.label} size={20} />
          );
        }
        if (ts.base_parameter === 'Temp') {
          icons.push(
            <CiTempHigh key={ts?.label} title={ts?.label} size={20} />
          );
        }
        if (ts.base_parameter === 'Energy') {
          icons.push(<SlEnergy key={ts?.label} title={ts?.label} size={20} />);
        }
      });
    return <div className='flex space-x-2 text-gray-400'>{icons}</div>;
  };

  return (
    <>
      <div className='bg-gray-100 pb-3'>{LocationFilterInput()}</div>
      <SimpleTable
        headers={[
          { text: 'Kind' },
          { text: 'Name' },
          { text: 'Available Data', className: 'hidden lg:table-cell' },
          { text: 'Elevation/Stage', className: 'w-14 lg:w-auto' },
          { text: '24hr Change' },
          { text: 'Flood Stage' },
          { text: 'State' },
        ]}
        items={displayedLocations}
        itemFields={[
          {
            key: 'kind',
            render: (l) => {
              return l.kind === 'PROJECT' ? (
                <FcDam size='32' alt={l.kind} title={l.kind} />
              ) : isPrecipOnly(l) ? (
                <BsCloudRain size='28' alt={l.kind} title={l.kind} />
              ) : (
                <HiOutlineLocationMarker
                  size='28'
                  className='text-gray-400'
                  alt={l.kind}
                  title={l.kind}
                />
              );
            },
          },
          {
            key: 'public_name',
            className: 'block w-28 lg:w-auto truncate',
            render: (l) => {
              return (
                <TableLink
                  text={l.public_name}
                  href={''.concat(
                    pathname,
                    '/locations/',
                    `${l?.slug?.toLowerCase()}`
                  )}
                />
              );
            },
          },
          {
            key: null,
            className: 'hidden lg:table-cell',
            render: (l) => {
              return l?.timeseries?.length ? (
                <LocationIcons locationTimeseries={l?.timeseries} />
              ) : null;
            },
          },

          {
            key: null,
            render: (l) => {
              const elev = GetTsObjByLabel(l?.timeseries, 'Elevation');
              const stage = GetTsObjByLabel(l?.timeseries, 'Stage');
              return elev ? (
                <TableValueWithTime tsObj={elev} />
              ) : (
                <TableValueWithTime tsObj={stage} />
              );
            },
          },
          {
            key: null,
            render: (l) => {
              const elevChange = GetTsObjByLabel(
                l?.timeseries,
                'Elevation'
              )?.delta24hr;
              const stageChange = GetTsObjByLabel(
                l?.timeseries,
                'Stage'
              )?.delta24hr;
              return (
                <div className='flex items-baseline text-sm'>
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
              const floodStageLvl =
                l?.levels?.length &&
                l?.levels?.filter(
                  (lvl) =>
                    lvl.slug === 'stage.flood' ||
                    lvl.slug === 'stage.nws flood stage'
                )[0];
              return floodStageLvl?.latest_value ? (
                <span
                  className={`${
                    providerLocationsFloodObject[l.slug]
                      ? 'rounded border-2 border-red-300 bg-red-200 p-2'
                      : null
                  }`}
                >
                  {floodStageLvl?.latest_value}
                </span>
              ) : null;
            },
          },
          {
            key: 'state',
          },
        ]}
        options={{ shadow: true, rowBlur: providerLocationsIsLoading }}
      />
    </>
  );
}

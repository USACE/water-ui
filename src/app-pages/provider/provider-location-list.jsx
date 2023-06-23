import { useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';

export default function ProviderLocationList() {
  const { providerByRoute: provider, doUpdateUrl } = useConnect(
    'selectProviderByRoute',
    'doUpdateUrl'
  );

  useEffect(() => {
    doUpdateUrl('/overview/' + provider?.slug);
  }, [provider, doUpdateUrl]);

  return null;
}

// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useConnect } from 'redux-bundler-hook';
// import { SimpleTable, TableLink } from '../../app-components/table-simple';
// import PageWrapper from '../page-wrapper';
// import { FcDam } from 'react-icons/fc';
// import { HiOutlineLocationMarker } from 'react-icons/hi';
// import { BsCloudRain, BsWater } from 'react-icons/bs';
// import { isPrecipOnly } from '../../helpers/location-helper';
// import { DeltaChange } from '../../helpers/timeseries-helper';
// // import LocationFilterInput from '../../app-components/inputs/location-filter-input';
// import { CiTempHigh } from 'react-icons/ci';
// import { GiWaterfall } from 'react-icons/gi';

// export default function ProviderLocationList() {
//   const {
//     pathname,
//     providerLocationsItems: locations,
//     providerByRoute: provider,
//   } = useConnect(
//     'selectPathname',
//     'selectProviderLocationsItems',
//     'selectProviderByRoute'
//   );

//   // const allowedKinds = ['SITE', 'STREAM_LOCATION', 'PROJECT', 'BASIN'];
//   // const filteredLocations = locations?.filter(
//   //   (l) => l.public_name && l.state !== '00' && allowedKinds.includes(l.kind)
//   // );
//   //const _locations = locations?.filter((l) => l?.timeseries?.length);

//   const [displayedLocations, setDisplayedLocations] = useState(locations);
//   const [searchQuery, setQuery] = useState('');

//   useEffect(() => {
//     const filteredLocations = locations?.filter(
//       (l) => l?.timeseries?.length && l.public_name
//     );
//     setDisplayedLocations(filteredLocations);
//   }, [locations]);

//   // @TODO: This filter needs work

//   const filterBySearch = (e) => {
//     const query = e.target.value;
//     setQuery(query);
//     if (query.length > 1) {
//       console.log(e);

//       const results = locations.filter((item) => {
//         return (
//           item.public_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
//         );
//       });
//       setDisplayedLocations(results);
//     } else {
//       setDisplayedLocations(locations);
//     }
//   };

//   const LocationFilterInput = () => {
//     return (
//       <input
//         type="search"
//         value={searchQuery}
//         placeholder="Name Filter"
//         onChange={filterBySearch}
//       />
//     );
//   };

//   const LocationIcons = ({ locationTimeseries }) => {
//     //const paramArray = locationTimeseries.map((ts) => ts?.parameter);
//     let icons = [];
//     locationTimeseries
//       ?.sort((a, b) => (a.sort_order > b.sort_order ? 1 : -1))
//       .forEach((ts) => {
//         if (ts?.base_parameter === 'Stage') {
//           icons.push(<BsWater key={ts?.label} title={ts?.label} size={20} />);
//         }
//         if (
//           ts?.base_parameter === 'Flow' &&
//           !icons.includes(ts?.base_parameter)
//         ) {
//           icons.push(
//             <GiWaterfall key={ts?.label} title={ts?.label} size={20} />
//           );
//         }
//         if (ts.base_parameter === 'Precip') {
//           icons.push(
//             <BsCloudRain key={ts?.label} title={ts?.label} size={20} />
//           );
//         }
//         if (ts.base_parameter === 'Temp') {
//           icons.push(
//             <CiTempHigh key={ts?.label} title={ts?.label} size={20} />
//           );
//         }
//       });
//     return <div className="flex space-x-2 text-gray-400">{icons}</div>;
//   };

//   return (
//     <PageWrapper
//       title={provider?.name || 'Loading Locations'}
//       subTitle={provider?.name && `provided by ${provider?.name}`}
//     >
//       <div className="my-5">{LocationFilterInput()}</div>
//       <SimpleTable
//         headers={[
//           'Kind',
//           'Name',
//           'Available Data',
//           'Latest Data',
//           'Elev',
//           'Elev 24hr Change',
//           'Stage',
//           'Stage 24hr Change',
//           'State',
//         ]}
//         items={displayedLocations}
//         itemFields={[
//           {
//             key: 'kind',
//             render: (l) => {
//               return l.kind === 'PROJECT' ? (
//                 <FcDam size="32" alt={l.kind} title={l.kind} />
//               ) : isPrecipOnly(l) ? (
//                 <BsCloudRain size="28" alt={l.kind} title={l.kind} />
//               ) : (
//                 <HiOutlineLocationMarker
//                   size="28"
//                   className="text-gray-400"
//                   alt={l.kind}
//                   title={l.kind}
//                 />
//               );
//             },
//           },
//           {
//             key: 'public_name',
//             render: (l) => {
//               return (
//                 <TableLink
//                   text={l.public_name}
//                   href={''.concat(pathname, '/', `${l?.slug?.toLowerCase()}`)}
//                 />
//               );
//             },
//           },
//           {
//             key: null,
//             render: (l) => {
//               return l?.timeseries?.length ? (
//                 <LocationIcons locationTimeseries={l?.timeseries} />
//               ) : null;
//             },
//           },
//           {
//             key: null,
//             render: (l) => {
//               return l.timeseries?.sort((a, b) =>
//                 a.sort_order > b.sort_order ? 1 : -1
//               )
//                 ? l.timeseries[0]?.latest_time
//                 : null;
//             },
//           },

//           {
//             key: null,
//             render: (l) => {
//               const elevObj =
//                 l?.timeseries?.length &&
//                 l?.timeseries?.filter((ts) => ts.label === 'Elevation')[0];
//               return elevObj?.latest_value || null;
//             },
//           },
//           {
//             key: null,
//             render: (l) => {
//               const elevObj =
//                 l?.timeseries?.length &&
//                 l?.timeseries?.filter((ts) => ts.label === 'Elevation')[0];
//               return (
//                 (
//                   <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
//                     <DeltaChange delta={elevObj?.delta24hr} />
//                   </div>
//                 ) || null
//               );
//             },
//           },
//           {
//             key: null,
//             render: (l) => {
//               const stageObj =
//                 l?.timeseries?.length &&
//                 l?.timeseries?.filter((ts) => ts.label === 'Stage')[0];
//               return stageObj?.latest_value || null;
//             },
//           },
//           {
//             key: null,
//             render: (l) => {
//               const stageObj =
//                 l?.timeseries?.length &&
//                 l?.timeseries?.filter((ts) => ts.label === 'Stage')[0];
//               return (
//                 (
//                   <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
//                     <DeltaChange delta={stageObj?.delta24hr} />
//                   </div>
//                 ) || null
//               );
//             },
//           },
//           {
//             key: 'state',
//           },
//         ]}
//       />
//     </PageWrapper>
//   );
// }

import StatsWIcon from '../stats-with-icon';

//import { BiWater } from 'react-icons/bi';
import { MdWaterDrop } from 'react-icons/md';
import { FaDatabase, FaFaucet } from 'react-icons/fa';
import {
  GetProjectFloodStorage,
  GetProjectConStorage,
  GetProjectTotalStorage,
} from '../../helpers/project-helper';

export default function ProjectStats({ location }) {
  if (!location || !location?.levels?.length || !location?.timeseries?.length) {
    return;
  }

  const debug = parseInt(import.meta.env.VITE_APP_DEBUG);
  const FloodStorageUtilized = GetProjectFloodStorage(location);
  const ConservationStorageUtilized = GetProjectConStorage(location);
  const TotalProjectStorageUtilized = GetProjectTotalStorage(location);

  const FloodStorageUtilizedDisplay =
    FloodStorageUtilized < 0
      ? 0 + '%'
      : FloodStorageUtilized > 0
      ? FloodStorageUtilized?.toFixed(0) + '%'
      : 'N/A';

  const ConservationStorageUtilizedDisplay =
    ConservationStorageUtilized < 0
      ? 0 + '%'
      : ConservationStorageUtilized > 100
      ? 100 + '%'
      : ConservationStorageUtilized > 0
      ? ConservationStorageUtilized?.toFixed(0) + '%'
      : 'N/A';

  const TotalProjectStorageUtilizedDisplay =
    TotalProjectStorageUtilized > 0
      ? TotalProjectStorageUtilized?.toFixed(0) + '%'
      : 'N/A';

  if (debug) {
    console.log(
      `Project Stats: TotalProjectStorageUtilized is: ${TotalProjectStorageUtilized}`
    );
  }

  const stats = [
    {
      id: 1,
      name: 'Flood Storage Utilized',
      stat: FloodStorageUtilizedDisplay,
      icon: MdWaterDrop,
      // change: '0.8%',
      // changeType: 'increase',
    },
    {
      id: 2,
      name: 'Conservation Storage Utilized',
      stat: ConservationStorageUtilizedDisplay,
      icon: FaFaucet,
      // change: '5.4%',
      // changeType: 'increase',
    },
    {
      id: 3,
      name: 'Total Storage Utilized',
      stat: TotalProjectStorageUtilizedDisplay,
      icon: FaDatabase,
      // change: '3.2%',
      // changeType: 'decrease',
    },
  ];

  return (
    <>
      <StatsWIcon stats={stats} />
    </>
  );
}

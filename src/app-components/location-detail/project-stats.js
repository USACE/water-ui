import StatsWIcon from '../stats-with-icon';

//import { BiWater } from 'react-icons/bi';
import { MdWaterDrop } from 'react-icons/md';
import { FaDatabase } from 'react-icons/fa';
import {
  GetProjectFloodStorage,
  GetProjectConStorage,
  GetProjectTotalStorage,
} from '../../helpers/project-helper';

export default function ProjectStats({ location }) {
  if (!location || !location?.levels?.length || !location?.timeseries?.length) {
    return;
  }

  const FloodStorageUtilized = GetProjectFloodStorage(location);
  const ConservationStorageUtilized = GetProjectConStorage(location);

  const FloodStorageUtilizedDisplay =
    FloodStorageUtilized < 0
      ? 0 + '%'
      : FloodStorageUtilized > 0
      ? FloodStorageUtilized.toFixed(0) + '%'
      : 'N/A';

  const ConservationStorageUtilizedDisplay =
    ConservationStorageUtilized < 0
      ? 0 + '%'
      : ConservationStorageUtilized > 100
      ? 100 + '%'
      : ConservationStorageUtilized > 0
      ? ConservationStorageUtilized.toFixed(0) + '%'
      : 'N/A';

  const stats = [
    {
      id: 1,
      name: 'Flood Storage Utilized',
      stat: FloodStorageUtilizedDisplay,
      icon: FaDatabase,
      // change: '0.8%',
      // changeType: 'increase',
    },
    {
      id: 2,
      name: 'Conservation Storage Utilized',
      stat: ConservationStorageUtilizedDisplay,
      icon: MdWaterDrop,
      // change: '5.4%',
      // changeType: 'increase',
    },
    {
      id: 3,
      name: 'Total Storage Utilized',
      stat: GetProjectTotalStorage(location)?.toFixed(0) + '%',
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

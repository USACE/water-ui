import StatsWIcon from '../stats-with-icon';

import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
//import { BiWater } from 'react-icons/bi';
import { MdWaterDrop } from 'react-icons/md';
import { FaDatabase } from 'react-icons/fa';
import {
  GetProjectFloodStorage,
  GetProjectConStorage,
} from '../../helpers/project-helper';

export default function ProjectStats({ location }) {
  if (!location || !location?.levels?.length || !location?.timeseries?.length) {
    return;
  }

  const FloodStorageUtilized = GetProjectFloodStorage(location);
  const ConservationStorageUtilized = GetProjectConStorage(location);

  const stats = [
    {
      id: 1,
      name: 'Flood Storage Utilized',
      stat: FloodStorageUtilized
        ? FloodStorageUtilized.toFixed(1) + '%'
        : 'N/A',
      icon: FaDatabase,
      // change: '0.8%',
      // changeType: 'increase',
    },
    {
      id: 2,
      name: 'Conservation Storage Utilized',
      stat:
        ConservationStorageUtilized && ConservationStorageUtilized >= 100
          ? '100%'
          : ConservationStorageUtilized && ConservationStorageUtilized < 100
          ? ConservationStorageUtilized.toFixed(1) + '%'
          : 'N/A',
      icon: MdWaterDrop,
      // change: '5.4%',
      // changeType: 'increase',
    },
    {
      id: 3,
      name: 'undecided stat',
      stat: '24.57%',
      icon: CursorArrowRaysIcon,
      change: '3.2%',
      changeType: 'decrease',
    },
  ];

  return (
    <>
      <StatsWIcon stats={stats} />
    </>
  );
}

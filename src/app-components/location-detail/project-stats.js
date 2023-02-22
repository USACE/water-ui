import StatsWIcon from '../stats-with-icon';
import { ProjectFloodStoragePercent } from '../../helpers/project-helper';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
//import { BiWater } from 'react-icons/bi';
import { MdWaterDrop } from 'react-icons/md';
import { FaDatabase } from 'react-icons/fa';
import { mapObjectArrayByKey } from '../../helpers/misc-helpers';

export default function ProjectStats({ location }) {
  if (!location || !location?.levels?.length || !location?.timeseries?.length) {
    return;
  }

  const levelsMap = mapObjectArrayByKey(location?.levels, 'label');
  const timeseriesMap = mapObjectArrayByKey(location?.timeseries, 'label');

  const floodTop = levelsMap['Top of Flood']?.latest_value || null;
  const floodBottom = levelsMap['Bottom of Flood']?.latest_value || null;
  const currentPoolElev = timeseriesMap['Pool Elevation']?.latest_value || null;

  const FloodStorageUtilized = ProjectFloodStoragePercent(
    floodTop,
    floodBottom,
    currentPoolElev
  );

  const stats = [
    {
      id: 1,
      name: 'Flood Storage Utilized',
      stat: FloodStorageUtilized
        ? FloodStorageUtilized.toFixed(1) + '%'
        : 'N/A',
      icon: FaDatabase,
      change: '0.8%',
      changeType: 'increase',
    },
    {
      id: 2,
      name: 'Conservation Storage Utilized',
      stat: '58.16%',
      icon: MdWaterDrop,
      change: '5.4%',
      changeType: 'increase',
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

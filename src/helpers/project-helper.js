import { mapObjectArrayByKey } from '../helpers/misc-helpers';

/**
 * Calculates project flood storage utilized
 * @param  {Number} topFlood Top of Flood level value
 * @param  {Number} bottomFlood Bottom of Flood level value
 * @param  {Number} currentVal The current storage value
 * @return {Number}          The percent of Flood Storage Utilized
 */
const ProjectFloodStoragePercent = (topFlood, bottomFlood, currentVal) => {
  if (!topFlood || !bottomFlood || !currentVal) {
    return null;
  }
  return (1 - (topFlood - currentVal) / (topFlood - bottomFlood)) * 100;
};
// ---------------------------------------------------------------------

/**
 * Calculates project conservation storage utilized
 * @param  {Number} topCon Top of Conservation level value
 * @param  {Number} bottomCon Bottom of Conservation level value
 * @param  {Number} currentVal The current storage value
 * @return {Number}          The percent of Conservation Storage Utilized
 */
const ProjectConservationStoragePercent = (topCon, bottomCon, currentVal) => {
  if (!topCon || !bottomCon || !currentVal) {
    return null;
  }
  return (1 - (topCon - currentVal) / (topCon - bottomCon)) * 100;
};
// ---------------------------------------------------------------------

const GetProjectFloodStorage = (location) => {
  const levelsMap = mapObjectArrayByKey(location?.levels, 'slug');
  const timeseriesMap = mapObjectArrayByKey(location?.timeseries, 'label');

  const floodTop =
    levelsMap['stor.top of flood']?.latest_value ||
    levelsMap['stor.top of flood control']?.latest_value ||
    null;

  const floodBottom =
    levelsMap['stor.bottom of flood']?.latest_value ||
    levelsMap['stor.bottom of flood control']?.latest_value ||
    levelsMap['stor.top of normal']?.latest_value ||
    levelsMap['stor.top of conservation']?.latest_value ||
    null;
  // Current Storage Value
  const currentFloodStorage =
    timeseriesMap['Flood Storage']?.latest_value || null;

  console.log('--FloodStorageUtilized--');
  console.log(`Top of Flood Storage: ${floodTop}`);
  console.log(`Bottom of Flood Storage: ${floodBottom}`);
  console.log(`Curent Flood Storage: ${currentFloodStorage}`);
  console.log('---end--');

  return ProjectFloodStoragePercent(floodTop, floodBottom, currentFloodStorage);
};
// ---------------------------------------------------------------------

const GetProjectConStorage = (location) => {
  const levelsMap = mapObjectArrayByKey(location?.levels, 'slug');
  const timeseriesMap = mapObjectArrayByKey(location?.timeseries, 'label');

  const conTop =
    levelsMap['stor.top of conservation']?.latest_value ||
    levelsMap['stor.bottom of flood']?.latest_value ||
    null;
  const conBottom =
    levelsMap['stor.bottom of conservation']?.latest_value ||
    levelsMap['stor.top of inactive']?.latest_value ||
    null;
  // Current Storage Value
  const currentConStorage =
    timeseriesMap['Conservation Storage']?.latest_value ||
    timeseriesMap['Flood Storage']?.latest_value ||
    null;

  console.log('--ConservationStorageUtilized--');
  console.log(`Top of Conservation Storage: ${conTop}`);
  console.log(`Bottom of Conservation Storage: ${conBottom}`);
  console.log(`Curent Conservation Storage: ${currentConStorage}`);
  console.log('---end--');

  return ProjectConservationStoragePercent(
    conTop,
    conBottom,
    currentConStorage
  );
};
// ---------------------------------------------------------------------

const GetProjectTotalStorage = (location) => {
  const levelsMap = mapObjectArrayByKey(location?.levels, 'slug');
  const timeseriesMap = mapObjectArrayByKey(location?.timeseries, 'label');

  const storTop = levelsMap['stor.top of flood']?.latest_value || null;
  // bottom of storage could be 0 as the streambed
  const storBottom = !isNaN(levelsMap['stor.streambed']?.latest_value)
    ? levelsMap['stor.streambed']?.latest_value
    : null;

  console.log(`--storTop = ${storTop}--`);
  console.log(`--storBottom = ${storBottom}--`);

  const currentVal = () => {
    if (
      timeseriesMap['Flood Storage']?.latest_value > 0 &&
      timeseriesMap['Conservation Storage']?.latest_value > 0
    ) {
      // both storage timeseries are populated, check if they are equal
      if (
        timeseriesMap['Flood Storage']?.latest_value ===
        timeseriesMap['Conservation Storage']?.latest_value
      ) {
        // they are both equal, so we can use either value (it's probably just total storage value)
        return timeseriesMap['Flood Storage']?.latest_value;
      } else {
        // Flood and Conservation current values are not equal, which means the office is computing
        // storage for the pools and not the total project
        return null;
      }
    } else {
      // both storage values are not populated, try at least one of available
      return (
        timeseriesMap['Flood Storage']?.latest_value ||
        timeseriesMap['Conservation Storage']?.latest_value ||
        null
      );
    }
  };

  const projectTotalStorage =
    (1 - (storTop - currentVal()) / (storTop - storBottom)) * 100;

  console.log('--projectTotalStorage--');
  console.log(`Top of Storage: ${storTop}`);
  console.log(`Bottom of Storage: ${storBottom}`);
  console.log(`Curent Storage: ${currentVal()}`);
  console.log(`Computed Total Project Storage: ${projectTotalStorage}`);
  console.log('---end--');

  return projectTotalStorage;
};

/**
 * Determines if a location has the required levels to create the dam profile chart
 * @param {object} l
 * @returns {boolean}
 */
const hasRequiredLevels = (l) => {
  const levelsMap = mapObjectArrayByKey(l?.levels, 'label');
  if (levelsMap['Top of Dam'] && levelsMap['Streambed']) {
    return true;
  }
  console.log('--does not have required levels--');
  return false;
};
// ---------------------------------------------------------------------

export {
  ProjectFloodStoragePercent,
  ProjectConservationStoragePercent,
  hasRequiredLevels,
  GetProjectFloodStorage,
  GetProjectConStorage,
  GetProjectTotalStorage,
};

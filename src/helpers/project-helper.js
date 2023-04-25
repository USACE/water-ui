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

export {
  ProjectFloodStoragePercent,
  ProjectConservationStoragePercent,
  hasRequiredLevels,
};

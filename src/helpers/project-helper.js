/**
 * Calculates project flood storage utilized
 * @param  {Number} topFlood Top of Flood level value
 * @param  {Number} bottomFlood Bottom of Flood level value
 * @param  {Number} currentVal The current pool elevation value
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
 * @param  {Number} currentVal The current pool elevation value
 * @return {Number}          The percent of Conservation Storage Utilized
 */
const ProjectConservationStoragePercent = (topCon, bottomCon, currentVal) => {
  if (!topCon || !bottomCon || !currentVal) {
    return null;
  }
  return (1 - (topCon - currentVal) / (topCon - bottomCon)) * 100;
};

export { ProjectFloodStoragePercent, ProjectConservationStoragePercent };

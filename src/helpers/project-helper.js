/**
 * Caculates project flood storage utilized
 * @param  {Number} topFlood Top of Flood level value
 * @param  {Number} bottomFlood Bottom of Flood level value
 * @param  {Number} currentVal The current pool elevation value
 * @return {Number}          The percent of Flood Storage Utilized
 */
const ProjectFloodStoragePercent = (topFlood, bottomFlood, currentVal) => {
  return (1 - (topFlood - currentVal) / (topFlood - bottomFlood)) * 100;
};

export { ProjectFloodStoragePercent };

const isPrecipOnly = (location) => {
  if (
    location?.timeseries?.length === 1 &&
    location?.timeseries[0]?.label === 'Precipitation'
  ) {
    return true;
  }
  return false;
};

const locationTitle = (location) => {
  if (
    location?.state &&
    location?.state !== '00' &&
    !location?.public_name?.includes(location?.state) &&
    location?.kind !== 'PROJECT'
  ) {
    return location.public_name + ', ' + location?.state;
  }
  return location?.public_name;
};

export { isPrecipOnly, locationTitle };

const isPrecipOnly = (location) => {
  if (
    location?.timeseries?.length === 1 &&
    location?.timeseries[0]?.label === 'Precipitation'
  ) {
    return true;
  }
  return false;
};

export { isPrecipOnly };

import { createSelector } from 'redux-bundler';
import { mapObjectArrayByKey } from '../helpers/misc-helpers';

const providerLocationsFloodBundle = {
  name: 'providerLocationsFlood',

  getReducer: () => {
    const initialData = {};

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case 'PROVIDER_LOCATIONS_FLOOD_UPDATED':
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },
  selectProviderLocationsFlood: createSelector(
    'selectProviderLocationsItems',
    (locations) => {
      const locationsWithFlood = locations.filter(
        (loc) =>
          loc?.levels?.length &&
          loc?.levels.filter(
            (lvl) =>
              lvl.slug === 'stage.flood' || lvl.slug === 'stage.nws flood stage'
          )
      );
      const stagesAtAboveFlood = locationsWithFlood.filter((loc) => {
        const timeseriesMap = mapObjectArrayByKey(loc?.timeseries, 'label');
        const levelsMap = mapObjectArrayByKey(loc?.levels, 'slug');
        const currentStageValue = timeseriesMap['Stage']?.latest_value;
        const floodStage =
          levelsMap['stage.flood']?.latest_value ||
          levelsMap['stage.nws flood stage']?.latest_value ||
          null;

        // console.log(`--${loc.public_name}--`);
        // console.log(`currentStageValue: ${currentStageValue}`);
        // console.log(`floodStage: ${floodStage}`);

        if (
          currentStageValue &&
          !isNaN(currentStageValue) &&
          floodStage &&
          !isNaN(floodStage)
        ) {
          return currentStageValue >= floodStage;
        }
        return false;
      });
      //return { locations };
      return stagesAtAboveFlood;
    }
  ),
  selectProviderLocationsFloodObject: createSelector(
    'selectProviderLocationsFlood',
    (floodingLocations) => {
      let obj = {};
      floodingLocations.forEach((loc) => {
        obj[loc.slug] = loc;
      });
      return obj;
    }
  ),
};

export default providerLocationsFloodBundle;

import { createSelector } from 'redux-bundler';
import { mapObjectArrayByKey } from '../helpers/misc-helpers';

const providerProjectsBundle = {
  name: 'providerProjects',

  selectProviderProjects: createSelector(
    'selectProviderLocationsItems',
    (locations) => {
      return locations?.filter((loc) => loc?.kind === 'PROJECT');
    }
  ),
  selectProviderProjectsWithFloodStorage: createSelector(
    'selectProviderProjects',
    (projects) => {
      const projectsWithFloodStorage = projects.filter((p) => {
        const levelsMap = mapObjectArrayByKey(p?.levels, 'slug');
        if (
          levelsMap['stor.bottom of flood'] ||
          levelsMap['stor.top of flood'] ||
          levelsMap['stor.top of flood control'] ||
          levelsMap['elev.top of flood'] ||
          levelsMap['elev.top of flood control']
        ) {
          return p;
        }
        return false;
      });
      return projectsWithFloodStorage;
    }
  ),
};

export default providerProjectsBundle;

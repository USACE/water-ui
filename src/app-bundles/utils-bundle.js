import { createSelector } from 'redux-bundler';

const utilsBundle = {
  name: 'utilsBundle',

  selectIsMapView: createSelector('selectPathname', (pathname) => {
    if (pathname.includes('/map')) {
      return true;
    }
    return false;
  }),
};

export default utilsBundle;

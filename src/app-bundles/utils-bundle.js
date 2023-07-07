import { createSelector } from 'redux-bundler';

const utilsBundle = {
  name: 'utils',

  // getReducer: () => {
  //   const initialData = {
  //     disclaimer_acknowledged: false,
  //   };

  //   return (state = initialData, { type, payload }) => {
  //     switch (type) {
  //       case 'DISCLAIMER_ACKNOWLEDGED':
  //         localStorage.setItem('disclaimer_acknowledged', true);
  //         return { ...state, ...payload };
  //       default:
  //         return state;
  //     }
  //   };
  // },

  selectIsMapView: createSelector('selectPathname', (pathname) => {
    if (pathname.includes('/map')) {
      return true;
    }
    return false;
  }),

  selectIsDisclaimerAcknowledged: () => {
    if (localStorage.getItem('disclaimer_acknowledged')) {
      return true;
    }
  },

  doDisclaimerAcknowledge: () => {
    localStorage.setItem('disclaimer_acknowledged', true);
    return ({ dispatch }) => {
      dispatch({
        type: null,
        payload: null,
      });
    };
  },
};
export default utilsBundle;

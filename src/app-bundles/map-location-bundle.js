import { createSelector } from 'redux-bundler';

const mapLocationBundle = {
  name: 'mapLocation',

  getReducer: () => {
    const initialData = {
      provider: null,
      slug: null,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case 'MAP_SELECTED_LOCATION_UPDATED':
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },

  selectMapLocationSelectedProvider: (state) => {
    return state.mapLocation.provider;
  },
  selectMapLocationSelectedSlug: (state) => {
    return state.mapLocation.slug;
  },

  selectMapLocationSelected: createSelector(
    'selectMapLocationSelectedProvider',
    'selectMapLocationSelectedSlug',
    (provider, slug) => {
      return { provider, slug };
    }
  ),

  doMapLocationSelectionUpdate: (provider, slug) => {
    return ({ dispatch }) => {
      dispatch({
        type: 'MAP_SELECTED_LOCATION_UPDATED',
        payload: { provider, slug },
      });
    };
  },
};

export default mapLocationBundle;

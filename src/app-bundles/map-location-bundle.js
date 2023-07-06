import { createSelector } from 'redux-bundler';

const mapLocationBundle = {
  name: 'mapLocation',

  getReducer: () => {
    const initialData = {
      provider: null,
      slug: null,
      geometry: null,
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
  selectMapLocationSelectedGeometry: (state) => {
    return state.mapLocation.geometry;
  },

  selectMapLocationSelected: createSelector(
    'selectMapLocationSelectedProvider',
    'selectMapLocationSelectedSlug',
    'selectMapLocationSelectedGeometry',
    (provider, slug, geometry) => {
      return { provider, slug, geometry };
    }
  ),

  doMapLocationSelectionUpdate: (provider, slug, geometry) => {
    return ({ dispatch }) => {
      dispatch({
        type: 'MAP_SELECTED_LOCATION_UPDATED',
        payload: { provider, slug, geometry },
      });
    };
  },
};

export default mapLocationBundle;

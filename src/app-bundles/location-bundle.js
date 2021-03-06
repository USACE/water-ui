import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'location',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: '',
  getTemplate: `${apiUrl}/locations?office_id=:officeId`,
  putTemplate: '',
  postTemplate: '',
  deleteTemplate: '',
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: ['selectOfficeIdByRoute'],
  forceFetchActions: [],
  sortBy: 'name',
  sortAsc: true,
  mergeItems: true,
  state: { _displayAll: false },
  addons: {
    selectLocationByOfficeId: createSelector(
      'selectLocationItems',
      'selectOfficeItemsObjectById',
      (locations, officeObj) => {
        if (!Object.keys(officeObj).length) {
          return {};
        }
        const obj = {};
        locations.forEach((l) => {
          if (!obj.hasOwnProperty(l.office_id)) {
            obj[l.office_id] = [l];
          } else {
            obj[l.office_id].push(l);
          }
        });
        return obj;
      }
    ),
    selectLocationItemsActive: createSelector(
      'selectOfficeByRoute',
      'selectLocationByOfficeId',
      (office, locationByOffice) => {
        if (!locationByOffice || !Object.keys(locationByOffice).length) {
          return [];
        }
        // If selected office does not have any locations
        return office ? locationByOffice[office.id] || [] : [];
      }
    ),
    selectLocationDisplayAll: (state) => state.location._displayAll,
    doLocationToggleDisplayAll:
      () =>
      ({ dispatch }) => {
        dispatch({ type: 'LOCATION_TOGGLE_DISPLAY_ALL' });
      },
  },
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case 'LOCATION_TOGGLE_DISPLAY_ALL':
        return { ...state, _displayAll: !state._displayAll };
      default:
        return state;
    }
  },
});

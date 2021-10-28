import { createSelector } from 'redux-bundler';
import createRestBundle from '../../app-bundles/create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'watershedDetail',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'watershedSlug',
  getTemplate: `${apiUrl}/watersheds`,
  putTemplate: `:/`,
  postTemplate: `:/`,
  deleteTemplate: `:/`,
  fetchActions: [''],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: 'name',
  sortAsc: true,
  addons: {
    selectWatershedDetailSelected: createSelector(
      'selectWatershedDetailItemsObject',
      'selectSelectedKeys',
      (obj, keys) => {
        if (keys.provider !== 'watershed' || !obj[keys.uid]) {
          return null;
        }
        return obj[keys.uid];
      }
    ),
  },
});

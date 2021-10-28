import createRestBundle from '../../app-bundles/create-rest-bundle';
import { createSelector } from 'redux-bundler';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'watershed',
  uid: 'slug',
  prefetch: true,
  staleAfter: 30000, //5min
  persist: false,
  routeParam: 'watershedSlug',
  getTemplate: `${apiUrl}/watersheds`,
  putTemplate: `${apiUrl}/watersheds/:item.id`,
  postTemplate: `${apiUrl}/watersheds`,
  deleteTemplate: `${apiUrl}/watersheds/:item.id`,
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: 'name',
  sortAsc: true,
  addons: {
    // @TODO: this should use office_id, but requires API work on the Cumulus API
    selectWatershedByOfficeSymbol: createSelector(
      'selectWatershedItems',
      (watersheds) => {
        const obj = {};
        watersheds.forEach((w) => {
          if (!obj.hasOwnProperty(w.office_symbol)) {
            obj[w.office_symbol] = [w];
          } else {
            obj[w.office_symbol].push(w);
          }
        });
        return obj;
      }
    ),
    // @TODO: this should use office_id, but requires API work on the Cumulus API
    selectWatershedItemsActive: createSelector(
      'selectOfficeByRoute',
      'selectWatershedByOfficeSymbol',
      'selectWatershedItemsObject',
      'selectQueryObject',
      (office, watershedByOffice, watershedObj, queryObject) => {
        if (
          !watershedByOffice ||
          !Object.keys(watershedByOffice).length ||
          !watershedObj ||
          !Object.keys(watershedObj).length
        ) {
          return [];
        }
        //If query param has 'watershed', return watershed for given slug
        if (queryObject.hasOwnProperty('watershed')) {
          return [watershedObj[queryObject.watershed]];
        }

        // If selected office does not have any locations
        return office ? watershedByOffice[office.symbol] || [] : [];
      }
    ),
    doWatershedShapefileUpload:
      ({ id, file }) =>
      ({ dispatch, store }) => {
        const formData = new FormData();
        formData.append('file', file);

        fetch(
          `${process.env.REACT_APP_WATER_API_URL}/watersheds/${id}/shapefile_uploads`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${store.selectAuthToken()}`,
            },
            body: formData,
          }
        );
      },
  },
});

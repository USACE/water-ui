import createRestBundle from '@usace/create-rest-bundle';
import { createSelector } from 'redux-bundler';
import distance from '@turf/distance';

const apiUrl = import.meta.env.VITE_WATER_API_URL;

/* 
    How is this different from 'provider-location-bundle ??
    This bundle helps get the locations when you know the provider,
    but don't need to (or can't) provide the location_slug.
*/

export default createRestBundle({
  name: 'providerLocations',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0,
  persist: true,
  routeParam: 'provider_slug',
  getTemplate: `${apiUrl}/providers/:provider_slug/locations`,
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: [],
  forceFetchActions: ['URL_UPDATED'],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {
    selectProviderLocationsNearby: createSelector(
      'selectProviderLocationsItems',
      'selectProviderLocationByRoute',
      (providerLocations, location) => {
        if (
          !providerLocations ||
          !location ||
          !location?.geometry?.coordinates
        ) {
          return [];
        }
        const allowedKinds = ['SITE', 'PROJECT', 'STREAM_LOCATION'];

        return providerLocations
          .filter(
            (l) =>
              l.public_name &&
              l.timeseries?.length &&
              l.state !== '00' &&
              allowedKinds.includes(l.kind) &&
              l?.geometry?.coordinates?.length === 2
          )
          .map((l) => {
            l['distance'] = distance(
              location?.geometry?.coordinates,
              l?.geometry?.coordinates,
              {
                units: 'miles',
              }
            );

            return l;
          })
          .filter((l) => l.distance > 0 && l.distance <= 15)
          .sort((a, b) => (a.distance > b.distance ? 1 : -1));
      }
    ),
  },
});

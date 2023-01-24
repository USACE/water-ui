import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_MOCK_API_URL;

/* 
    How is this different from 'provider-location-bundle ??
    This bundle helps get the locations when you know the provider,
    but don't need to (or can't) provide the location_slug.
*/

export default createRestBundle({
  name: 'providerLocations',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'provider_slug',
  // getTemplate: `${apiUrl}/locations?provider=:provider_slug`,
  getTemplate: `${apiUrl}/providers/:provider_slug/locations`,
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: [],
  forceFetchActions: ['URL_UPDATED'],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});

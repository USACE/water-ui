import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_MOCK_API_URL;

export default createRestBundle({
  name: 'providerLocation',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'location_slug',
  // getTemplate: `${apiUrl}/locations?provider=:provider_slug`,
  getTemplate: `${apiUrl}/providers/:provider_slug/locations/:location_slug`,
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: [],
  forceFetchActions: ['URL_UPDATED'],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});

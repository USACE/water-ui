import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'providerLocation',
  uid: 'slug',
  prefetch: true,
  staleAfter: 300000, //5min
  persist: true,
  routeParam: 'location_slug',
  getTemplate: `${apiUrl}/providers/:provider_slug/locations/:location_slug`,
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: [],
  forceFetchActions: ['URL_UPDATED'],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});

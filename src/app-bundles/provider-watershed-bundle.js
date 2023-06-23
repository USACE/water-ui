import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = import.meta.env.VITE_WATER_API_URL;

export default createRestBundle({
  name: 'providerWatershed',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'watershed_slug',
  getTemplate: `${apiUrl}/providers/:provider_slug/watersheds/:watershed_slug`,
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: [],
  forceFetchActions: ['URL_UPDATED'],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});

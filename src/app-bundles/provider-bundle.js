import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'provider',
  uid: 'slug',
  prefetch: true,
  staleAfter: 86400000, //24 hrs
  persist: true,
  routeParam: 'provider_slug',
  getTemplate: `${apiUrl}/providers`,
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});

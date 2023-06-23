import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = import.meta.env.VITE_WATER_API_URL;

export default createRestBundle({
  name: 'provider',
  uid: 'slug',
  prefetch: true,
  staleAfter: 3600000, //1 hr
  persist: true,
  routeParam: 'provider_slug',
  getTemplate: `${apiUrl}/providers`,
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});

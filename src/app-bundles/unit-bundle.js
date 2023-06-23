import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = import.meta.env.VITE_WATER_API_URL;

export default createRestBundle({
  name: 'unit',
  uid: 'parameter_id',
  prefetch: true,
  staleAfter: 259200000, //3 days
  persist: true,
  routeParam: '',
  getTemplate: `${apiUrl}/units`,
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});

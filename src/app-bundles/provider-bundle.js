import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'provider',
  uid: 'provider',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'provider',
  getTemplate: `${apiUrl}/providers`,
  // putTemplate: `${apiUrl}/visualizations/:item.id`,
  // postTemplate: `${apiUrl}`,
  // deleteTemplate: `${apiUrl}/products/:item.id`,
  fetchActions: [],
  urlParamSelectors: [],
  allowRoles: ['*.*'],
  disallowRoles: [],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});

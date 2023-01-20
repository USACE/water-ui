import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_MOCK_API_URL;

export default createRestBundle({
  name: 'watershed',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'watershed_slug',
  getTemplate: `${apiUrl}/watersheds`,
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});

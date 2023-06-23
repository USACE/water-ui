import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = import.meta.env.VITE_WATER_API_URL;

/* 
    How is this different from 'provider-watershed-bundle ??
    This bundle helps get the watersheds when you know the provider,
    but don't need to (or can't) provide the watershed_slug.
*/

export default createRestBundle({
  name: 'providerWatersheds',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'provider_slug',
  getTemplate: `${apiUrl}/providers/:provider_slug/watersheds`,
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});

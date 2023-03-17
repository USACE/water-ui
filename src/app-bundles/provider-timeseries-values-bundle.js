import createRestBundle from '@usace/create-rest-bundle';
import { subDays } from 'date-fns';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'providerTimeseriesValues',
  uid: 'key',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'key',
  getTemplate: `${apiUrl}/providers/:provider_slug/timeseries/values?key=:key`,
  //getTemplate: `${apiUrl}:8080/providers/:provider_slug/timeseries?name=:key`,
  fetchActions: ['URL_UPDATED', 'PROVIDERLOCATION_FETCH_FINISHED'],
  urlParamSelectors: [],
  forceFetchActions: ['PROVIDERLOCATION_FETCH_FINISHED'],
  sortBy: '',
  sortAsc: false,
  //reduceFurther: null,
  addons: {
    doProviderTimeseriesValuesFetchById:
      ({ timeseriesId, dateRange }) =>
      ({ dispatch, store, apiGet }) => {
        dispatch({ type: 'TIMESERIES_FETCH_BY_ID_START', payload: {} });
        const [begin, end] = dateRange;

        const isoAfter = begin ? begin.toISOString() : new Date();
        const isoBefore = end ? end.toISOString() : subDays(new Date(), 7);
        const provider = store['selectProviderByRoute']();

        const url = `${apiUrl}/providers/${provider?.slug}/timeseries?name=${timeseriesId}&begin=${isoAfter}&end=${isoBefore}`;
        // const url = `${apiUrl}/providers/${provider?.slug}/timeseries/values?key=${timeseriesId}`;
        // const url = `${apiUrl}:8080/providers/${provider?.slug}/timeseries?name=${timeseriesId}`;
        const flags = store['selectProviderTimeseriesValuesFlags']();
        const itemsById = store['selectProviderTimeseriesValuesItemsObject']();
        let fetchCount = store['selectProviderTimeseriesValuesFetchCount']();

        apiGet(url, (_err, body) => {
          //new Array(body).forEach((item) => (itemsById[item['key']] = item));

          new Array(body).forEach((item) => {
            //console.warn(item);
            //console.log(itemsById);
            itemsById[item['key']] = item;
          });

          // console.warn(body);
          // new Array(body).forEach((item) => {
          //   console.log(itemsById);
          // });

          dispatch({
            type: 'TIMESERIES_MEASUREMENTS_UPDATED_ITEM',
            payload: {
              ...itemsById,
              ...flags,
              ...{
                _isLoading: false,
                _isSaving: false,
                _fetchCount: ++fetchCount,
                _lastFetch: new Date(),
                _lastResource: url,
                _abortReason: null,
              },
            },
          });

          dispatch({ type: 'TIMESERIES_FETCH_BY_ID_FINISHED', payload: {} });
        });
      },
  },

  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case 'TIMESERIES_MEASUREMENTS_UPDATED_ITEM':
        return Object.assign({}, state, payload);
      default:
        return state;
    }
  },
});

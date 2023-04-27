import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'providerTimeseriesValues',
  uid: 'key',
  prefetch: false,
  staleAfter: 300000, //5min
  persist: false,
  routeParam: 'key',
  getTemplate: '',
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case 'URL_UPDATED':
        return { ...state, ...{ _shouldProviderClear: true } };
      case 'TIMESERIES_MEASUREMENTS_CLEAR_FINISHED':
        return { ...payload };
      case 'TIMESERIES_MEASUREMENTS_CLEAR_STARTED':
      case 'TIMESERIES_MEASUREMENTS_UPDATED_ITEM':
        return Object.assign({}, state, payload);
      default:
        return state;
    }
  },
  addons: {
    reactProviderTimeseriesValueShouldClear: (state) => {
      if (state.providerTimeseriesValues._shouldProviderClear) {
        return { actionCreator: 'doProviderTimeseriesValueClear' };
      }
    },
    selectProviderTimeseriesValuesLastProvider: (state) => {
      return state.providerTimeseriesValues._lastProvider;
    },
    doProviderTimeseriesValueClear:
      () =>
      ({ dispatch, store }) => {
        dispatch({
          type: 'TIMESERIES_MEASUREMENTS_CLEAR_STARTED',
          payload: { _shouldProviderClear: false },
        });
        const provider = store['selectProviderByRoute']();
        const lastProvider =
          store['selectProviderTimeseriesValuesLastProvider']();
        const flags = store['selectProviderTimeseriesValuesFlags']();

        if (provider?.slug === lastProvider) {
          dispatch({ type: 'TIMESERIES_MEASUREMENTS_CLEAR_ABORTED' });
        } else {
          dispatch({
            type: 'TIMESERIES_MEASUREMENTS_CLEAR_FINISHED',
            payload: {
              ...flags,
              ...{ _lastProvider: provider?.slug },
            },
          });
        }
      },
    doProviderTimeseriesValuesFetchById:
      ({ timeseriesId, dateRange }) =>
      ({ dispatch, store, apiGet }) => {
        dispatch({ type: 'TIMESERIES_FETCH_BY_ID_START', payload: {} });
        const { beginDate, endDate } = dateRange;

        const isoAfter = beginDate ? beginDate?.toISOString() : null;
        const isoBefore = endDate ? endDate?.toISOString() : null;
        const provider = store['selectProviderByRoute']();

        //let tsUurl = apiUrl.replace('/cwms', '/cda');
        const tsid = timeseriesId.replace('%', '%25').replace('&', '%26');
        // const url = `${tsUurl}/providers/${provider?.slug}/timeseries?name=${tsid}&begin=${isoAfter}&end=${isoBefore}&page-size=-1`;
        const url = `${apiUrl}/providers/${provider?.slug}/timeseries?name=${tsid}&begin=${isoAfter}&end=${isoBefore}`;
        const flags = store['selectProviderTimeseriesValuesFlags']();
        const itemsById = store['selectProviderTimeseriesValuesItemsObject']();
        let fetchCount = store['selectProviderTimeseriesValuesFetchCount']();

        apiGet(url, (_err, body) => {
          new Array(body).forEach((item) => {
            // item can be undefined if the response is a 404
            if (item === undefined) {
              console.warn(`${url} returned an error`);
              return;
            }
            return (itemsById[item['key']] = item);
          });

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
                _lastProvider: provider?.slug,
              },
            },
          });

          dispatch({ type: 'TIMESERIES_FETCH_BY_ID_FINISHED', payload: {} });
        });
      },
  },
});

import createRestBundle from '@usace/create-rest-bundle';
import { createSelector } from 'redux-bundler';
import {
  LastValueSet,
  LookBackValueSet,
  PrecipTotal,
} from '../helpers/timeseries-helper';

const apiUrl = import.meta.env.VITE_WATER_API_URL;

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

        let tsUurl = apiUrl.replace('/cwms', '/cda');
        const tsid = timeseriesId.replace('%', '%25').replace('&', '%26');
        const url = `${tsUurl}/providers/${provider?.slug}/timeseries?name=${tsid}&begin=${isoAfter}&end=${isoBefore}&page-size=-1`;
        //const url = `${apiUrl}/providers/${provider?.slug}/timeseries?name=${tsid}&begin=${isoAfter}&end=${isoBefore}`;
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

    doProviderLocationTimeseriesFetchAll:
      ({ location }) =>
      ({ store }) => {
        if (!location) {
          location = store['selectProviderLocationByRoute']();
        }
        const dateRange = store['selectTimeseriesDateRange']();

        location?.timeseries?.forEach((tsObj) => {
          console.log(`fetching ${tsObj.tsid}`);
          store.doProviderTimeseriesValuesFetchById({
            timeseriesId: tsObj.tsid,
            dateRange,
          });
        });
      },

    selectProviderLocationTimeseriesLatestValues: createSelector(
      'selectProviderLocationByRoute',
      'selectProviderTimeseriesValuesItemsObject',
      (location, selectProviderTimeseriesValuesItemsObject) => {
        if (!location || !location?.timeseries) {
          console.log(
            'selectProviderLocationTimeseriesLatestValues: location or timeseries not available'
          );
          return null;
        }
        // foundKeys will serve as a check to see if any of the timeseries
        // is in state (selectProviderTimeseriesValuesItemsObject).
        // If not, bail early as it hasn't been loaded yet
        const foundKeys = location?.timeseries?.filter((e) =>
          Object.keys(selectProviderTimeseriesValuesItemsObject).includes(
            e.tsid
          )
        );

        if (!foundKeys.length) {
          console.log(
            'selectProviderLocationTimeseriesLatestValues: tsid(s) not found in state'
          );

          return null;
        }

        const updated_timeseries = location?.timeseries?.map((tsObj) => {
          const tsid = tsObj?.tsid;

          console.log(
            `selectProviderLocationTimeseriesLatestValues: getting latest value for tsid ${tsid}`
          );

          const stateTsValuesArray =
            selectProviderTimeseriesValuesItemsObject[tsid]?.values || [];

          // console.log('stateTsValuesArray');
          // console.log(stateTsValuesArray);

          if (stateTsValuesArray?.length) {
            const lastRecord = LastValueSet(stateTsValuesArray);
            tsObj['latest_time'] = lastRecord.latest_time || null;
            tsObj['latest_value'] = !isNaN(lastRecord.latest_value)
              ? lastRecord.latest_value
              : null;
            //------------
            // console.log(`latest_time: ${tsObj['latest_time']}`);
            // console.log(`latest_value: ${tsObj['latest_value']}`);
            //------------

            const lookBackRecord = LookBackValueSet(stateTsValuesArray, 24);
            tsObj['delta24hr'] =
              lookBackRecord &&
              (lastRecord.latest_value - lookBackRecord.latest_value)?.toFixed(
                2
              );
            // tsObj['unit'] = tsValuesObj[tsObj.tsid]?.unit;
            tsObj['precip_total'] = PrecipTotal(tsObj, stateTsValuesArray);
          }
          return tsObj;
        });

        // this is mutating the original object which is helpful for all dependancies,
        // but may have unintended consequences.
        location.timeseries = updated_timeseries;

        return updated_timeseries;
      }
    ),
  },
});

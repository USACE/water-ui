import { createSelector } from 'redux-bundler';
import { subDays } from 'date-fns';

// use env var if defined for testing, otherwise use current datetime
const defaultEndDate =
  (import.meta.env.VITE_APP_TS_DEFAULT_END_DATE &&
    new Date(import.meta.env.VITE_APP_TS_DEFAULT_END_DATE)) ||
  new Date();

console.log(defaultEndDate);

const timeseriesDateRangeBundle = {
  name: 'timeseriesDateRange',

  getReducer: () => {
    const initialData = {
      beginDate: subDays(defaultEndDate, 7),
      endDate: defaultEndDate,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case 'TIMESERIES_DATE_RANGE_UPDATED':
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },

  selectTimeseriesDateRangeBeginDate: (state) => {
    return state.timeseriesDateRange.beginDate;
  },
  selectTimeseriesDateRangeEndDate: (state) => {
    return state.timeseriesDateRange.endDate;
  },

  selectTimeseriesDateRange: createSelector(
    'selectTimeseriesDateRangeBeginDate',
    'selectTimeseriesDateRangeEndDate',
    (beginDate, endDate) => {
      return { beginDate, endDate };
    }
  ),

  doTimeseriesDateRangeUpdate: (beginDate, endDate) => {
    return ({ dispatch }) => {
      dispatch({
        type: 'TIMESERIES_DATE_RANGE_UPDATED',
        payload: { beginDate, endDate },
      });
    };
  },
};

export default timeseriesDateRangeBundle;

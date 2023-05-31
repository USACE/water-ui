import { createSelector } from 'redux-bundler';
import { subDays } from 'date-fns';

const timeseriesDateRangeBundle = {
  name: 'timeseriesDateRange',

  getReducer: () => {
    const initialData = {
      beginDate: subDays(new Date('2023-05-05T07:00:00'), 7),
      endDate: new Date('2023-05-05T07:00:00'),
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

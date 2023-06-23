import React, { useEffect, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
// import { subDays } from 'date-fns';
import MultiParamChart from './highchart-multiparam';
import DateLookbackSelector from './date-lookback-selector';
// import { Placeholder } from '../content-placeholder';

export default function ProjectTimeseriesCharts({ location: _location }) {
  console.log('im rendering');
  const {
    providerTimeseriesValuesItems: timeSeriesValues,
    doProviderTimeseriesValuesFetchById,
    timeseriesDateRange: dateRange,
  } = useConnect(
    'selectProviderTimeseriesValuesItems',
    'doProviderTimeseriesValuesFetchById',
    'selectTimeseriesDateRange'
  );

  const [location] = useState(_location);
  const [timeseriesIds, setTimeseriesId] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [chartComponents, setChartComponents] = useState([]);
  // const [dateRange, setDateRange] = useState([
  //   subDays(new Date(), 7),
  //   new Date(),
  // ]);

  /** Load specific timeseries ids into state when new configurations are loaded */
  useEffect(() => {
    const timeseriesIdArray = location?.timeseries
      ? location?.timeseries?.map((ts) => {
          return ts.tsid;
        })
      : [];

    setTimeseriesId(timeseriesIdArray);
  }, [location]);

  /** Fetch the timeseries measurements in regards to date range */
  useEffect(() => {
    location &&
      timeseriesIds &&
      timeseriesIds.forEach((id) => {
        // console.log(`fetching ${id}`);
        doProviderTimeseriesValuesFetchById({ timeseriesId: id, dateRange });
      });
  }, [location, timeseriesIds, dateRange, doProviderTimeseriesValuesFetchById]);

  useEffect(() => {
    // Note: timeSeriesValues may contain the more tsids than we want for this location
    // Filter is down by the "timeseriesIds" array which only includes tsids for the
    // current location

    // console.log('--filtering timeseries values--');
    const locationTsValues = timeSeriesValues.filter((v) =>
      timeseriesIds.includes(v.key)
    );

    // console.log('--Setting measurements to: ---');
    // console.log(locationTsValues);
    setMeasurements(locationTsValues);
  }, [timeSeriesValues, timeseriesIds]);

  // ####################################

  useEffect(() => {
    // bail if the required objects are not set
    if (!location?.timeseries || !measurements?.length) {
      //console.log('--bail--');
      return;
    }

    const FloodControlProjectChartSetup = [
      [
        {
          tsLabel: 'Elevation',
          displayLevels: ['elev.top of flood', 'elev.bottom of flood'],
        },
        { tsLabel: 'Elevation Rule Curve', visible: false },
      ],
      [{ tsLabel: 'Stage' }],
      [
        {
          tsLabel: 'Storage',
          displayLevels: ['stor.top of flood'],
        },
      ],
      [{ tsLabel: 'Inflow' }, { tsLabel: 'Outflow' }],
      [{ tsLabel: 'Tailwater Elevation' }, { tsLabel: 'Stage Tailwater' }],
      [{ tsLabel: 'Power Generation' }],
      [{ tsLabel: 'Water Temperature' }],
      [{ tsLabel: 'Precipitation' }],
      [{ tsLabel: 'Disolved Oxygen' }],
      [{ tsLabel: 'Air Temperature' }],
    ];

    const LocationChartSetup = [
      [{ tsLabel: 'Elevation' }],
      [
        {
          tsLabel: 'Stage',
          displayLevels: ['elev.top of flood', 'stage.flood', 'stage.control'],
        },
      ],
      [{ tsLabel: 'Outflow' }],
      [{ tsLabel: 'Precipitation' }],
      [{ tsLabel: 'Water Temperature' }],
      [{ tsLabel: 'Disolved Oxygen' }],
      [{ tsLabel: 'Air Temperature' }],
    ];

    const chartSetup =
      location?.kind === 'PROJECT'
        ? FloodControlProjectChartSetup
        : LocationChartSetup;

    const mapObjectArrayByKey = (objectArray, key) => {
      let mappedObj = {};
      objectArray?.forEach((elem) => {
        mappedObj[elem[key]] = elem;
      });
      return mappedObj;
    };

    const levelsMap = mapObjectArrayByKey(location?.levels, 'slug');

    let components = [<DateLookbackSelector key="selector" />];

    // // Loop over chartSetup array

    chartSetup.forEach((chartCfg, idx) => {
      // each chart can have one or more parameters (elev, stage, etc)
      let chartParams = [];

      // Loop over each label (aka parameter) for each chart
      // ----------
      chartCfg.forEach((cfgObj, idx) => {
        // tsObj will be null if the label key not found in mapped object

        const _tsObj = mapObjectArrayByKey(location?.timeseries, 'label');

        // Only continue if the timeseries label is available in the tsObj
        // for the current cfgObj.tsLabel (chart configuration label)
        // Ex: 'Pool Elevation'
        if (_tsObj[cfgObj.tsLabel] && measurements?.length) {
          const tsObj = _tsObj[cfgObj.tsLabel];

          const paramMeasurements = mapObjectArrayByKey(measurements, 'key')[
            tsObj.tsid
          ];

          if (!paramMeasurements?.values?.length) {
            // bail on this parameter - there is no data to draw
            return;
          }

          // inject the values from the measurements payload into the tsObj
          tsObj['values'] = paramMeasurements?.values;

          // using the displayLevel array for this parameter
          // attach the levels data to each item.
          const levels = cfgObj?.displayLevels?.map(
            (level) => levelsMap[level]
          );

          // inject the values from levels into the tsObj
          tsObj['levels'] = Array.isArray(levels) ? levels : [];

          // default is visble unless specified as false in config above
          tsObj['chartVisible'] =
            cfgObj?.hasOwnProperty('visible') && !cfgObj.visible ? false : true;

          chartParams.push(tsObj);
        } else {
          console.log(`No tsObj for ${cfgObj.tsLabel} or no measurements`);
          //return;
        }
      });
      // ----------

      chartParams?.length &&
        components.push(
          <div key={idx} className="mb-5 shadow-md">
            <MultiParamChart
              key={chartParams?.label}
              chartParams={chartParams}
            />
          </div>
        );
      setChartComponents(components);
    });
  }, [location, measurements, dateRange]);

  return chartComponents.length > 1 ? chartComponents : null;
}

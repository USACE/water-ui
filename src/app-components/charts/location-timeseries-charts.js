import React, { useEffect, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { subDays } from 'date-fns';
import MultiParamChart from './highchart-multiparam';

export default function ProjectTimeseriesCharts({ location: _location }) {
  const {
    //providerLocationByRoute,
    providerTimeseriesValuesItems: timeSeriesValues,
    doProviderTimeseriesValuesFetchById,
  } = useConnect(
    //'selectProviderLocationByRoute',
    'selectProviderTimeseriesValuesItems',
    'doProviderTimeseriesValuesFetchById'
  );

  const [location] = useState(_location);
  const [timeseriesIds, setTimeseriesId] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [chartComponents, setChartComponents] = useState([]);
  const [dateRange] = useState([subDays(new Date(), 3), new Date()]);

  /** Load specific timeseries ids into state when new configurations are loaded */
  useEffect(() => {
    const timeseriesIdArray = location?.timeseries
      ? location.timeseries.map((ts) => {
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
        //console.log(`fetching ${id}`);
        doProviderTimeseriesValuesFetchById({ timeseriesId: id, dateRange });
      });
  }, [location, timeseriesIds, dateRange, doProviderTimeseriesValuesFetchById]);

  useEffect(() => {
    // Note: timeSeriesValues may contain the more tsids than we want for this location
    // Filter is down by the "timeseriesIds" array which only includes tsids for the
    // current location

    console.log('--filtering timeseries values--');
    const locationTsValues = timeSeriesValues.filter((v) =>
      timeseriesIds.includes(v.key)
    );

    setMeasurements(locationTsValues);
  }, [timeSeriesValues, timeseriesIds]);

  // ####################################

  //console.log('--project-timeseries-charts--');

  useEffect(() => {
    const FloodControlProjectChartSetup = [
      [{ tsLabel: 'Pool Elevation' }],
      [{ tsLabel: 'Storage' }],
      [{ tsLabel: 'Pool Inflow' }, { tsLabel: 'Tailwater Outflow' }],
      [{ tsLabel: 'Tailwater Temperature' }],
    ];

    const LocationChartSetup = [
      [{ tsLabel: 'Stage' }],
      [{ tsLabel: 'Flow' }],
      [{ tsLabel: 'Temperature' }],
    ];

    const chartSetup =
      location?.attributes?.kind === 'PROJECT'
        ? FloodControlProjectChartSetup
        : LocationChartSetup;

    const mapObjectArrayByKey = (objectArray, key) => {
      let mappedObj = {};
      objectArray?.forEach((elem) => {
        mappedObj[elem[key]] = elem;
      });
      return mappedObj;
    };

    let components = [];

    // // Loop over chartSetup array
    chartSetup.forEach((chartCfg, idx) => {
      let chartParams = [];

      // Loop over each label (aka parameter) for each chart
      // ----------
      chartCfg.forEach((cfgObj, idx) => {
        // tsObj will be null if the label key not found in mapped object

        const _tsObj = mapObjectArrayByKey(location?.timeseries, 'label');

        // Only continue if the timeseries label is available in the tsObj
        // for the current cfgObj.tsLabel (chart configuration label)
        // Ex: 'Pool Elevation'
        if (_tsObj[cfgObj.tsLabel] && measurements.length) {
          const tsObj = _tsObj[cfgObj.tsLabel];

          const paramMeasurements = mapObjectArrayByKey(measurements, 'key')[
            tsObj.tsid
          ];
          //   console.log('--paramMeasurements--');
          //   console.log(paramMeasurements);

          //   console.log('--values--');
          //   console.log(paramMeasurements?.values);

          // inject the values from the measurements payload into the tsObj
          tsObj['values'] = paramMeasurements?.values;
          chartParams.push(tsObj);
        } else {
          console.log(`No tsObj for ${cfgObj.tsLabel} or no measurements`);
          //return;
        }
        //console.log(tsObj);
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
  }, [location, measurements]);

  return chartComponents;
}

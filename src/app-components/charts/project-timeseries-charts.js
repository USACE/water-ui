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
  const [dateRange] = useState([subDays(new Date(), 365), new Date()]);

  /** Load specific timeseries ids into state when new configurations are loaded */
  useEffect(() => {
    //console.log('--Location --');
    //console.log(location);

    //console.log('--Location Timeseries --');
    const timeseriesIdArray = location?.timeseries
      ? location.timeseries.map((ts) => {
          return ts.tsid;
        })
      : [];

    //console.warn(`Setting timeseriesIds`);
    //console.log(timeseriesIdArray);
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
    // Filter is down by the "timeseriesIds" array which is only includes tsids for the
    // current location

    const locationTsValues = timeSeriesValues.filter((v) =>
      timeseriesIds.includes(v.key)
    );

    setMeasurements(locationTsValues);
  }, [timeSeriesValues, location, timeseriesIds]);

  // ####################################

  //console.log('--project-timeseries-charts--');

  useEffect(() => {
    const chartSetup = [
      [{ tsLabel: 'Pool Elevation' }],
      [{ tsLabel: 'Storage' }],
      [{ tsLabel: 'Pool Inflow' }, { tsLabel: 'Tailwater Outflow' }],
      [{ tsLabel: 'Tailwater Temperature' }],
    ];

    // convert location timeseries array objects to an object map
    // using the "label" as the map key
    let locationTsByLabel = {};
    location?.timeseries?.forEach((elem) => {
      locationTsByLabel[elem.label] = elem;
    });

    let measurementsByKey = {};
    measurements?.forEach((elem) => {
      measurementsByKey[elem.key] = elem;
    });

    let components = [];

    // // Loop over chartSetup array
    chartSetup.forEach((chartCfg, idx) => {
      let chartParams = [];
      //console.log(`Chart #:${idx}`);
      //console.log(chartCfg);
      //console.log(locationTsByLabel);
      //console.log(measurementsByKey);

      // Loop over each label (aka parameter) for each chart
      // ----------
      chartCfg.forEach((cfgObj, idx) => {
        // tsObj will be null if the label key not found in mapped object
        const tsObj = locationTsByLabel[cfgObj.tsLabel];
        //console.log(tsObj);
        if (tsObj) {
          const paramMeasurements = tsObj && measurementsByKey[tsObj.tsid];
          // inject the values from the measurements payload into the tsObj
          tsObj['values'] = paramMeasurements?.values;
          chartParams.push(tsObj);
        } else {
          console.warn(`No tsObj for ${cfgObj.tsLabel}`);
        }
        //console.log(tsObj);
      });
      // ----------
      //console.log('--chartParams--');
      //console.log(chartParams);
      components.push(
        <div key={idx} className="mb-5 shadow-md">
          <MultiParamChart key={chartParams?.label} chartParams={chartParams} />
        </div>
      );
      setChartComponents(components);
    });
  }, [location, measurements]);

  return chartComponents;
}

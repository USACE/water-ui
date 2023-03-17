import React, { useEffect, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { subDays } from 'date-fns';
import MultiParamChart from './highchart-multiparam';
import DateLookbackSelector from './date-lookback-selector';

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
  const [dateRange, setDateRange] = useState([
    subDays(new Date(), 7),
    new Date(),
  ]);

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

    setMeasurements(locationTsValues);
  }, [timeSeriesValues, timeseriesIds]);

  // ####################################

  //console.log('--project-timeseries-charts--');

  useEffect(() => {
    // bail if the required objects are not set
    if (!location?.timeseries || !measurements?.length) {
      //console.log('--bail--');
      return;
    }

    const FloodControlProjectChartSetup = [
      [
        {
          tsLabel: 'Pool Elevation',
          displayLevels: ['elev.top of flood', 'elev.bottom of flood'],
        },
        { tsLabel: 'Pool Stage' },
      ],
      [
        {
          tsLabel: 'Storage',
          displayLevels: ['stor.top of flood'],
        },
      ],
      [{ tsLabel: 'Pool Inflow' }, { tsLabel: 'Tailwater Outflow' }],
      [{ tsLabel: 'Tailwater Elevation' }, { tsLabel: 'Tailwater Stage' }],
      [{ tsLabel: 'Tailwater Temperature' }],
      [{ tsLabel: 'Precipitation' }],
    ];

    const LocationChartSetup = [
      [{ tsLabel: 'Elevation' }],
      [{ tsLabel: 'Stage' }],
      [{ tsLabel: 'Flow' }],
      [{ tsLabel: 'Precipitation' }],
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

    const levelsMap = mapObjectArrayByKey(location?.levels, 'slug');
    // console.log('--levels map--');
    // console.log(levelsMap);

    let components = [
      <DateLookbackSelector key="selector" onInputValueChange={setDateRange} />,
    ];

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
          //   console.log('--paramMeasurements--');
          //   console.log(paramMeasurements);

          // console.log(`--values for ${tsObj.tsid}--`);
          // console.log(paramMeasurements?.values);

          // inject the values from the measurements payload into the tsObj
          tsObj['values'] = paramMeasurements?.values;

          // using the displayLevel array for this parameter
          // attach the levels data to each item.
          const levels = cfgObj?.displayLevels?.map(
            (level) => levelsMap[level]
          );

          // inject the values from levels into the tsObj
          tsObj['levels'] = levels;

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

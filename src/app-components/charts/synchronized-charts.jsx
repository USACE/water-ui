import React, { useEffect, useState } from 'react';
import HighchartsWrapper from './highchart-wrapper';
import { useConnect } from 'redux-bundler-hook';
import { subDays } from 'date-fns';

export default function SynchronizedCharts() {
  const {
    providerLocationByRoute,
    providerTimeseriesValuesItems: timeSeriesValues,
    doProviderTimeseriesValuesFetchById,
  } = useConnect(
    'selectProviderLocationByRoute',
    'selectProviderTimeseriesValuesItems',
    'doProviderTimeseriesValuesFetchById'
  );

  const [location] = useState(providerLocationByRoute);
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

  console.log('--SynchronizedCharts--');
  //console.warn(providerLocationByRoute);

  useEffect(() => {
    const chartSetup = [
      ['Pool Elevation', 'Storage', 'Pool Inflow'],
      ['Pool Inflow', 'Tailwater Outflow'],
      ['Tailwater Temperature'],
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

    //console.log(locationTsByLabel['Pool Elevation']);

    let components = [];

    // Loop over chartSetup array
    chartSetup.forEach((chart, idx) => {
      let tsObj = {};
      // chart options for each chart
      let chartOptions = {};
      let chartSeries = [];
      let chartTitle = null;
      let yAxis = [];

      // -----------------
      // Loop over each label (aka parameter) for each chart
      chart.forEach((label, idx) => {
        // tsObj will be null if the label key not found in mapped object
        tsObj = locationTsByLabel[label];

        if (tsObj) {
          console.log('--tsObj--');
          console.log(tsObj);

          console.log('--measurements--');
          console.log(tsObj && measurementsByKey[tsObj.tsid]);

          const paramMeasurements = tsObj && measurementsByKey[tsObj.tsid];

          chartTitle = chartTitle
            ? chartTitle.concat(' / ', tsObj?.label)
            : tsObj?.label;

          console.log(`pushing data to chart series for ${tsObj?.label}`);
          chartSeries.push({
            name: tsObj?.label,
            yAxis: idx > 0 ? 1 : 0,
            data: paramMeasurements?.values.map((v) => {
              return [new Date(v[0]).getTime(), v[1]];
            }),
          });

          yAxis.push({
            title: { text: label },
            opposite: idx > 0,
            labels: {
              format: `{value} ${tsObj?.units}`,
            },
            //tickInterval: tsObj?.parameter.toLowerCase() === 'flow' ? 50 : null,
          });
        } else {
          console.warn(`'${label}' label not found in location timeseries`);

          //return;
        }

        //chartOptions['series'] = { data: [1, 2, 3] };
      });
      // -----------------

      chartOptions = {
        //type: tsObj?.parameter.toLowerCase() === 'stor' ? 'area' : 'spline',
        title: { text: chartTitle || null, align: 'left' },
        series: chartSeries,
        legend: { enabled: true },
        // yAxis: [
        //   {
        //     tickInterval: tsObj?.parameter.toLowerCase() === 'flow' ? 50 : 5,
        //     title: { text: tsObj?.parameter },
        //   },
        // ],
        yAxis: yAxis || [{}, {}],
      };

      chartOptions?.title &&
        components.push(
          <div className="my-5 shadow-md">
            <HighchartsWrapper key={idx} chartOptions={chartOptions} />
          </div>
        );
      console.log(`-- components length: ${components.length} --`);
      setChartComponents(components);
    });
  }, [location, measurements]);

  //   sample_object_array.forEach((elem) => {
  //     console.log(elem);
  //     const data = elem.values.map((v) => {
  //       return [new Date(v[0]).getTime(), v[1]];
  //     });
  //     let chartOptions = {
  //       chart: {
  //         type: elem.param.toLowerCase() === 'stor' ? 'area' : 'spline',
  //         height: 200,
  //       },
  //       title: { text: elem.param, align: 'left' },
  //       legend: {
  //         enabled: false,
  //       },
  //       series: [{ data: data, name: elem.param }],
  //       plotOptions: {
  //         series: {
  //           fillColor: {
  //             linearGradient: [0, 0, 0, 200],
  //             stops: [
  //               [0, '#aed6f1'],
  //               [1, '#ffffff'],
  //             ],
  //           },
  //         },
  //       },
  //     };
  //     // let chartOptions = {
  //     //   series: [{ data: [999, 800, 700], name: elem.param }],
  //     // };

  //     components.push(
  //       <HighchartsWrapper key={elem.param} chartOptions={chartOptions} />
  //     );
  //   });

  return chartComponents;
}

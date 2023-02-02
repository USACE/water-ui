//import SimpleStageHydrographChart from '../../images/mockup/simple-stage-hydrograph-chart.png';
import React, { useEffect, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { subDays } from 'date-fns';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function SimpleHydrographChart() {
  const {
    doProviderTimeseriesValuesFetchById,
    providerTimeseriesValuesItems: timeSeriesValues,
    providerLocationByRoute,
  } = useConnect(
    'doProviderTimeseriesValuesFetchById',
    'selectProviderTimeseriesValuesItems',
    'selectProviderLocationByRoute'
  );

  const [location, setLocation] = useState(providerLocationByRoute);
  const [timeseriesIds, setTimeseriesId] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [dateRange, setDateRange] = useState([
    subDays(new Date(), 365),
    new Date(),
  ]);

  /** Setup the chart */
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'spline',
    },
    // plotOptions: {
    //   series: {
    //     pointPlacement: 'on',
    //     pointInterval: 24 * 3600 * 1000, // one day
    //   },
    // },
    title: { text: 'Initial Chart Title' },
    xAxis: {
      type: 'datetime',
      // dateTimeLabelFormats: {
      //   second: '%d %b %Y <br/> %H:%M:%S %P',
      // },
      labels: {
        format: '{value:%Y-%m-%d}',
      },

      title: {
        text: 'Date',
      },
    },
    series: [
      {
        data: [1, 2, 3],
        name: 'Stage',
        //pointStart: Date.UTC(2023, 0, 1),
        xAxis: 0,
      },
    ],
  });

  /* Ensure location is set */
  // @todo Try to set this without useEffect
  useEffect(() => {
    console.log('--providerLocationByRoute--');
    console.log(providerLocationByRoute);
    setLocation(providerLocationByRoute);
  }, [providerLocationByRoute]);

  /** Load specific timeseries ids into state when new configurations are loaded */
  useEffect(() => {
    console.log('--Location --');
    console.log(location);

    console.log('--Location Timeseries --');
    const timeseriesIdArray = location
      ? location?.timeseries.map((ts) => {
          return ts.tsid;
        })
      : [];

    console.warn(`Setting timeseriesIds`);
    console.log(timeseriesIdArray);
    setTimeseriesId(timeseriesIdArray);
  }, [location]);

  /** Fetch the timeseries measurements in regards to date range */
  useEffect(() => {
    location &&
      timeseriesIds &&
      timeseriesIds.forEach((id) => {
        console.log(`fetching ${id}`);
        doProviderTimeseriesValuesFetchById({ timeseriesId: id, dateRange });
      });
  }, [location, timeseriesIds, dateRange, doProviderTimeseriesValuesFetchById]);

  useEffect(() => {
    console.log(`--Setting measurements--`);
    console.log(timeSeriesValues);
    //console.log(JSON.stringify(timeSeriesValues));

    // Note: timeSeriesValues may contain the more tsids than we want for this location
    // Filter is down by the "timeseriesIds" array which is only includes tsids for the
    // current location

    const locationTsValues = timeSeriesValues.filter((v) =>
      timeseriesIds.includes(v.key)
    );
    // console.log(`--locationTsValues--`);
    // console.log(locationTsValues);

    //setMeasurements(timeSeriesValues);
    setMeasurements(locationTsValues);
  }, [timeSeriesValues, location, timeseriesIds]);

  /*************************************  
  Add Data to the chart
  **************************************/

  useEffect(() => {
    let chartSeries = [];
    console.log(measurements);

    measurements.forEach((e) => {
      console.log(`pushing ${JSON.stringify(e)}`);
      chartSeries.push({
        name: e.param,
        data: e.values.map((v) => {
          return [new Date(v[0]).getTime(), v[1]];
        }),
      });
    });

    console.log(chartSeries);

    setChartOptions({
      title: { text: location?.attributes.public_name || 'not available' },
      series: chartSeries,
      //series: [{ data: [Math.random() * 5, 2, 1] }],
    });
  }, [location, measurements]);

  // return <div id="container" style={{ width: '100%', height: '400px' }}></div>;
  return (
    <div>
      <div className="h-40 overflow-scroll text-sm">
        {measurements && JSON.stringify(measurements)}
      </div>

      <div className="w-full">
        {measurements && chartOptions && (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        )}
      </div>
      {/* <img
        src={SimpleStageHydrographChart}
        className="w-full"
        alt="Timeseries Chart"
      /> */}
    </div>
  );
}

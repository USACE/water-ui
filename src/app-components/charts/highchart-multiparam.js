import React, { useState, useEffect } from 'react';
import HighchartsWrapper from './highchart-wrapper';

// #######################################

// This will produce a single chart, with one or more yaxis

export default function MultiParamChart({ chartParams }) {
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
    yAxis: [{}, {}],
    series: [
      {
        data: [1, 2, 3],
        name: 'Stage',
        //pointStart: Date.UTC(2023, 0, 1),
        xAxis: 0,
      },
    ],
  });

  // ####################################

  useEffect(() => {
    //console.log('--highchart-multiparam--chart--start--');
    // const mapObjectArrayByKey = (objectArray, key) => {
    //   let mappedObj = {};
    //   objectArray?.forEach((elem) => {
    //     mappedObj[elem[key]] = elem;
    //   });
    //   return mappedObj;
    // };

    let chartTitle = null;
    let chartSeries = [];
    let yAxis = [];
    //setChartOptions(defaultChartOptions);

    // Loop over each tsLabel (aka descriptive parameter) for each chart
    // ------------------------
    chartParams.forEach((chartParamObj, idx) => {
      // console.log('-- chartParamObj --');
      // console.log(chartParamObj);
      const isStorage = chartParamObj?.label === 'Storage' || false;

      chartTitle = chartTitle
        ? chartTitle.concat(' / ', chartParamObj?.label)
        : chartParamObj?.label;

      // console.log(`pushing data to chart series for ${chartParamObj?.label}`);
      chartSeries.push({
        name: chartParamObj?.label,
        type: isStorage ? 'areaspline' : 'spline',
        yAxis: idx,
        color: isStorage ? '#4d4b46' : null,
        fillOpacity: isStorage ? 0.1 : null,
        data: chartParamObj?.values?.map((v) => {
          return [new Date(v[0]).getTime(), v[1]];
        }),
        marker: {
          enabled: true,
          radius: 2,
        },
        accessibility: {
          description: `${chartParamObj?.label} measured in ${chartParamObj?.units}`,
        },
      });
      yAxis.push({
        title: { text: chartParamObj?.label + ` (${chartParamObj?.units})` },
        opposite: idx > 0,
        labels: {
          format: `{value} ${chartParamObj?.units}`,
        },
        accessibility: {
          description: `${chartParamObj?.label} measured in ${chartParamObj?.units}`,
        },
        //tickInterval: tsObj?.parameter.toLowerCase() === 'flow' ? 50 : null,
      });
    });

    // ------------------------

    // console.log('--chartSeries---');
    // console.log(chartSeries);

    setChartOptions({
      title: { text: chartTitle, align: 'left' },
      legend: { enabled: true },
      series: chartSeries,
      yAxis: yAxis,
    });
  }, [chartParams]);

  // return a single chart
  //console.log('--highchart-multiparam--chart--');
  return chartOptions && <HighchartsWrapper chartOptions={chartOptions} />;
}

import { useState, useEffect } from 'react';
import HighchartsWrapper from './highchart-wrapper';

// #######################################

// This will produce a single chart, with one or more yaxis

export default function MultiParamChart({ chartParams }) {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'spline',
    },
    title: { text: 'Rendering Chart Data...' },
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
    let chartTitle = null;
    let chartSeries = [];
    let yAxis = [];
    let yMin = null;
    let yMax = null;

    //const allEqual = (arr) => arr.every((val) => val === arr[0]);
    //const equalUnits = allEqual(chartParams?.map((item) => item?.unit));

    // Loop over each tsLabel (aka descriptive parameter) for each chart
    // ------------------------
    chartParams.forEach((chartParamObj, idx) => {
      // console.log('-- chartParamObj --');
      // console.log(chartParamObj);
      const isStorage = chartParamObj?.label === 'Storage' || false;
      const isTotalPrecip =
        chartParamObj?.label === 'Precipitation' &&
        chartParamObj?.tsid?.indexOf('Total') > 0
          ? true
          : false;

      chartTitle =
        // chartVisible is true and chartTitle is set
        chartParamObj?.chartVisible && chartTitle
          ? chartTitle.concat(' / ', chartParamObj?.label)
          : // chartVisible is false and chartTitle is set
          !chartParamObj?.chartVisible && chartTitle
          ? // use existing chart title (even if null)
            chartTitle
          : // otherwise use the label as the chart title
            chartParamObj?.label;

      // setup data as array of arrays [[time, value], [time, value]]
      const data = chartParamObj?.values?.map((v) => {
        return [new Date(v[0]).getTime(), v[1]];
      });

      // determine yAxis miniumum value
      const minValue = data && Math.min(...data?.map((item) => item[1]));
      if (yMin === null || minValue < yMin) {
        yMin = minValue;
      }
      // determine yAxis max value
      const maxValue = data && Math.max(...data?.map((item) => item[1]));
      if (yMax === null || maxValue > yMax) {
        yMax = maxValue;
      }

      const levelColor = (label) => {
        switch (label) {
          case 'Flood':
            return 'red';

          default:
            return 'navy';
        }
      };

      // console.log(`pushing data to chart series for ${chartParamObj?.label}`);
      chartSeries.push({
        name: chartParamObj?.label,
        type: isStorage ? 'areaspline' : isTotalPrecip ? 'column' : 'spline',
        yAxis: idx,
        color: isStorage ? '#4d4b46' : null,
        fillOpacity: isStorage ? 0.1 : null,
        data: data,
        visible: chartParamObj?.chartVisible,
        marker: {
          enabled: true,
          radius: 2,
        },
        pointWidth: 2, //used by column type
        accessibility: {
          description: `${chartParamObj?.label} measured in ${chartParamObj?.unit}`,
        },
      });

      yAxis.push({
        title: { text: chartParamObj?.label + ` (${chartParamObj?.unit})` },
        // force yaxis to match
        linkedTo: idx > 0 ? 0 : null,
        opposite: idx > 0,
        // force yaxis to match if two parameters have same units
        // min: chartParams.length > 1 && equalUnits ? yMin : null,
        // max: chartParams.length > 1 && equalUnits ? yMax : null,
        tickInterval: null,
        labels: {
          format: `{value} ${chartParamObj?.unit}`,
        },
        accessibility: {
          description: `${chartParamObj?.label} measured in ${chartParamObj?.unit}`,
        },

        // plotBands: [
        //   {
        //     // Light air
        //     from: 400,
        //     to: 425,
        //     color: 'rgba(68, 170, 213, 0.1)',

        //     label: {
        //       text: 'Flood Control Pool',
        //       align: 'right',
        //       x: -20,
        //       style: {
        //         color: '#369',
        //       },
        //     },
        //   },
        // ],
        plotLines:
          chartParamObj?.levels &&
          chartParamObj?.levels.map((lvl) => {
            return {
              color: levelColor(lvl?.label),
              dashStyle: 'LongDash',
              width: 2,
              value: lvl?.latest_value,
              // y: 20 /*moves label down*/,
              // x: -20,
              label: {
                text: `${lvl?.label} ${lvl?.parameter} ${lvl?.latest_value} (${lvl?.units})`,
                align: 'left',
                style: { color: levelColor(lvl?.label) },
              },
            };
          }),

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

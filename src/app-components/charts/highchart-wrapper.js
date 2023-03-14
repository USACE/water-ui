import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsExport from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';
import highchartsAccessibility from 'highcharts/modules/accessibility';

const HighchartsWrapper = (props) => {
  // init the module
  highchartsExport(Highcharts);
  highchartsExportData(Highcharts);
  highchartsAccessibility(Highcharts);

  //console.log('--Highcharts Wrapper--');
  //console.log(props.chartOptions);

  let options = {
    chart: {
      //type: props.chartOptions?.chart?.type || 'spline',
      height: props.chartOptions?.chart?.height || 300,
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
    },

    title: props.chartOptions?.title || {
      text: 'No title set',
      align: 'center',
    },
    legend: props.chartOptions?.legend || { enabled: false },
    xAxis: {
      type: 'datetime',
    },
    series: props.chartOptions?.series || [{ data: [1, 2, 3], name: 'label' }],
    plotOptions: props.chartOptions?.plotOptions || {},
    credits: { enabled: false },
    yAxis: props.chartOptions?.yAxis || [{}, {}],
    //series: [{ data: [1, 2, 3], name: 'Label' }],
    exporting: {
      enabled: true,
    },
    tooltip: {
      style: {
        // color: 'blue',
        fontWeight: 'bold',
        fontSize: '14px',
      },
    },
  };

  //let myOptions = { ...options, series: props.chartData };
  //let myOptions = { ...options, {props.chartOptions} };

  //console.log('--chart options --');
  //console.log(options);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      //   oneToOne={true}
    />
  );
};

export default HighchartsWrapper;

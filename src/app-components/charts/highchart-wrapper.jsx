import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsExport from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import { isMobile } from 'react-device-detect';

const HighchartsWrapper = (props) => {
  // init the module
  highchartsExport(Highcharts);
  highchartsExportData(Highcharts);
  highchartsAccessibility(Highcharts);

  // console.log('--Highcharts Wrapper--');
  //console.log(props.chartOptions);
  // console.log(props.chartOptions?.series);

  // Hack to get the max data value from a chart with multiple yAxis
  const maxVal =
    props?.chartOptions?.series?.length &&
    Math.max(
      ...props.chartOptions.series.map((axis) => {
        var max = 0;
        var _newMax =
          axis?.data?.length && Math.max(...axis.data.map((item) => item[1]));
        if (_newMax > max) {
          max = _newMax;
        }
        return max;
      })
    );

  const minVal =
    props?.chartOptions?.series?.length &&
    Math.min(
      ...props.chartOptions.series.map((axis) => {
        var min = 0;
        var _newMin =
          axis?.data?.length && Math.min(...axis.data.map((item) => item[1]));
        if (_newMin > min) {
          min = _newMin;
        }
        return min;
      })
    );

  // Set or update the "max" property with the computed property above
  props.chartOptions?.yAxis.forEach((axis) => {
    axis['max'] = maxVal + maxVal * 0.001; // extra buffer above computed max
  });
  props.chartOptions?.yAxis.forEach((axis) => {
    axis['min'] = minVal - minVal * 0.001; // extra buffer below computed min
  });

  // console.log('--maxVal--');
  // console.log(maxVal);

  let options = {
    chart: {
      //type: props.chartOptions?.chart?.type || 'spline',
      height: props.chartOptions?.chart?.height || 300,
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
    },
    time: { useUTC: false },
    title: props.chartOptions?.title || {
      text: 'No title set',
      align: 'center',
    },
    subtitle: !isMobile
      ? {
          text: 'Click and drag to zoom in. Hold down shift key to pan.',
        }
      : null,
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
      // xDateFormat: '%d-%b-%Y',
      shared: true,
      style: {
        // color: 'blue',
        fontWeight: 'bold',
        fontSize: '14px',
      },

      formatter: function () {
        return this.points.reduce(
          function (s, point) {
            return (
              s +
              `<br/><span style="color:${point.color}">\u25CF&nbsp;</span>` +
              point.series.name +
              ': ' +
              point.y.toLocaleString()
            );
          },
          '<span style="font-size:smaller;font-weight:bold;">' +
            new Date(this.x).toLocaleString('en-US', {
              weekday: 'long',
              day: 'numeric',
              year: 'numeric', // numeric, 2-digit
              month: 'short', // numeric, 2-digit, long, short, narrow
              hour: 'numeric', // numeric, 2-digit
              minute: 'numeric', // numeric, 2-digit
              // second: 'numeric', // numeric, 2-digit
              timeZoneName: 'short',
            }) +
            '</span>'
        );
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

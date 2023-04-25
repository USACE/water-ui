import { createRef, useEffect, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
//import DamProfileMockup from '../../../images/mockup/dam-profile-chart.png';
import DamProfileChart from '../../../_charts/dam-profile-chart/dam-profile-chart';
import { mapObjectArrayByKey } from '../../../helpers/misc-helpers';

export default function ReactDamProfileChart() {
  const ref = createRef(); // element where DamProfileChart will be rendered
  const [info, setInfo] = useState(null); // information DamProfileChart needs to draw itself

  const { providerLocationByRoute: location } = useConnect(
    'selectProviderLocationByRoute'
  );

  useEffect(() => {
    if (!location?.levels?.length) {
      console.warn('Unable to render dam profile chart');
      return;
    }

    const allowedLevels = [
      'Streambed',
      'Top of Dam',
      'Top of Surcharge',
      'Top of Flood',
      'Top of Flood Control',
      'Bottom of Flood',
      'Bottom of Flood Control',
      'Bottom of Conservation',
    ];

    const _levels = location?.levels
      ?.filter(
        (lvl) =>
          allowedLevels.includes(lvl.label) &&
          (lvl.base_parameter === 'Elev' || lvl.parameter === 'Elev')
      )
      .map((lvl) => {
        return { name: lvl.label, value: lvl.latest_value };
      });

    const levelsMap = mapObjectArrayByKey(
      location?.levels.filter(
        (lvl) =>
          lvl.base_parameter === 'Elev' ||
          lvl.parameter === 'Elev' ||
          lvl.parameter === 'Stage'
      ),
      'slug'
    );
    // console.log('-----');
    // console.log(levelsMap);

    const timeseriesMap = mapObjectArrayByKey(location?.timeseries, 'label');

    const _info = {
      // levels: [
      //   { name: 'Top of Flood', value: 690 },
      //   { name: 'Streambed', value: 500 },
      // ],
      infoText: location?.public_name || null,
      levels: _levels,
      damtop:
        levelsMap['elev.top of dam']?.latest_value ||
        levelsMap['stage.top of dam']?.latest_value ||
        null,
      // for some projects like Lake Okeechobee, streambed could be 0
      // setting to null will mess with the scale
      dambottom:
        levelsMap['elev.streambed']?.latest_value ||
        levelsMap['stage.streambed']?.latest_value,
      pool:
        timeseriesMap['Elevation']?.latest_value ||
        timeseriesMap['Stage']?.latest_value ||
        null,
      tail:
        timeseriesMap['Stage Tailwater']?.latest_value ||
        timeseriesMap['Elev Tailwater']?.latest_value ||
        null,
      inflow: timeseriesMap['Inflow']?.latest_value || null,
      outflow: timeseriesMap['Outflow']?.latest_value || null,
      powerGeneration: timeseriesMap['Power Generation']?.latest_value || null,
      surcharge: timeseriesMap['Surcharge Release']?.latest_value || null,
      gradientBottom: levelsMap['Top of Flood']?.latest_value || null,
      gradientTop: levelsMap['Bottom of Flood']?.latest_value || null,
    };
    setInfo(_info);
  }, [location, location.timeseries]);

  useEffect(() => {
    if (info) {
      DamProfileChart(info, ref.current);
    }
  }, [info, ref]);

  return (
    <>
      {/* <img src={DamProfileMockup} className="w-full" alt="Dam Profile Chart" /> */}
      <div className="dark:bg-orange-50 dark:invert" aria-details="hello there">
        <svg
          ref={ref}
          aria-hidden={true}
          // title="Dam Profile Chart"
          // description="this is my description"
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 1240 650"
        ></svg>
      </div>
    </>
  );
}

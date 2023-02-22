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

    const _levels = location?.levels?.map((lvl) => {
      return { name: lvl.label, value: lvl.latest_value };
    });

    const levelsMap = mapObjectArrayByKey(location?.levels, 'label');
    // console.log('-----');
    // console.log(levelsMap);

    const timeseriesMap = mapObjectArrayByKey(location?.timeseries, 'label');

    const _info = {
      // levels: [
      //   { name: 'Top of Flood', value: 690 },
      //   { name: 'Streambed', value: 500 },
      // ],
      levels: _levels,
      damtop: levelsMap['Top of Dam']?.latest_value || null,
      dambottom: levelsMap['Streambed']?.latest_value || null,
      pool: timeseriesMap['Pool Elevation']?.latest_value || null,
      tail: timeseriesMap['Tailwater Stage']?.latest_value || null,
      inflow: timeseriesMap['Pool Inflow']?.latest_value || null,
      outflow: timeseriesMap['Tailwater Outflow']?.latest_value || null,
      surcharge: 0,
      gradientBottom: levelsMap['Top of Flood']?.latest_value || null,
      gradientTop: levelsMap['Bottom of Flood']?.latest_value || null,
    };
    setInfo(_info);
  }, [location]);

  useEffect(() => {
    if (info) {
      DamProfileChart(info, ref.current);
    }
  }, [info, ref]);

  return (
    <>
      {/* <img src={DamProfileMockup} className="w-full" alt="Dam Profile Chart" /> */}
      <div className="dark:bg-orange-50 dark:invert">
        <svg
          ref={ref}
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 1240 650"
        ></svg>
      </div>
    </>
  );
}

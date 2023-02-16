import { createRef, useEffect, useState } from 'react';
//import DamProfileMockup from '../../../images/mockup/dam-profile-chart.png';
import DamProfileChart from '../../../_charts/dam-profile-chart/dam-profile-chart';

export default function ReactDamProfileChart() {
  const ref = createRef(); // element where DamProfileChart will be rendered
  const [info, setInfo] = useState(null); // information DamProfileChart needs to draw itself

  useEffect(() => {
    const _info = {
      levels: [
        { name: 'Top of Flood', value: 690 },
        { name: 'Streambed', value: 500 },
      ],
      damtop: 700,
      dambottom: 500,
      pool: 650,
      tail: 3,
      inflow: 300,
      outflow: 150,
      surcharge: 0,
      gradientBottom: 0,
      gradientTop: 100,
    };
    setInfo(_info);
  }, []);

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

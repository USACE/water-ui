import React from "react";
import { ResponsiveBullet } from "@nivo/bullet";

const data = [
  {
    id: "pool",
    ranges: [800, 830, 835, 840],
    measures: [72],
    markers: [99],
  },
  {
    id: "inflow (kcfs)",
    ranges: [0, 10, 100, 150],
    measures: [0.6366446711735895, 1.2320418844253096],
    markers: [1.226051718620335],
  },
  {
    id: "outflow (kcfs)",
    ranges: [18, 58, 7, 49, 15, 41, 0, 80],
    measures: [47],
    markers: [62],
  },
];
const MyResponsiveBullet = ({ data }) => (
  <ResponsiveBullet
    minValue='auto'
    data={data}
    layout='vertical'
    axisPosition='before'
    margin={{ left: 40 }}
    spacing={30}
    titleOffsetY={-10}
    theme={{
      fontSize: 12,
      textColor: "#F8FAFC",
    }}
  />
);

const KPIChart = () => {
  return (
    <section id='kpi'>
      <div className='mt-3 p-1 border-b'>Current Conditions</div>
      {data.map((d, idx) => (
        <div key={idx} className=''>
          <div className=''>{d.id}</div>
          <div className='h-20 w-1/4 my-4'>
            <MyResponsiveBullet data={[d]} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default KPIChart;

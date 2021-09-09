import React from "react";
import Img from "./img/USGS_Green_Banneronly_web.png";

const UsgsSiteIcon = () => (
  <div className='flex flex-col justify-center'>
    <div className='flex justify-center items-center content-center w-10 h-10 rounded-xl bg-usgs-green overflow-hidden'>
      <img
        className='w-9 h-9 bg-white'
        src={Img}
        alt='US Geological Survey Logo'
      />
    </div>
  </div>
);

export default UsgsSiteIcon;

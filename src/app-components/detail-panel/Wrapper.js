import React from "react";
import ClearSelectedButton from "./ClearSelectedButton";

const Wrapper = ({ children }) => (
  <div className='text-gray-100'>{children}</div>
);

const Title = ({ children }) => (
  <div className='mx-2 mr-2 flex items-center justify-between py-3'>
    {children}
    <div className='flex justify-around w-16'>
      <ClearSelectedButton />
    </div>
  </div>
);

const Image = ({ src, alt }) => <img src={src} alt={alt} />;

Wrapper.Title = Title;
Wrapper.Image = Image;

export default Wrapper;

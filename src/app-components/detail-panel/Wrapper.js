import React from "react";
import ClearSelectedButton from "./ClearSelectedButton";

const Wrapper = ({ children }) => (
  <div className='text-gray-100 flex flex-col max-h-full'>{children}</div>
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

const ScrollableContent = ({ children }) => (
  <div className='overflow-y-auto'>{children}</div>
);

Wrapper.Title = Title;
Wrapper.Image = Image;
Wrapper.ScrollableContent = ScrollableContent;

export default Wrapper;

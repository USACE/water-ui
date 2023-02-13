//import CastleLogo from '../images/usace-logo.png';
import { useConnect } from 'redux-bundler-hook';
import { FcDam } from 'react-icons/fc';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { BsWater } from 'react-icons/bs';
export default function PageHead({ title, subTitle }) {
  const {
    providerByRoute: provider,
    providerLocationByRoute: location,
    providerWatershedByRoute: watershed,
  } = useConnect(
    'selectProviderByRoute',
    'selectProviderLocationByRoute',
    'selectProviderWatershedByRoute'
  );

  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-center space-x-2">
        <div className="flex-shrink-0">
          <div className="relative">
            {/* <img
              className="w-18 h-16 opacity-30 grayscale invert"
              // src="https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              src={CastleLogo}
              alt=""
            /> */}

            {provider && location?.attributes?.kind === 'PROJECT' ? (
              <FcDam size={50} />
            ) : !location && !watershed ? (
              <HiOutlineBuildingOffice2 size={50} />
            ) : (
              <BsWater size={50} />
            )}

            {/* {provider && !location ? (
              <HiOutlineBuildingOffice2 size={50} />
            ) : (
              <FcDam size={50} />
            )} */}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm font-medium text-gray-500">
            {/* <a href="/" className="text-gray-900">
              {subTitle}
            </a> */}
            {subTitle}
          </p>
        </div>
      </div>
      <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        {/* <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Share
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Get Alerts
        </button> */}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { HiOutlineXMark, HiOutlineBars3 } from 'react-icons/hi2';
import UsaceLogo from '../images/usace-logo-color.svg';
import LocationCombobox from './inputs/location-search-input';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

export default function Header() {
  const { pathname, providerLocationByRoute: providerLocation } = useConnect(
    'selectPathname',
    'selectProviderLocationByRoute'
  );
  //const [name, setName] = useState(null);
  //const [type, setType] = useState(null);
  const [location, setLocation] = useState(null);

  // Invalid Checks for Form Fields (used to set aria-invalid property on form values)
  // TODO; More strict validation checking. Currently, if a string value is set, it is considered valid.
  //       In the future, may want to consider checking if string value represents a valid timeseries
  const [locationIsValid, setLocationIsValid] = useState(
    location ? true : false
  );

  const directMapLocation = providerLocation
    ? `/map/${providerLocation?.provider}/locations/${providerLocation?.slug}`
    : null;

  const nav_links = [
    { name: 'Home', path: '/' },
    { name: 'Map', path: directMapLocation || '/map' },
    { name: 'Locations', path: '/overview' },
    { name: 'Help', path: '/' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900 shadow-md">
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-4 lg:max-w-screen-2xl lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0">
                    {/* mobile logo */}
                    <a href="/">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src={UsaceLogo}
                        alt="US Army Corps of Engineers Castle Logo"
                      />

                      {/* desktop logo */}
                      <img
                        className="hidden h-10 w-auto lg:block"
                        src={UsaceLogo}
                        alt="US Army Corps of Engineers Castle Logo"
                      />
                    </a>
                    {/* <h1 className="text-white">Water Data</h1> */}
                  </div>
                  <div className="ml-2 hidden max-w-xl lg:block">
                    <h1 className="border-gray-500 text-lg text-white">
                      Water Management
                    </h1>
                    <h2 className="border-gray-500 text-xs text-gray-100">
                      National Data
                    </h2>
                  </div>

                  <div className="hidden lg:ml-6 lg:block">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      {nav_links.map((item) => {
                        return (
                          <a
                            key={item.name}
                            href={item.path}
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    {/* <label htmlFor="search" className="sr-only">
                      Search
                    </label> */}
                    <div className="relative">
                      {pathname !== '/' ? (
                        <LocationCombobox
                          label=""
                          value={location}
                          setValue={setLocation}
                          isValid={!location || locationIsValid}
                          setIsValid={setLocationIsValid}
                          isRequired={false}
                          placeholder="Search"
                          className="bg-gray-700"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <HiOutlineXMark
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <HiOutlineBars3
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                {/* <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div> */}
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}

                {nav_links.map((item) => {
                  return (
                    <Disclosure.Button
                      as="a"
                      key={item.name}
                      href={item.path}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  );
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="bg-gray-200">
        <div className="md:text-md container mx-auto py-1 text-center text-sm md:text-left lg:max-w-screen-2xl lg:px-8">
          <span className="font-bold">U.S. Army Corps of Engineers</span> Water
          Management Data
        </div>
      </div>
    </header>
  );
}

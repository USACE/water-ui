import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import UsaceLogo from '../images/usace-logo-color.svg';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

export default function Header() {
  const nav_links = [
    { name: 'Home', path: '/' },
    { name: 'Map', path: '/map' },
    { name: 'Locations', path: '/overview' },
    { name: 'Reports', path: '/' },
    { name: 'Help', path: '/' },
  ];
  return (
    <header className="sticky top-0 z-50 bg-gray-900">
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
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
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

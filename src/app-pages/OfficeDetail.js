import React, { useEffect, useState } from 'react';

import Header from '../app-components/Header';
import { connect } from 'redux-bundler-react';

// import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';
import Map from '../app-components/Map';
import Select from 'react-select';

const OfficeDetail = connect(
  'doUpdateUrl',
  'selectPathname',
  'selectOfficeItems',
  'selectOfficeByRoute',
  'selectOfficeStatsActive',
  'selectLocationItemsActive',
  'selectWatershedItemsActive',
  ({
    doUpdateUrl,
    pathname,

    officeByRoute: office,
    officeStatsActive: stats,
    officeItems: allOffices,
    locationItemsActive: locations,
    watershedItemsActive: watersheds,
  }) => {
    // useEffect(() => {
    //   AOS.init({
    //     once: true,
    //     disable: 'phone',
    //     duration: 700,
    //     easing: 'ease-out-cubic',
    //   });
    // }, [pathname]);

    useEffect(() => {
      document.querySelector('html').style.scrollBehavior = 'auto';
      window.scroll({ top: 0 });
      document.querySelector('html').style.scrollBehavior = '';
      focusHandling('outline');
    }, []); // triggered on route change

    const [state, setState] = useState({
      show_office_select: false,
      menuIsOpen: false,
    });

    const OfficeStats = ({ s }) => {
      return s.map((stat, idx) => (
        <a
          href={stat.href}
          className="w-1/2 lg:w-1/4 p-3 bg-gray-100 border-2 border-gray-200 rounded-md cursor-pointer hover:shadow-md"
        >
          <div className="font-medium text-3xl">{stat.value}</div>
          <div className="leading-relaxed">{stat.label}</div>
        </a>
      ));
    };

    const SelectedOffice = () => (
      <h1 className="title-font font-medium text-2xl lg:text-3xl text-gray-900">
        {office.name} ({office.symbol})
      </h1>
    );

    const DownArrow = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ml-2 text-gray-400 cursor-pointer ${
          state.show_office_select === true ? 'hidden' : null
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={(e) =>
          setState({
            ...state,
            show_office_select: true,
            menuIsOpen: true,
          })
        }
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );

    // const [payload, setPayload] = useState({
    //   office_symbol: office_symbol || null,
    // });

    return (
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="flex-grow bg-gray-100">
          <section className="mt-20 bg-white">
            <div className="container mx-auto flex flex-wrap py-10 px-5">
              <div className="w-full lg:w-1/2 lg:p-5 mb-5">
                <div className="mb-5 lg:mb-20">
                  <Select
                    id="districtSelect"
                    className={state.show_office_select ? 'block' : 'hidden'}
                    placeholder={<SelectedOffice />}
                    menuIsOpen={state.menuIsOpen}
                    options={allOffices.map((o, index) => ({
                      value: o.symbol,
                      label: o.name,
                    }))}
                    onChange={(e) => {
                      doUpdateUrl('/offices/' + e.value);
                      setState({
                        ...state,
                        show_office_select: false,
                      });
                    }}
                  />

                  <h1
                    className={`inline title-font font-medium text-2xl lg:text-3xl text-gray-900 ${
                      state.show_office_select ? 'hidden' : null
                    }`}
                  >
                    {office.name} ({office.symbol})
                  </h1>
                  <span className="inline-block mt-2">
                    <DownArrow />
                  </span>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap lg:gap-1">
                  {/* {Office Stats} */}

                  <OfficeStats
                    s={[
                      {
                        label: 'Projects',
                        value: (stats && stats.projects) || 0,
                        href: '#projects',
                      },
                      {
                        label: 'Watersheds',
                        value: watersheds.length || 0,
                        href: '#watersheds',
                      },
                      {
                        label: 'Locations',
                        value: (stats && stats.locations) || 0,
                        href: '#locations',
                      },
                      {
                        label: 'Placeholder',
                        value: 0,
                        href: '#placeholder',
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 hidden md:block shadow-md border-gray-200 border-2 rounded-md overflow-hidden">
                {locations.length > 0 && (
                  <Map
                    mapKey="districtMap"
                    height={360}
                    options={{
                      center:
                        locations.length > 0
                          ? locations[0].geometry.coordinates
                          : [-90.0, 38.0],
                      zoom: 6,
                    }}
                  />
                )}
              </div>
            </div>
          </section>
          <section className="mt-20">
            <div className="container mx-auto flex flex-wrap py-10 px-5">
              <h2 className="font-medium text-xl lg:text-2xl mb-5 lg:mb-20 text-gray-900">
                Watersheds
              </h2>
              <div className="flex flex-wrap xl:flex-nowrap gap-1 p-2 bg-blue-100 w-full">
                {watersheds &&
                  watersheds.map((w) => (
                    <div className="bg-gray-200 border-2 border-gray-300 p-3 rounded-md w-full lg:w-auto justify-between">
                      {w.name}
                    </div>
                  ))}
              </div>
            </div>
          </section>
          <section className="mt-20">
            <div className="container mx-auto flex flex-wrap py-10 px-5">
              <h2 className="font-medium text-xl lg:text-2xl mb-5 lg:mb-20 text-gray-900">
                Projects
              </h2>
              <div className="flex flex-wrap gap-1 p-2 bg-blue-100 w-full">
                {locations.length &&
                  locations.map((l) => (
                    <div className="bg-gray-200 border-2 border-gray-300 p-3 rounded-md w-full lg:w-auto justify-between">
                      {l.public_name}
                    </div>
                  ))}
              </div>
            </div>
          </section>
          <section className="mx-4 relative pt-32 font-mono">
            <div className="text-2xl mb-12">
              {office.name} ({office.symbol})
            </div>
            <div className="text-xl mb-4">Office JSON</div>
            <div className="mb-16">{JSON.stringify(office)}</div>
            <div className="text-xl mb-4">Office Statistics</div>
            <div className="mb-16">{JSON.stringify(stats)}</div>
            <div className="text-xl mb-4">
              Watersheds
              <span className="px-4 text-xl">({watersheds.length})</span>
            </div>
            <div className="mb-12">{JSON.stringify(watersheds)}</div>
            <div className="text-xl mb-4">
              CWMS Projects
              <span className="px-4 text-xl">({locations.length})</span>
            </div>
            <div>{JSON.stringify(locations)}</div>
          </section>
        </main>
      </div>
    );
  }
);

export default OfficeDetail;

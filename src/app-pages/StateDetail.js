import React, { useEffect } from "react";

import Header from "../app-components/Header";
import { connect } from "redux-bundler-react";

import AOS from "aos";
import { focusHandling } from "cruip-js-toolkit";

const StateDetail = connect(
  "selectPathname",
  "selectStateByRoute",
  "selectStateStatsActive",
  "selectLocationByStateItems",
  ({
    pathname,
    stateByRoute: state,
    stateStatsActive: stats,
    locationByStateItems: locations,
  }) => {
    useEffect(() => {
      AOS.init({
        once: true,
        disable: "phone",
        duration: 700,
        easing: "ease-out-cubic",
      });
    }, [pathname]);

    useEffect(() => {
      document.querySelector("html").style.scrollBehavior = "auto";
      window.scroll({ top: 0 });
      document.querySelector("html").style.scrollBehavior = "";
      focusHandling("outline");
    }, []); // triggered on route change

    return (
      <div className='flex flex-col min-h-screen overflow-hidden'>
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className='flex-grow'>
          <section className='mx-4 relative pt-32 font-mono'>
            <div className='text-2xl mb-12'>State Details Page</div>
            <div className='text-xl mb-4'>State JSON</div>
            <div className='mb-16'>{JSON.stringify(state)}</div>
            <div className='text-xl mb-4'>State Statistics</div>
            <div className='mb-16'>{JSON.stringify(stats)}</div>
            <div className='text-xl mb-4'>
              CWMS Locations
              <span className='px-4 text-xl'>({locations.length})</span>
            </div>
            <div>{JSON.stringify(locations)}</div>
          </section>
        </main>
      </div>
    );
  }
);

export default StateDetail;

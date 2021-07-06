import React, { useEffect, useRef } from "react";

import Header from "../../app-components/Header";
import HeroHome from "./HeroHome";
import HappeningNow from "./HappeningNow";
import Discovery from "./discovery";
import FeaturesBlocks from "./FeaturesBlocks";
import Footer from "../../app-components/Footer";

import Transition from "../../utils/Transition";

import { connect } from "redux-bundler-react";

import AOS from "aos";

const Home = connect(
  "selectPathname",
  "selectHash",
  "doUpdateUrl",
  ({ pathname, hash, doUpdateUrl }) => {
    const discoveryRef = useRef(null);
    const happeningRef = useRef(null);

    useEffect(() => {
      AOS.init({
        once: true,
        disable: "phone",
        duration: 700,
        easing: "ease-out-cubic",
      });
    }, [pathname]);

    // Auto Scroll Position
    useEffect(() => {
      // By Default; Scroll to "Happening Now" section
      const pathnameToRef = {
        "/happening": { ref: happeningRef, delay: 300 },
        "/discovery": { ref: discoveryRef, delay: 300 },
      };

      if (!pathnameToRef[pathname] || hash !== "") return;
      const { ref, delay } = pathnameToRef[pathname];
      setTimeout(
        () => ref && ref.current && ref.current.scrollIntoView(true),
        delay
      );
    }, [pathname, hash]);

    // Scroll to Happening Now after 2 seconds from "/" landing
    useEffect(() => {
      if (pathname === "/") {
        setTimeout(() => {
          doUpdateUrl("/happening");
        }, 2000);
      }
    }, [pathname, doUpdateUrl]);

    return (
      <div className='flex flex-col min-h-screen overflow-hidden'>
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className='flex-grow'>
          {/*  Page sections */}
          <Transition
            className='transform'
            show={true}
            appear={true}
            enter='transition ease-in duration-800'
            enterStart='opacity-0'
            enterEnd='opacity-100'
            leave='transition ease-out duration-100'
            leaveStart='opacity-100'
            leaveEnd='opacity-0'
            aria-hidden='false'
          >
            <HeroHome />
          </Transition>
          <HappeningNow getRef={() => happeningRef} />
          <Discovery getRef={() => discoveryRef} />
          <FeaturesBlocks />
        </main>

        {/*  Site footer */}
        <Footer />
      </div>
    );
  }
);

export default Home;

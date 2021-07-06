import React, { useState, useEffect } from "react";
import { SearchButton } from "../app-components/Search";
import { MapButton } from "../app-components/MapButton";
import UserMenu from "../app-components/UserMenu";
import USACELogo from "../images/USACE_logo.png";
import { connect } from "redux-bundler-react";

const Header = connect("selectPathname", "doMapsInitialize", ({ pathname }) => {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white blur shadow-lg"
      } ${pathname !== "/map" && "fixed"}`}
    >
      <div className='max-w-6xl mx-auto px-5 sm:px-6'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Site branding */}
          <div className='flex-shrink-0 mr-4'>
            <a href='/' className='block' aria-label='Cruip'>
              <div className='flex'>
                {/* Logo */}
                <div>
                  <img className='w-16 h-12' src={USACELogo} alt='USACE Logo' />
                </div>
              </div>
            </a>
          </div>

          {/* Site navigation */}

          <nav className='flex flex-grow justify-end items-center'>
            <SearchButton />
            <MapButton />

            {process.env.REACT_APP_SHOW_LOGIN.toUpperCase() === "YES" && (
              <UserMenu />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
});

export default Header;

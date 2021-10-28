import React from 'react';
import { connect } from 'redux-bundler-react';
import LoginControl from '../../login-control';
import DevBanner from '../dev-banner';

const Header = connect(
  'selectPathname',
  ({ pathname, sidebarOpen, setSidebarOpen }) => {
    const isDevelopment = process.env.REACT_APP_ISDEVELOPMENT;
    const pageName = pathname.split('/')[1];

    const HeaderBreadCrumbs = () =>
      pageName && (
        <>
          <a href="/">Home</a> {'>'} <a href={'/' + pageName}>{pageName}</a>
        </>
      );

    return (
      <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
        {isDevelopment === 'true' && <DevBanner />}

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 -mb-px">
            {/* Header: Left side */}
            <div className="flex">
              {/* Hamburger button */}
              <button
                className="text-gray-500 hover:text-gray-600 lg:hidden"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="4" y="5" width="16" height="2" />
                  <rect x="4" y="11" width="16" height="2" />
                  <rect x="4" y="17" width="16" height="2" />
                </svg>
              </button>
            </div>

            <div className="hidden sm:block ml-3 flex-1 pt-2 text-md font-semibold uppercase text-gray-400">
              <HeaderBreadCrumbs />
            </div>

            {/* Header: Right side */}
            <div className="flex items-center">
              {/* <SearchModal /> */}
              {/* <Notifications /> */}
              {/* <Help /> */}
              <div className="relative inline-flex ml-3">
                <a
                  className="text-gray-500 hover:text-blue-800"
                  title="Help"
                  href="/help"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
              {/*  Divider */}
              <hr className="w-px h-6 bg-gray-200 mx-3" />
              <LoginControl />
            </div>
          </div>
        </div>
      </header>
    );
  }
);

export default Header;

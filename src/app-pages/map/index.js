import React from 'react';
import { connect } from 'redux-bundler-react';
import debounce from 'lodash/debounce';

import PanelGroup from 'react-panelgroup';
import Map from '../../app-components/Map';
import { DetailPanel } from '../../app-components/detail-panel';
import { SettingsPanel } from '../../app-components/settings-panel';
import LoginControl from '../../app-components/login-control';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import Navbar from '../../app-components/Navbar';

const Toolbar = () => {
  return (
    <div className="absolute top-2 right-2 flex flex-row space-x-2">
      <SettingsPanel />
      {process.env.REACT_APP_SHOW_LOGIN &&
      process.env.REACT_APP_SHOW_LOGIN.toUpperCase() === 'YES' ? (
        <LoginControl />
      ) : null}
    </div>
  );
};
const Mobile = connect(
  'selectPanelgroupWidths',
  'doPanelgroupUpdateWidths',
  ({ panelgroupWidths: panelWidths, doPanelgroupUpdateWidths }) => {
    const debouncedUpdate = debounce((widths) => {
      doPanelgroupUpdateWidths(widths);
    }, 80);

    return (
      <>
        {/* Map, Detail Split Panel; HIDDEN FOR SCREEN SIZES ABOVE MD*/}
        <div className="h-screen">
          <PanelGroup
            direction="column"
            panelWidths={panelWidths}
            onUpdate={debouncedUpdate}
            spacing={5}
            borderColor="#7C3AED"
          >
            {/* Panel 1; Map Contains Div Wrapper */}
            <div>
              <Navbar />
              <Map mapKey="main" />
              <div className="absolute bottom-0 -mb-1 w-5 text-purple-700 animate-pulse">
                <ChevronUpIcon />
              </div>
            </div>

            {/* Panel 2; DetailPanel Contains Div Wrapper */}
            <div>
              <div className="absolute w-5 z-10 -mt-1 text-purple-400 animate-pulse">
                <ChevronDownIcon />
              </div>
              <DetailPanel />
            </div>
          </PanelGroup>
        </div>
        <Toolbar />
      </>
    );
  }
);

const Desktop = () => (
  <div>
    <Navbar />
    <Map mapKey="main" />
    <DetailPanel />
    <Toolbar />
  </div>
);

const M = connect('selectScreensizePx', ({ screensizePx: px }) =>
  !px ? <></> : px >= 768 ? <Desktop /> : <Mobile />
);

export default M;

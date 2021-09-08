import React from "react";
import { connect } from "redux-bundler-react";
import debounce from "lodash/debounce";

import PanelGroup from "react-panelgroup";
import Map from "../../app-components/Map";
import { DetailPanel } from "../../app-components/detail-panel";
import { SettingsPanel } from "../../app-components/settings-panel";

const Mobile = connect(
  "selectPanelgroupWidths",
  "doPanelgroupUpdateWidths",
  ({ panelgroupWidths: panelWidths, doPanelgroupUpdateWidths }) => {
    const debouncedUpdate = debounce((widths) => {
      doPanelgroupUpdateWidths(widths);
    }, 80);

    return (
      <>
        {/* Map, Detail Split Panel; HIDDEN FOR SCREEN SIZES ABOVE MD*/}
        <div className='h-screen'>
          <PanelGroup
            direction='column'
            panelWidths={panelWidths}
            onUpdate={debouncedUpdate}
          >
            {/* Panel 1; Map Contains Div Wrapper */}
            <Map mapKey='main' />
            {/* Panel 2; DetailPanel Contains Div Wrapper */}
            <DetailPanel />
          </PanelGroup>
        </div>
        <SettingsPanel />
      </>
    );
  }
);

const Desktop = () => (
  <div>
    <Map mapKey='main' />
    <DetailPanel />
  </div>
);

const M = connect("selectScreensizePx", ({ screensizePx: px }) =>
  !px ? <></> : px >= 768 ? <Desktop /> : <Mobile />
);

export default M;

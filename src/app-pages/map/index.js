import React from "react";

// import Header from "../../app-components/Header";
import Map from "../../app-components/Map";
import { DetailPanel } from "../../app-components/detail-panel";
// import BasemapSwitcher from "../../app-components/basemap-switcher";
import { SettingsPanel } from "../../app-components/settings-panel";

const M = () => {
  return (
    <div>
      <Map mapKey='main' />
      <DetailPanel />
      <SettingsPanel />
    </div>
  );
};

export default M;

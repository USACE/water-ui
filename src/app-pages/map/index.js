import React from "react";
import { connect } from "redux-bundler-react";

// import Header from "../../app-components/Header";
import Map from "../../app-components/Map";
import DetailPanel from "./detail-panel";

const M = connect("selectModalMapIsOpen", ({ modalMapIsOpen: isOpen }) => {
  return (
    <>
      <Map mapKey='main' />
      <DetailPanel />
    </>
  );
});

export default M;

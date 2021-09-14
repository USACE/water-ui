import React from "react";
import { connect } from "redux-bundler-react";
import SearchItemProject from "../SearchItem";
import KPIChart from "./kpi-chart";

import Wrapper from "../../../app-components/detail-panel/Wrapper";

const ProjectDetail = connect(
  "selectProjectDetailSelected",
  ({ projectDetailSelected: detail }) => {
    return !detail ? null : (
      <Wrapper>
        <Wrapper.Title>
          <SearchItemProject {...detail} clickable={false} />
        </Wrapper.Title>
        <Wrapper.ScrollableContent>
          <Wrapper.Image
            src={`${process.env.PUBLIC_URL}/dam.jpg`}
            alt='Selected Location'
          />
          <KPIChart />
        </Wrapper.ScrollableContent>
      </Wrapper>
    );
  }
);

export default ProjectDetail;

import React from "react";
import { connect } from "redux-bundler-react";
import SearchItemProject from "./SearchItem";

import Wrapper from "../../app-components/detail-panel/Wrapper";

const ProjectDetail = connect(
  "selectProjectDetailSelected",
  ({ projectDetailSelected: detail }) => {
    return !detail ? null : (
      <Wrapper>
        <Wrapper.Title>
          <SearchItemProject {...detail} clickable={false} />
        </Wrapper.Title>
        <Wrapper.Image
          src={detail.image || `${process.env.PUBLIC_URL}/dam.jpg`}
          alt='Selected Location'
        />
      </Wrapper>
    );
  }
);

export default ProjectDetail;

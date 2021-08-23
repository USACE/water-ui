import React from "react";
import { connect } from "redux-bundler-react";
import SearchItemProject from "../../../app-components/search/SearchItemProject";

import Wrapper from "./Wrapper";

const LocationDetail = connect(
  "selectLocationDetailSelected",
  ({ locationDetailSelected: detail }) => {
    return !detail ? null : (
      <Wrapper>
        <Wrapper.Title>
          <SearchItemProject uid={detail.slug} name={detail.public_name} />
        </Wrapper.Title>
        <Wrapper.Image
          src={detail.image || `${process.env.PUBLIC_URL}/dam.jpg`}
          alt='Selected Location'
        />
      </Wrapper>
    );
  }
);

export default LocationDetail;

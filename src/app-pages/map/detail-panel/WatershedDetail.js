import React from "react";
import { connect } from "redux-bundler-react";
import SearchItemWatershed from "../../../app-components/search/SearchItemWatershed";
import Wrapper from "./Wrapper";

const WatershedDetail = connect(
  "selectWatershedDetailSelected",
  ({ watershedDetailSelected: detail }) => {
    return !detail ? null : (
      <Wrapper>
        <Wrapper.Title>
          <SearchItemWatershed uid={detail.slug} name={detail.name} />
        </Wrapper.Title>
        <Wrapper.Image
          src={detail.image || "http://localhost:3000/watershed.jpg"}
          alt='Selected Watershed'
        />
      </Wrapper>
    );
  }
);

export default WatershedDetail;

import React from "react";
import { connect } from "redux-bundler-react";
import SearchItemWatershed from "./SearchItemWatershed";
import { Wrapper } from "../../app-components/detail-panel";

const WatershedDetail = connect(
  "selectWatershedDetailSelected",
  ({ watershedDetailSelected: detail }) => {
    return !detail ? null : (
      <Wrapper>
        <Wrapper.Title>
          <SearchItemWatershed
            uid={detail.slug}
            name={detail.name}
            clickable={false}
          />
        </Wrapper.Title>
        <Wrapper.Image
          src={detail.image || `${process.env.PUBLIC_URL}/watershed.jpg`}
          alt='Selected Watershed'
        />
      </Wrapper>
    );
  }
);

export default WatershedDetail;

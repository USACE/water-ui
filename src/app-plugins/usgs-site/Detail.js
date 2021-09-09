import React from "react";
import { connect } from "redux-bundler-react";
import SearchItemUsgsSite from "./SearchItem";
import { Wrapper } from "../../app-components/detail-panel";

const UsgsSiteDetail = connect(
  "selectUsgsSiteDetailSelected",
  ({ usgsSiteDetailSelected: detail }) => {
    return !detail ? null : (
      <Wrapper>
        <Wrapper.Title>
          <SearchItemUsgsSite
            uid={detail.site_number}
            name={detail.name}
            clickable={false}
          />
        </Wrapper.Title>
        <Wrapper.Image
          // Default Image Attribution (USGS Public Domain)
          // https://www.usgs.gov/media/images/pack-creek-pack-creek-road-bridge-river-gage
          src={detail.image || `${process.env.PUBLIC_URL}/usgssite.jpg`}
          alt='US Geological Survey Gage Location'
        />
      </Wrapper>
    );
  }
);

export default UsgsSiteDetail;

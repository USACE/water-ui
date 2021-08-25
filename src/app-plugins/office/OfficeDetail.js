import React from "react";
import { connect } from "redux-bundler-react";

import SearchItemOffice from "./SearchItemOffice";
import { Wrapper } from "../../app-components/detail-panel";

const OfficeDetail = connect(
  "selectOfficeDetailSelected",
  ({ officeDetailSelected: detail }) => {
    return !detail ? null : (
      <Wrapper>
        <Wrapper.Title>
          <SearchItemOffice uid={detail.symbol} name={detail.name} />
        </Wrapper.Title>
        <Wrapper.Image
          src={detail.image || `${process.env.PUBLIC_URL}/office.jpg`}
          alt='Selected Office'
        />
      </Wrapper>
    );
  }
);

export default OfficeDetail;

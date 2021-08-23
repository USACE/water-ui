import React from "react";
import { connect } from "redux-bundler-react";
import SearchItemOffice from "../../../app-components/search/SearchItemOffice";
import Wrapper from "./Wrapper";
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

import React from "react";
import ListItem from "./ListItem";
import { connect } from "redux-bundler-react";

const OfficeList = connect(
  "selectWatershedItems",
  ({ watershedItems: watersheds }) => {
    return (
      <>
        {watersheds && watersheds.length
          ? watersheds.map((w, idx) => (
              <ListItem
                key={idx}
                name={w.name}
                symbol={w.symbol}
                href={`/watersheds/${w.slug}`}
                description=''
              />
            ))
          : null}
      </>
    );
  }
);

export default OfficeList;

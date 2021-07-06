import React from "react";
import ListItem from "./ListItem";
import { connect } from "redux-bundler-react";

const OfficeList = connect("selectOfficeItems", ({ officeItems: offices }) => {
  return (
    <>
      {offices && offices.length
        ? offices.map((f, idx) => (
            <ListItem
              key={idx}
              name={f.name}
              symbol={f.symbol}
              href={`/offices/${f.symbol}`}
              description=''
            />
          ))
        : null}
    </>
  );
});

export default OfficeList;

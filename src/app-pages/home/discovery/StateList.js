import React from "react";
import ListItem from "./ListItem";
import { connect } from "redux-bundler-react";

const StateList = connect("selectStateItems", ({ stateItems: states }) => {
  return (
    <>
      {states && states.length
        ? states.map((s, idx) => (
            <ListItem
              key={idx}
              name={s.name}
              symbol={s.abbreviation}
              href={`/states/${s.abbreviation}`}
              description=''
            />
          ))
        : null}
    </>
  );
});

export default StateList;

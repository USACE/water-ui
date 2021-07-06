import React from "react";
import { connect } from "redux-bundler-react";

import { ResponsiveBar } from "@nivo/bar";

const StateBarGraph = connect(
  "selectStateItemsWithStats",
  "selectLocationDisplayAll",
  ({ stateItemsWithStats: states, locationDisplayAll: displayAll }) => {
    const d = [...states].reverse();
    return (
      <ResponsiveBar
        data={d}
        keys={displayAll ? ["locations"] : ["projects"]}
        indexBy='abbreviation'
        margin={{ top: 60, right: 0, bottom: 0, left: 60 }}
        layout='horizontal'
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        valueFormat={{ format: "", enabled: false }}
        colors='#43a2ca'
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisRight={null}
        axisBottom={null}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `${
            displayAll ? "# Data Locations" : "# Projects"
          } by US State or Territory Abbreviation`,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: null,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableGridX={true}
        enableGridY={false}
        labelSkipWidth={0}
        labelSkipHeight={0}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      />
    );
  }
);

export default StateBarGraph;

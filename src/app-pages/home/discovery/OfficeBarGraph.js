import React from "react";
import { connect } from "redux-bundler-react";

import { ResponsiveBar } from "@nivo/bar";

const OfficeBarGraph = connect(
  "selectOfficeItemsWithStats",
  "selectLocationDisplayAll",
  ({ officeItemsWithStats: offices, locationDisplayAll: displayAll }) => {
    return (
      <ResponsiveBar
        data={offices}
        keys={displayAll ? ["locations"] : ["projects"]}
        indexBy='name'
        margin={{ top: 60, right: 0, bottom: 0, left: 180 }}
        layout='horizontal'
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        valueFormat={{ format: "", enabled: false }}
        colors={displayAll ? "green" : "#43a2ca"}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisRight={null}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `${
            displayAll ? "# Data Locations" : "# Projects"
          } by USACE Office`,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: null,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        axisBottom={null}
        labelSkipWidth={20}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      />
    );
  }
);

export default OfficeBarGraph;

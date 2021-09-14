import React, { useState, useEffect } from "react";
import PieChart, { Series, Label, Legend } from "devextreme-react/pie-chart";

import { getCampaigns, getPositions } from "../../data";

const waterLandRatio = [
  {
    name: "Land",
    area: 0.29,
  },
  {
    name: "Water",
    area: 0.71,
  },
];

const countries = [
  {
    name: "Russia",
    area: 0.12,
  },
  {
    name: "Canada",
    area: 0.07,
  },
  {
    name: "USA",
    area: 0.07,
  },
  {
    name: "China",
    area: 0.07,
  },
  {
    name: "Brazil",
    area: 0.06,
  },
  {
    name: "Australia",
    area: 0.05,
  },
  {
    name: "India",
    area: 0.02,
  },
  {
    name: "Others",
    area: 0.55,
  },
];

const pieCharts = [
  {
    title: "Payout",
    palette: "Harmony Light",
    dataSource: countries,
  },
  {
    title: "Campaign",
    palette: "Soft Pastel",
    dataSource: waterLandRatio,
  },
  {
    title: "Position",
    palette: "Vintage",
    dataSource: waterLandRatio,
  },
];

export default function EmployeeStatisticsChart() {
  const pies = pieCharts.map((options, i) => (
    <PieChart
      className="pie"
      key={i}
      title={options.title}
      palette={options.palette}
      sizeGroup="piesGroup"
      dataSource={options.dataSource}
    >
      <Series argumentField="name" valueField="area">
        <Label visible={true} format="percent" />
      </Series>
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="right"
        rowCount={2}
      />
    </PieChart>
  ));
  return (
    <div>
      <div style={styles.pies_container}>{pies}</div>
    </div>
  );
}

const styles = {
  pies_container: {
    display: "flex",
    flexWrap: "flexWrap",
    flexBasis: "100%",
  },
};

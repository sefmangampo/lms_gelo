import React, { useState, useEffect } from "react";

import PieChart, {
  Series,
  Label,
  Legend,
  Connector,
  Export,
  SmallValuesGrouping,
} from "devextreme-react/pie-chart";
import TabPanel, { Item } from "devextreme-react/tab-panel";

import {
  getCampaigns,
  getPositions,
  getEmployees,
  getStatus,
  getEmploymentStatus,
  getSexes,
} from "../../data";
import { groupBy } from "../Grids/Helpers";

export default function EmployeeStatisticsChart() {
  const [_positionData, setPositionData] = useState();
  const [_campaignData, setCampaignData] = useState();
  const [_statusData, setStatusData] = useState();
  const [_employmentStatusData, setEmploymentStatusData] = useState();
  const [_sexData, setSexData] = useState();

  const pieCharts = [
    {
      title: "Status",
      palette: "Harmony Light",
      dataSource: _statusData,
    },
    {
      title: "Office Branch",
      palette: "Soft Pastel",
      dataSource: _campaignData,
    },
    {
      title: "Position",
      palette: "Office",
      dataSource: _positionData,
    },
    {
      title: "Employment Status",
      palette: "Material",
      dataSource: _employmentStatusData,
    },
    {
      title: "Sex",
      palette: "Vintage",
      dataSource: _sexData,
    },
  ];

  const loadData = async () => {
    const data = await getEmployees.load();
    const pos = await getPositions.load();
    const camp = await getCampaigns.load();
    const stat = await getStatus.load();
    const emp = await getEmploymentStatus.load();
    const sex = await getSexes.load();

    const positionData = [];
    const campaignData = [];
    const statusData = [];
    const employmentStatusData = [];
    const sexData = [];

    const byPosition = groupBy(data, "positionid");
    const byCampaign = groupBy(data, "campaignid");
    const byStatus = groupBy(data, "statusid");
    const byEmploymentStatus = groupBy(data, "employmentstatusid");
    const bySex = groupBy(data, "sexid");

    for (let key in bySex) {
      sexData.push({
        name: sex.filter((i) => i.id == key)[0].name,
        count: bySex[key].length,
      });
    }

    setSexData(sexData);
    for (let key in byPosition) {
      positionData.push({
        name: pos.filter((i) => i.id == key)[0].name,
        count: byPosition[key].length,
      });
    }
    setPositionData(positionData);

    for (let key in byCampaign) {
      campaignData.push({
        name: camp.filter((i) => i.id == key)[0].name,
        count: byCampaign[key].length,
      });
    }

    setCampaignData(campaignData);

    for (let key in byStatus) {
      statusData.push({
        name: stat.filter((i) => i.id == key)[0].name,
        count: byStatus[key].length,
      });
    }
    setStatusData(statusData);

    for (let key in byEmploymentStatus) {
      employmentStatusData.push({
        name: emp.filter((i) => i.id == key)[0].name,
        count: byEmploymentStatus[key].length,
      });
    }

    setEmploymentStatusData(employmentStatusData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const customizeText = (args) => {
    return `${args.argument} - ${args.valueText} (${args.percentText})`;
  };

  const pies = pieCharts.map((options, i) => (
    <Item key={i} title={options.title}>
      <div styles={styles.pies_container}>
        <PieChart
          className="pie"
          key={i}
          title={options.title}
          palette={options.palette}
          sizeGroup="piesGroup"
          resolveLabelOverlapping="shift"
          dataSource={options.dataSource}
        >
          <Series argumentField="name" valueField="count">
            <Label visible={true} customizeText={customizeText} />
            <Connector visible={true} />
            <SmallValuesGrouping threshold={10} mode="smallValueThreshold" />
          </Series>
          <Legend horizontalAlignment="right"></Legend>
          <Export enabled={true} />
        </PieChart>
      </div>
    </Item>
  ));
  return (
    <div>
      <TabPanel>{pies}</TabPanel>
    </div>
  );
}

const styles = {
  pies_container: {
    display: "flex",
  },
};

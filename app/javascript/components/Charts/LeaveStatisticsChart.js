import React, { useState, useEffect } from "react";
import Chart, {
  Format,
  CommonSeriesSettings,
  Legend,
  Tooltip,
  Export,
  SeriesTemplate,
  Label,
  Series,
} from "devextreme-react/chart";

import { getEmployeeLeaves } from "../../data";

export default function LeaveStatisticsChart() {
  const [monthlyData, setMonthlyData] = useState();
  const currentYear = new Date().getFullYear();
  const processData = async () => {
    const leaves = await getEmployeeLeaves.load();

    const tempData = [
      {
        month: "January",
        total: 0,
      },
      {
        month: "February",
        total: 0,
      },
      {
        month: "March",
        total: 0,
      },
      {
        month: "April",
        total: 0,
      },
      {
        month: "May",
        total: 0,
      },
      {
        month: "June",
        total: 0,
      },
      {
        month: "July",
        total: 0,
      },
      {
        month: "August",
        total: 0,
      },
      {
        month: "September",
        total: 0,
      },
      {
        month: "October",
        total: 0,
      },
      {
        month: "November",
        total: 0,
      },
      {
        month: "December",
        total: 0,
      },
    ];

    leaves.map((leave) => {
      const dateEff = new Date(leave.dateeffective);

      if (dateEff.getFullYear() == currentYear) {
        tempData[dateEff.getMonth()].total++;
      }
    });

    setMonthlyData(tempData);
  };

  useEffect(() => {
    processData();
  }, []);

  return (
    <div>
      <Chart
        title={`${currentYear} - Leaves per month`}
        dataSource={monthlyData}
        palette="Harmony Light"
        id="chart"
      >
        <CommonSeriesSettings
          argumentField="month"
          valueField="total"
          ignoreEmptyPoints={true}
          type="bar"
        >
          <Label visible={true}>
            <Format type="fixedPoint" precision={0} />
          </Label>
        </CommonSeriesSettings>
        <Series></Series>
        <SeriesTemplate nameField="month" />

        <Tooltip enabled={true} shared={true} />
        <Legend visible={false} />
        <Export enabled={true} />
      </Chart>
    </div>
  );
}

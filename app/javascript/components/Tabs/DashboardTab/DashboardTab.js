import React, { useState } from "react";

import { DashboardMenu } from "../../SideMenu";

import DashBoardScheduler from "../../Scheduler/DashBoardScheduler";
import { LeaveStatisticsChart, EmployeeStatisticsChart } from "../../Charts";

import css from "./Dashboard.module.scss";

export default function DashboardTab() {
  const [selectedItem, setSelectedItem] = useState(1);
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <DashboardMenu setSelectedItem={setSelectedItem} />
      </div>
      <div className={css.contentbar}>
        {selectedItem === 1 && <DashBoardScheduler />}
        {selectedItem === 2 && <LeaveStatisticsChart />}
        {selectedItem === 3 && <EmployeeStatisticsChart />}
      </div>
    </div>
  );
}

import React, { useState } from "react";

import { DashboardMenu } from "../../SideMenu";

import DashBoardScheduler from "../../Scheduler/DashBoardScheduler";
import { LeaveStatisticsChart, EmployeeStatisticsChart } from "../../Charts";

import css from "./Dashboard.module.scss";

export default function DashboardTab() {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <DashboardMenu setSelectedItem={setSelectedItem} />
      </div>
      <div className={css.contentbar}>
        {selectedItem === 0 && <DashBoardScheduler />}
        {selectedItem === 1 && <LeaveStatisticsChart />}
        {selectedItem === 2 && <EmployeeStatisticsChart />}
      </div>
    </div>
  );
}

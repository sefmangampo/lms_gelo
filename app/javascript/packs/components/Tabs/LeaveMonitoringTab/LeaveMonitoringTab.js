import React, { useState } from "react";

import { MonitoringMenu } from "../../SideMenu";

import { EmployeeLeavesGrid } from "../../Grids";

import css from "./LeaveMonitoring.module.scss";

export default function LeaveMonitoringTab() {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <MonitoringMenu setSelectedItem={setSelectedItem} />
      </div>
      <div className={css.contentbar}>
        {selectedItem === 0 && <EmployeeLeavesGrid />}
      </div>
    </div>
  );
}

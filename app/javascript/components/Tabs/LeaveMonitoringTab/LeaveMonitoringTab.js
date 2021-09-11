import React, { useState } from "react";

import { MonitoringMenu } from "../../SideMenu";

import {
  EmployeeLeavesGrid,
  LeaveCreditsGrid,
  LeaveAccrualSettingsGrid,
  LeaveAccrualsGrid,
  LeaveAccrualQueueGrid,
  AdjustmentsGrid,
  UndertimeGrid,
} from "../../Grids";

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
        {selectedItem === 1 && <LeaveCreditsGrid />}
        {selectedItem === 2 && <UndertimeGrid />}
        {selectedItem === 3 && <LeaveAccrualsGrid />}
        {selectedItem === 4 && <LeaveAccrualQueueGrid />}
        {selectedItem === 5 && <LeaveAccrualSettingsGrid />}
        {selectedItem === 6 && <AdjustmentsGrid />}
      </div>
    </div>
  );
}

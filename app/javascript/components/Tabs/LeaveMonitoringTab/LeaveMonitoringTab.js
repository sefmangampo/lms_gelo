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
  const [selectedItem, setSelectedItem] = useState(1);
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <MonitoringMenu setSelectedItem={setSelectedItem} />
      </div>
      <div className={css.contentbar}>
        {selectedItem === 1 && <EmployeeLeavesGrid />}
        {selectedItem === 2 && <LeaveCreditsGrid />}
        {selectedItem === 3 && <UndertimeGrid />}
        {selectedItem === 4 && <LeaveAccrualsGrid />}
        {selectedItem === 5 && <LeaveAccrualQueueGrid />}
        {selectedItem === 6 && <LeaveAccrualSettingsGrid />}
        {selectedItem === 7 && <AdjustmentsGrid />}
      </div>
    </div>
  );
}

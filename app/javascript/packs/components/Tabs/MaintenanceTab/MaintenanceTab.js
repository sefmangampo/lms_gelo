import React, { useState } from "react";

import {
  EmployeeMasterGrid,
  PaymentModeGrid,
  CutOffsGrid,
  LeaveStatusGrid,
  LeaveTypesGrid,
} from "../../Grids";
import { MaintanceMenu } from "../../SideMenu";

import css from "./Maintenance.module.scss";

export default function MaintenanceTab() {
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <MaintanceMenu setSelectedItem={setSelectedItem} />
      </div>
      <div className={css.contentbar}>
        {selectedItem === 0 && <EmployeeMasterGrid />}
        {selectedItem === 1 && <CutOffsGrid />}
        {selectedItem === 2 && <PaymentModeGrid />}
        {selectedItem === 3 && <LeaveStatusGrid />}
        {selectedItem === 4 && <LeaveTypesGrid />}
      </div>
    </div>
  );
}

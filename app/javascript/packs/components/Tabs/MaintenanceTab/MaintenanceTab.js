import React, { useState } from "react";

import {
  EmployeeMasterGrid,
  PaymentModeGrid,
  CutOffsGrid,
  LeaveStatusGrid,
  LeaveTypesGrid,
  AccrualTypesGrid,
  PositionsGrid,
  CampaignGrid,
  CutffOffGroupGrid,
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
        {selectedItem === 5 && <AccrualTypesGrid />}
        {selectedItem === 6 && <CampaignGrid />}
        {selectedItem === 7 && <PositionsGrid />}
        {selectedItem === 8 && <CutffOffGroupGrid />}
      </div>
    </div>
  );
}

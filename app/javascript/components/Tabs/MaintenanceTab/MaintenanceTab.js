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
  SexGrid,
  EmployeeStatusGrid,
  EmploymentStatusGrid,
} from "../../Grids";

import { UploadExcelLayout } from "../../Layouts";

import { MaintanceMenu } from "../../SideMenu";

import css from "./Maintenance.module.scss";

export default function MaintenanceTab() {
  const [selectedItem, setSelectedItem] = useState(1);

  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <MaintanceMenu setSelectedItem={setSelectedItem} />
      </div>
      <div className={css.contentbar}>
        {selectedItem === 1 && <EmployeeMasterGrid />}
        {selectedItem === 2 && <CutOffsGrid />}
        {selectedItem === 3 && <PaymentModeGrid />}
        {selectedItem === 4 && <LeaveStatusGrid />}
        {selectedItem === 5 && <LeaveTypesGrid />}
        {selectedItem === 6 && <AccrualTypesGrid />}
        {selectedItem === 7 && <CampaignGrid />}
        {selectedItem === 8 && <PositionsGrid />}
        {selectedItem === 9 && <SexGrid />}
        {selectedItem === 10 && <EmployeeStatusGrid />}
        {selectedItem === 11 && <EmploymentStatusGrid />}
        {selectedItem === 12 && <UploadExcelLayout />}
      </div>
    </div>
  );
}

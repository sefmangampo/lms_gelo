import React, { useState } from "react";

import EmployeeMasterGrid from "../../Grids/EmployeeMasterGrid";
import PaymentModeGrid from "../../Grids/PaymentModeGrid";
import CutOffsGrid from "../../Grids/CutOffsGrid";
import LeaveStatusGrid from "../../Grids/LeaveStatusGrid";

import LeftTreeMenu from "../../LeftTreeMenu";

import css from "../MaintenanceTab/Maintenance.module.scss";

export default function MaintenanceTab() {
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <LeftTreeMenu setSelectedItem={setSelectedItem} />
      </div>
      <div className={css.contentbar}>
        {selectedItem === 0 && <EmployeeMasterGrid />}
        {selectedItem === 1 && <CutOffsGrid />}
        {selectedItem === 2 && <PaymentModeGrid />}
        {selectedItem === 3 && <LeaveStatusGrid />}
      </div>
    </div>
  );
}

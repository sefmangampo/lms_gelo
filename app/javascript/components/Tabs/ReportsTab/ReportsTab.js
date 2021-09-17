import React, { useState } from "react";

import { ReportsMenu } from "../../SideMenu";

import css from "../ReportsTab/Reports.module.scss";

import { CreateReportsGrid } from "../../Grids";

export default function ReportsTab() {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <ReportsMenu setSelectedItem={setSelectedItem} />
      </div>
      <div className={css.contentbar}>
        {selectedItem === 0 && <CreateReportsGrid />}
      </div>
    </div>
  );
}

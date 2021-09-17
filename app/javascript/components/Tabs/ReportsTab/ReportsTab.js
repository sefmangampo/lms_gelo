import React, { useState } from "react";

import { ReportsMenu } from "../../SideMenu";

import css from "../ReportsTab/Reports.module.scss";

import { CreateReportsGrid } from "../../Grids";

export default function ReportsTab() {
  const [selectedItem, setSelectedItem] = useState(1);
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <ReportsMenu setSelectedItem={setSelectedItem} />
      </div>
      <div className={css.contentbar}>
        {selectedItem === 1 && <CreateReportsGrid />}
      </div>
    </div>
  );
}

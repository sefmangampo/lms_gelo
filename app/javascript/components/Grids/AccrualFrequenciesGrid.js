import React from "react";

import DataGrid, { Column, Editing, Export } from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getAccrualFrequency } from "../../data/";
import { onToolbarPreparing } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getAccrualFrequency,
});

export default function AccrualFrequenciesGrid() {
  const setToolbar = (e) => {
    onToolbarPreparing(e, "Accrual Frequency");
  };

  const onInitNewRow = (e) => {
    e.data.active = true;
    e.data.iscusomt = true;
    e.data.frequency = 0;
  };

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        onInitNewRow={onInitNewRow}
        onToolbarPreparing={setToolbar}
        rowAlternationEnabled={true}
      >
        <Editing
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          mode="form"
        />
        <Column dataField="name" caption="Name" dataType="string" />
        <Column dataField="frequency" caption="Frequency" dataType="float" />
        <Column dataField="ismonthly" caption="Monthly" dataType="boolean" />
        <Column dataField="isyearly" caption="Yearly" dataType="boolean" />
        <Column dataField="iscustom" caption="Custom" dataType="boolean" />
        <Export enabled={true} />
      </DataGrid>
    </div>
  );
}

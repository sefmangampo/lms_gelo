import React from "react";

import DataGrid, { Column, Editing, Export } from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getLeaveStatuses } from "../../data/";
import { onToolbarPreparing, disableRowEditing } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getLeaveStatuses,
});

export default function LeaveStatusGrid() {
  const setToolbar = (e) => {
    onToolbarPreparing(e, "Leave Statuses");
  };

  const onInitNewRow = (e) => {
    e.data.active = true;
  };

  const onCellPrepared = (e) => {
    disableRowEditing(e);
  };

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        onCellPrepared={onCellPrepared}
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
        <Column dataField="active" caption="Active" dataType="boolean" />
        <Export enabled={true} />
      </DataGrid>
    </div>
  );
}

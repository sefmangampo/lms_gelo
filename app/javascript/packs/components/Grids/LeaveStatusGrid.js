import React from "react";

import DataGrid, { Column, Editing, Export } from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getLeaveStatuses } from "../../data/";
import { exportToPDF, exportButton } from "./Helpers/ExportToPDF";

const dataSource = new DataSource({
  key: "id",
  store: getLeaveStatuses(),
});

export default function LeaveStatusGrid() {
  const onToolbarPreparing = (e) => {
    exportButton.options.onClick = () => {
      exportToPDF(e.component, "LeaveStatus");
    };

    e.toolbarOptions.items.unshift(exportButton);
    e.toolbarOptions.items[2].location = "before";
  };
  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        onToolbarPreparing={onToolbarPreparing}
        rowAlternationEnabled={true}
      >
        <Editing
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          mode="row"
        />
        <Column dataField="name" caption="Name" dataType="string" />
        <Column dataField="active" caption="Active" dataType="boolean" />
        <Export enabled={true} />
      </DataGrid>
    </div>
  );
}

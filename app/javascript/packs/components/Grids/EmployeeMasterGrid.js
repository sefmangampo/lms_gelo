import React from "react";

import DataGrid, {
  Column,
  Editing,
  Selection,
  Export,
  ColumnChooser,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getEmployees } from "../../data";
import { exportToPDF, exportButton } from "./Helpers/ExportToPDF";

const dataSource = new DataSource({
  key: "id",
  store: getEmployees(),
});

export default function EmployeeMasterGrid() {
  const onToolbarPreparing = (e) => {
    exportButton.options.onClick = () => {
      exportToPDF(e.component, "EmployeeMasterList");
    };

    e.toolbarOptions.items.unshift(exportButton);
    e.toolbarOptions.items[2].location = "before";
  };

  return (
    <div>
      <DataGrid
        onToolbarPreparing={onToolbarPreparing}
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        rowAlternationEnabled={true}
      >
        <Editing
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          mode="popup"
        />
        <Column dataField="lastname" caption="Last Name" />
        <Column dataField="firstname" caption="First Name" />
        <Column dataField="middlename" caption="Middle Name" />
        <Column dataField="datehired" caption="Date Hired" dataType="date" />
        <Column
          dataField="dateregular"
          caption="Date Regular"
          dataType="date"
        />
        <Column dataField="active" dataType="boolean" caption="Active" />
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} mode="select" />
        <Selection mode="multiple" />
      </DataGrid>
    </div>
  );
}

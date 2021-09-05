import React from "react";

import DataGrid, { Column, Editing, Export } from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getPaymentModes } from "../../data/";

import { exportToPDF, exportButton } from "./Helpers/ExportToPDF";

const dataSource = new DataSource({
  key: "id",
  store: getPaymentModes(),
});

export default function PaymentModeGrid() {
  const onToolbarPreparing = (e) => {
    exportButton.options.onClick = () => {
      exportToPDF(e.component, "PaymentMode");
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
          mode="row"
        />
        <Column dataField="name" caption="Name" dataType="string" />
        <Column
          dataField="useincutoffs"
          caption="Use in Cut-Offs"
          dataType="boolean"
        />
        <Column dataField="active" caption="Active" dataType="boolean" />
        <Export enabled={true} />
      </DataGrid>
    </div>
  );
}

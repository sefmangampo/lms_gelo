import React from "react";

import DataGrid, { Column, Editing, Export } from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getPaymentModes } from "../../data/";
import { onToolbarPreparing } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getPaymentModes,
});

export default function PaymentModeGrid() {
  const setToolbar = (e) => {
    onToolbarPreparing(e, "Payment Modes");
  };

  const onInitNewRow = (e) => {
    e.data.active = true;
    e.data.useincutoffs = true;
  };

  return (
    <div>
      <DataGrid
        onToolbarPreparing={setToolbar}
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        onInitNewRow={onInitNewRow}
        rowAlternationEnabled={true}
      >
        <Editing
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          mode="form"
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

import React, { useState, useEffect } from "react";

import DataGrid, {
  Column,
  Editing,
  Lookup,
  Export,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getPayGroups, getPaymentModes, getActiveStore } from "../../data/";
import { onToolbarPreparing, setActiveLookUp } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getPayGroups,
});

export default function PayGroupsGrid() {
  const [paymodes, setPaymodes] = useState();

  const setToolbar = (e) => {
    onToolbarPreparing(e, "Pay Groups");
  };

  useEffect(() => {
    getActiveStore(getPaymentModes, setPaymodes);
  }, []);

  const onInitNewRow = (e) => {
    e.data.active = true;
    e.data.paymodeid = 1;
  };

  const onEditorPreparing = (e) => {
    setActiveLookUp(e, "paymodeid", paymodes);
  };

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        onEditorPreparing={onEditorPreparing}
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
        <Column dataField="paymodeid" caption="Pay mode" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={getPaymentModes}
          />
        </Column>
        <Column
          dataField="description"
          caption="Description"
          dataType="string"
        />

        <Column dataField="active" caption="Active" dataType="boolean" />
        <Export enabled={true} />
      </DataGrid>
    </div>
  );
}

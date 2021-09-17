import React, { useState, useEffect } from "react";

import DataGrid, {
  Column,
  Editing,
  Export,
  Lookup,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import {
  getLeaveAccrualTypes,
  getAccrualFrequency,
  getActiveStore,
} from "../../data/";
import {
  onToolbarPreparing,
  disableRowEditing,
  setActiveLookUp,
} from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getLeaveAccrualTypes,
});

export default function AccrualTypesGrid() {
  const [frequency, setFrequency] = useState();

  useEffect(() => {
    getActiveStore(getAccrualFrequency, setFrequency);
  }, []);

  const setToolbar = (e) => {
    onToolbarPreparing(e, "Accrual Types");
  };

  const onInitNewRow = (e) => {
    e.data.active = true;
  };

  const onCellPrepared = (e) => {
    disableRowEditing(e);
  };

  const onEditorPreparing = (e) => {
    setActiveLookUp(e, "frequencyid", frequency);
  };

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        onCellPrepared={onCellPrepared}
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
        <Column dataField="frequencyid" caption="Frequency" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={getAccrualFrequency}
          />
        </Column>
        <Column dataField="active" caption="Active" dataType="boolean" />
        <Export enabled={true} />
      </DataGrid>
    </div>
  );
}

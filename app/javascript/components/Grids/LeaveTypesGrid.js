import React from "react";

import DataGrid, { Column, Editing, Export } from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getLeaveTypes } from "../../data/";
import { onToolbarPreparing } from "./Helpers";
import "devextreme-react/text-area";
const dataSource = new DataSource({
  key: "id",
  store: getLeaveTypes,
});

export default function LeaveTypesGrid() {
  const setToolbar = (e) => {
    onToolbarPreparing(e, "Leave Types");
  };

  const onInitNewRow = (e) => {
    e.data.active = true;
    e.data.ispaid = true;
  };

  const onEditorPreparing = (e) => {
    if (e.dataField == "description" && e.parentType === "dataRow") {
      e.editorName = "dxTextArea";
    }
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
        <Column dataField="code" caption="Code" dataType="string" />
        <Column dataField="ispaid" caption="is Paid?" dataType="boolean" />
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

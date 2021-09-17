import React from "react";

import DataGrid, {
  Column,
  Editing,
  Export,
  Paging,
  Pager,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getEmploymentStatus } from "../../data/";
import { onToolbarPreparing } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getEmploymentStatus,
});

export default function EmploymentStatusGrid() {
  const setToolbar = (e) => {
    onToolbarPreparing(e, "Employee Status");
  };

  const onInitNewRow = (e) => {
    e.data.active = true;
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
        <Pager visible={true} displayMode="full" showInfo={true} />
        <Column dataField="name" caption="Name" dataType="string" />
        <Column dataField="active" caption="Active" dataType="boolean" />
        <Export enabled={true} />
      </DataGrid>
    </div>
  );
}

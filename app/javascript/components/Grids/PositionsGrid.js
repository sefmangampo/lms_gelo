import React from "react";

import DataGrid, {
  Column,
  Editing,
  Export,
  Pager,
  Paging,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getPositions } from "../../data/";
import { onToolbarPreparing } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getPositions,
});

export default function PositionsGrid() {
  const setToolbar = (e) => {
    onToolbarPreparing(e, "Job Position");
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
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          displayMode="full"
          showInfo={true}
          showPageSizeSelector={true}
        />
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

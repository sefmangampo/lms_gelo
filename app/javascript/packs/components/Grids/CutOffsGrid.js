import React, { useState, useEffect } from "react";

import DataGrid, {
  Column,
  Editing,
  Lookup,
  FormItem,
  Selection,
  Paging,
  ColumnChooser,
  Export,
  RequiredRule,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getCutOffs, getPaymentModes } from "../../data/";
import { exportToPDF, exportButton } from "./Helpers/ExportToPDF";

const dataSource = new DataSource({
  key: "id",
  store: getCutOffs(),
});

export default function CutOffsGrid() {
  const [pModes, setPModes] = useState(null);

  const onToolbarPreparing = (e) => {
    exportButton.options.onClick = () => {
      exportToPDF(e.component, "CutOffs");
    };

    e.toolbarOptions.items.unshift(exportButton);
    e.toolbarOptions.items[2].location = "before";
  };

  const paymentModes = async () => {
    const data = await getPaymentModes().load();
    const modes = data.filter((item) => item.active && item.useincutoffs);

    setPModes(modes);
  };

  useEffect(() => {
    paymentModes();
  }, []);

  const onEditorPreparing = (e) => {
    if (e.parentType == "dataRow") {
      if (e.dataField == "paymentmodeid") {
        e.editorOptions.dataSource = new DataSource({
          store: pModes,
          key: "id",
        });
        e.editorOptions.onValueChanged = ({ value }) => {
          e.row.data.paymentmodeid = value;
        };

        if (e.row.isNewRow) {
          e.editorOptions.onInitialized = (e) => {
            e.component.option("value", 2);
          };
        }
      }

      if (e.dataField == "active" && e.row.isNewRow) {
        e.editorOptions.onInitialized = (e) => {
          e.component.option("value", true);
        };
      }
    }
  };

  const LUdataSource = {
    store: {
      data: pModes,
      type: "array",
    },
    key: "id",
  };

  const dataEditorOptions = {
    openOnFieldClick: true,
  };

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        rowAlternationEnabled={true}
        onToolbarPreparing={onToolbarPreparing}
        onEditorPreparing={onEditorPreparing}
      >
        <Editing
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          mode="form"
        />
        <Paging pageSize={10} />
        <Column
          visible={false}
          dataField="id"
          dataType="integer"
          sortOrder="desc"
        >
          <FormItem visible={false} />
        </Column>
        <Column dataField="name" caption="Name" dataType="string">
          <RequiredRule />
        </Column>
        <Column dataField="paymentmodeid" caption="Type">
          <Lookup valueExpr="id" displayExpr="name" dataSource={LUdataSource} />
        </Column>
        <Column
          dataField="startdate"
          caption="Start Date"
          dataType="date"
          editorOptions={dataEditorOptions}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="enddate"
          caption="End Date"
          dataType="date"
          editorOptions={dataEditorOptions}
        >
          <RequiredRule />
        </Column>
        <Column dataField="active" caption="Active" dataType="boolean"></Column>
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} mode="select" />
        <Selection mode="multiple" />
      </DataGrid>
    </div>
  );
}

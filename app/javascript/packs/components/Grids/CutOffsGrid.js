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
  CustomRule,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getCutOffs, getPaymentModes } from "../../data/";
import { onToolbarPreparing } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getCutOffs,
});

export default function CutOffsGrid() {
  const [pModes, setPModes] = useState(null);

  const setToolbar = (e) => {
    onToolbarPreparing(e, "Cut Offs");
  };

  const paymentModes = async () => {
    const data = await getPaymentModes.load();
    const modes = data.filter((item) => item.active && item.useincutoffs);

    setPModes(modes);
  };

  const onInitNewRow = (e) => {
    e.data.active = true;
    e.data.paymentmodeid = 2;
    e.data.startdate = new Date();
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
      }
    }
  };

  const startDateValidation = ({ data, value, rule }) => {
    if (data.enddate) {
      if (new Date(data.enddate) < new Date(value)) {
        rule.message = "Start Date must not be greater than End Date";
        return false;
      }
    }
    return true;
  };

  const EndDateValidation = ({ data, value, rule }) => {
    if (data.startdate) {
      if (new Date(data.startdate) > new Date(value)) {
        rule.message = "End Date must not be less than Start Date";
        return false;
      }
    }
    return true;
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
        onInitNewRow={onInitNewRow}
        rowAlternationEnabled={true}
        onToolbarPreparing={setToolbar}
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
          <CustomRule validationCallback={startDateValidation} />
        </Column>
        <Column
          dataField="enddate"
          caption="End Date"
          dataType="date"
          editorOptions={dataEditorOptions}
        >
          <RequiredRule />
          <CustomRule validationCallback={EndDateValidation} />
        </Column>
        <Column dataField="active" caption="Active" dataType="boolean"></Column>
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} mode="select" />
        <Selection mode="multiple" />
      </DataGrid>
    </div>
  );
}

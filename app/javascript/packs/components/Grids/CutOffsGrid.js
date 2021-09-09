import React, { useState, useEffect, useRef } from "react";

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
import { start } from "turbolinks";

const dataSource = new DataSource({
  key: "id",
  store: getCutOffs,
});

export default function CutOffsGrid() {
  const [pModes, setPModes] = useState(null);
  const [pmLu, setPmLu] = useState(null);

  const datagridRef = useRef(null);

  const setToolbar = (e) => {
    const filterSelectBox = [
      {
        location: "after",
        widget: "dxSelectBox",
        options: {
          dataSource: pmLu,
          displayExpr: "name",
          valueExpr: "id",
          value: 0,
          onValueChanged: ({ value }) => {
            const grid = datagridRef.current.instance;

            if (value === 0) {
              grid.clearFilter();
            } else {
              grid.filter(["paymentmodeid", "=", value]);
            }
          },
        },
      },
    ];

    onToolbarPreparing(e, "Cut Offs", filterSelectBox);
  };

  const paymentModes = async () => {
    const data = await getPaymentModes.load();
    const modes = data.filter((item) => item.active && item.useincutoffs);
    setPModes(modes);

    const newModes = [{ id: 0, name: "All" }, ...modes];

    setPmLu(newModes);
  };

  const onInitNewRow = (e) => {
    const today = new Date();

    e.data.active = true;
    e.data.paymentmodeid = 2;
    e.data.startdate = today;
    e.data.year = today.getFullYear();
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

  const setYearValue = (newData, value, currentRowData) => {
    const tod = new Date(value);

    newData.year = tod.getFullYear();
    newData.startdate = value;

    const daystoadd = currentRowData.paymentmodeid == 2 ? 14 : 6;
    newData.enddate = new Date(tod.setDate(tod.getDate() + daystoadd));
  };

  const setPayMode = (newData, value, currentData) => {
    const startDate = currentData.startDate
      ? new Date(currentData.startDate)
      : new Date();

    const daystoadd = value == 2 ? 14 : 6;

    newData.paymentmodeid = value;
    newData.enddate = new Date(
      startDate.setDate(startDate.getDate() + daystoadd)
    );
  };

  return (
    <div>
      <DataGrid
        ref={datagridRef}
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        onInitNewRow={onInitNewRow}
        allowColumnReordering={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}
        onToolbarPreparing={setToolbar}
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
        <Column dataField="year" caption="Year" dataType="string"></Column>
        <Column
          dataField="paymentmodeid"
          caption="Type"
          setCellValue={setPayMode}
        >
          <Lookup valueExpr="id" displayExpr="name" dataSource={LUdataSource} />
        </Column>
        <Column
          dataField="startdate"
          caption="Start Date"
          dataType="date"
          setCellValue={setYearValue}
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

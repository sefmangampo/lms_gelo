import React, { useState, useEffect, useRef } from "react";

import DataGrid, {
  Column,
  Export,
  Selection,
  ColumnChooser,
  Lookup,
  Paging,
  Editing,
  FilterPanel,
  StateStoring,
  FilterRow,
  RequiredRule,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import {
  getEmployees,
  getUnderTimes,
  getCutOffs,
  getActiveStore,
} from "../../data/";

import { onToolbarPreparing, setActiveLookUp } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getUnderTimes,
});

export default function UndertimeGrid() {
  const [employees, setEmployees] = useState(null);
  const [cutoffLU, setCutoffLU] = useState();
  let lastcutoff = 0;

  const dataGridref = useRef();

  const getLastCutoff = async () => {
    const data = await getCutOffs.load();

    data.reverse();

    setCutoffLU(data);
    lastcutoff = data[0].id;
  };

  const setToolbar = (e) => {
    onToolbarPreparing(e, "Undertimes");
  };

  const initEmployees = async () => {
    const data = await getEmployees.load();
    const activeData = data.filter((e) => e.active);

    activeData.map((d) => {
      d.name = `${d.lastname}, ${d.firstname} ${d.middlename}`;
    });
    setEmployees(activeData);
  };

  const EmployeeLUDs = {
    store: {
      data: employees,
      type: "array",
    },
    key: "id",
  };

  useEffect(() => {
    initEmployees();
    getLastCutoff();
  }, []);

  const onInitNewRow = (e) => {
    e.data.cutoffid = lastcutoff;
  };

  const dateEditorOptions = {
    type: "time",
    showClearButton: true,
    openOnFieldClick: true,
  };
  const onEditorPreparing = (e) => {
    if (e.parentType === "dataRow") {
      if (e.dataField == "to" || e.dataField == "from") {
        e.editorOptions.type = "time";
        e.editorOptions.showClearButton = true;
      }
    }
  };

  const setDateCellValue = (newData, value) => {
    newData.to = value;
    newData.from = value;
    newData.date = value;
  };

  const setToCellValue = (newData, value, currentRowData) => {
    newData.to = value;

    if (newData.to && currentRowData.from) {
      const datediff = newData.to - currentRowData.from;
      newData.hours = datediff / 36e5;
    }
  };
  const setFromCellValue = (newData, value, currentRowData) => {
    newData.from = value;

    if (currentRowData.to && newData.from) {
      const datediff = currentRowData.to - newData.from;
      newData.hours = datediff / 36e5;
    }
  };

  return (
    <div>
      <DataGrid
        ref={dataGridref}
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        dateSerializationFormat="yyyy-MM-ddTHH:mm:ssZ"
        onEditorPreparing={onEditorPreparing}
        allowColumnReordering={true}
        allowColumnResizing={true}
        onInitNewRow={onInitNewRow}
        onToolbarPreparing={setToolbar}
        rowAlternationEnabled={true}
      >
        <FilterPanel visible={true} />
        <FilterRow visible={true} />
        <Paging pageSize={10} />
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="lms_undertime"
        />
        <Column dataField="employeeid" caption="Employee" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={EmployeeLUDs}
          />
          <RequiredRule />
        </Column>
        <Column
          dataField="date"
          setCellValue={setDateCellValue}
          caption="Date"
          dataType="date"
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="fromhours"
          caption="From"
          dataType="datetime"
          setCellValue={setFromCellValue}
          editorOptions={dateEditorOptions}
        >
          <RequiredRule />
        </Column>

        <Column
          dataField="tohours"
          caption="To"
          dataType="datetime"
          setCellValue={setToCellValue}
          editorOptions={dateEditorOptions}
        >
          <RequiredRule />
        </Column>
        <Column
          name="hours"
          caption="Hours"
          dataType="number"
          allowEditing={false}
        />
        <Column dataField="year" caption="Year" dataType="number" />
        <Column dataField="remarks" caption="Remarks" dataType="string" />
        <Column dataField="cutoffid" caption="CutOff" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={cutoffLU}
          />
          <RequiredRule />
        </Column>

        <Export enabled={true} allowExportSelectedData={true} />
        <Selection mode="multiple" />
        <Editing
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          mode="popup"
        />
        <ColumnChooser enabled={true} mode="select" />
        <Summary>
          <TotalItem column="employeeid" summaryType="count" />
        </Summary>
      </DataGrid>
    </div>
  );
}

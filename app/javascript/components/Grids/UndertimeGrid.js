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
  Format,
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
import dxCalendar from "devextreme/ui/calendar";

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
    paginate: true,
    pageSize: 20,
  };

  useEffect(() => {
    initEmployees();
    getLastCutoff();
  }, []);

  const dateEditorOptions = {
    openOnFieldClick: true,
    type: "date",
  };
  const onEditorPreparing = (e) => {
    if (e.parentType === "dataRow") {
      if (e.dataField == "tohours" || e.dataField == "fromhours") {
        e.editorOptions.type = "time";
      }
    }
  };

  const setDateCellValue = (newData, value) => {
    const d = new Date(value);
    d.setHours(0, 0, 0, 0);
    newData.date = d;

    const startHour = new Date(d);
    const endHour = new Date(d);
    startHour.setTime(startHour.setHours(startHour.getHours() + 13));
    endHour.setTime(endHour.setHours(endHour.getHours() + 17));
    newData.fromhours = startHour;
    newData.tohours = endHour;
    newData.hours = (endHour - startHour) / 36e5;
    newData.year = new Date(value).getFullYear();
  };

  const setToCellValue = (newData, value, currentRowData) => {
    newData.tohours = new Date(value);

    if (newData.tohours && currentRowData.fromhours) {
      const datediff = newData.tohours - new Date(currentRowData.fromhours);
      newData.hours = datediff / 36e5;
    }
  };
  const setFromCellValue = (newData, value, currentRowData) => {
    newData.fromhours = new Date(value);

    if (currentRowData.tohours && newData.fromhours) {
      const datediff = currentRowData.tohours - newData.fromhours;
      newData.hours = datediff / 36e5;
    }
  };

  const realDateEditorOptions = {
    showClearButton: true,
    openOnFieldClick: true,
    showAnalogClock: false,
    onOpened: (e) => {
      document.getElementsByClassName("dx-timeview")[0].style.display = "none";
    },
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
          caption="Date"
          dataType="datetime"
          setCellValue={setDateCellValue}
          editorOptions={realDateEditorOptions}
        >
          <Format type="shortDate" />
          <RequiredRule />
        </Column>
        <Column
          dataField="fromhours"
          caption="From"
          setCellValue={setFromCellValue}
          editorOptions={dateEditorOptions}
        >
          <RequiredRule />
        </Column>

        <Column
          dataField="tohours"
          caption="To"
          setCellValue={setToCellValue}
          editorOptions={dateEditorOptions}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="hours"
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

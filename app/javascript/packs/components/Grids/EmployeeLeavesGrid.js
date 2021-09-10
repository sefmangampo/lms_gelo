import React, { useState, useEffect, useRef } from "react";

import DataGrid, {
  Column,
  Editing,
  Export,
  Lookup,
  FormItem,
  Selection,
  Paging,
  FilterPanel,
  StateStoring,
  FilterRow,
  ColumnChooser,
  RequiredRule,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import {
  getEmployees,
  getEmployeeLeaves,
  getLeaveStatuses,
  getLeaveTypes,
  getCutOffs,
  getActiveStore,
} from "../../data/";

import {
  onToolbarPreparing,
  setActiveLookUp,
  generateCodeFromID,
} from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getEmployeeLeaves,
});

export default function EmployeeLeavesGrid() {
  const [employees, setEmployees] = useState(null);
  const [statuses, setStatuses] = useState(null);
  const [leaveTypes, setLeaveTypes] = useState(null);
  const [cutoffs, setCutoffs] = useState(null);

  const dataGridRef = useRef(null);

  const setToolbar = (e) => {
    onToolbarPreparing(e, "Leaves");
  };

  const initEmployees = async () => {
    const data = await getEmployees.load();
    const activeData = data.filter((e) => e.active);

    activeData.map((d) => {
      d.name = `${d.lastname}, ${d.firstname} ${d.middlename}`;
    });
    setEmployees(activeData);
  };

  const initCutOffs = async () => {
    const data = await getCutOffs.load();
    setCutoffs(data.reverse());
  };

  useEffect(() => {
    initEmployees();
    getActiveStore(getLeaveStatuses, setStatuses);
    getActiveStore(getLeaveTypes, setLeaveTypes);
    initCutOffs();
  }, []);

  const CutOffLUDs = {
    store: {
      data: cutoffs,
      type: "array",
    },
    key: "id",
  };

  const EmployeeLUDs = {
    store: {
      data: employees,
      type: "array",
    },
    key: "id",
  };

  const dateFiledEditorOptions = {
    openOnFieldClick: true,
  };

  const dateEffEditorOptions = {
    openOnFieldClick: true,
  };

  const cutoffeditorOptions = {};

  const setCellValue = (newData, value, currentRowData) => {
    newData.dateeffective = value;

    if (value) newData.year = new Date(value).getFullYear();
  };

  const numberFilterOperations = ["=", "<>", "<", ">", "<=", ">="];
  const dateFilterOperations = ["=", "<>", "<", ">", "<=", ">=", "between"];

  const filterBuilder = {
    fields: [
      {
        dataField: "employeeid",
        caption: "Employee Id",
        dataType: "numeric",
        filterOperations: numberFilterOperations,
      },
      {
        dataField: "year",
        caption: "Year",
        dataType: "numeric",
        filterOperations: numberFilterOperations,
      },
      {
        dataField: "dateeffective",
        caption: "Date Effective",
        dataType: "date",
        filterOperations: dateFilterOperations,
      },
      {
        dataField: "datefiled",
        caption: "Date Filed",
        dataType: "date",
        filterOperations: dateFilterOperations,
      },
    ],
  };

  const calculateCellValue = (rowdata) => {
    const code = rowdata.id;
    return generateCodeFromID(code, "LV");
  };

  const onEditorPreparing = (e) => {
    setActiveLookUp(e, "leavetypeid", leaveTypes);
    setActiveLookUp(e, "status", statuses);
  };

  const onRowPrepared = (e) => {
    if (e.rowType == "data") {
      let color = "";
      if (e.data.status == 3) {
        color = "#F1948A";
      } else if (e.data.status == 2) {
        color = "#7DCEA0";
      } else {
        color = "#F7DC6F";
      }
      e.rowElement.style.color = color;
    }
  };

  return (
    <div>
      <DataGrid
        ref={dataGridRef}
        dataSource={dataSource}
        allowColumnResizing={true}
        allowColumnReordering={true}
        showBorders={true}
        showRowLines={true}
        onRowPrepared={onRowPrepared}
        onEditorPreparing={onEditorPreparing}
        filterBuilder={filterBuilder}
        onToolbarPreparing={setToolbar}
        rowAlternationEnabled={true}
      >
        <FilterPanel visible={true} />
        <FilterRow visible={true} />
        <Paging pageSize={10} />
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} mode="select" />
        <Selection mode="multiple" />
        <StateStoring enabled={true} type="localStorage" storageKey="storage" />
        <Editing
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          mode="popup"
        />
        <Column
          visible={false}
          dataField="id"
          dataType="number"
          sortOrder="desc"
        >
          <FormItem visible={false} />
        </Column>
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
          dataField="leavetypeid"
          caption="Leave Type"
          dataType="number"
          allowFiltering={true}
        >
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={getLeaveTypes}
          />
          <RequiredRule />
        </Column>
        <Column
          name="code"
          width={100}
          caption="Code"
          calculateCellValue={calculateCellValue}
        >
          <FormItem visible={false} />
        </Column>

        <Column
          dataField="quantity"
          caption="Quantity"
          dataType="number"
          allowFiltering={true}
          width={100}
        />
        <Column
          dataField="datefiled"
          width={129}
          caption="Date Filed"
          dataType="date"
          editorOptions={dateFiledEditorOptions}
          allowFiltering={true}
        />
        <Column
          dataField="dateeffective"
          caption="Date Effective"
          dataType="date"
          editorOptions={dateEffEditorOptions}
          setCellValue={setCellValue}
          width={120}
          allowFiltering={true}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="cutoffid"
          caption="Cut Off"
          dataType="number"
          editorOptions={cutoffeditorOptions}
          width={120}
          allowFiltering={true}
        >
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={CutOffLUDs}
          />
        </Column>
        <Column
          dataField="status"
          caption="Status"
          width={100}
          dataType="number"
          allowFiltering={true}
        >
          <RequiredRule />
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={getLeaveStatuses}
          />
        </Column>
        <Column
          dataField="year"
          caption="Year"
          width={75}
          dataType="number"
          allowFiltering={true}
        >
          <FormItem visible={false} />
        </Column>
        <Column dataField="remarks" caption="Remarks" dataType="string" />
        <Summary>
          <TotalItem column="employeeid" summaryType="count" />
        </Summary>
      </DataGrid>
    </div>
  );
}

import React, { useState, useEffect } from "react";

import DataGrid, {
  Column,
  Export,
  Selection,
  Lookup,
  FilterRow,
  Paging,
  FormItem,
  StateStoring,
  Editing,
  ColumnChooser,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import {
  getLeaveAccruals,
  getEmployees,
  getLeaveAccrualTypes,
} from "../../data/";

import { onToolbarPreparing, generateCodeFromID } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getLeaveAccruals,
});

export default function LeaveAccrualsGrid() {
  const [employees, setEmployees] = useState(null);

  const setToolbar = (e) => {
    onToolbarPreparing(e, "Leave Accruals");
  };

  const initEmployees = async () => {
    const data = await getEmployees.load();
    const activeData = data.filter((e) => e.active);

    activeData.map((d) => {
      d.name = `${d.lastname}, ${d.firstname} ${d.middlename}`;
    });
    setEmployees(activeData);
  };

  useEffect(() => {
    initEmployees();
  }, []);

  const EmployeeLUDs = {
    store: {
      data: employees,
      type: "array",
    },
    key: "id",
  };

  const onInitNewRow = (e) => {
    e.data.issystemgenerated = false;
  };

  const calculateCellValue = (rowdata) => {
    const code = rowdata.id;
    return generateCodeFromID(code, "AC");
  };

  const calculateReferenceValue = (rowdata) => {
    const code = rowdata.referenceid;
    const text = rowdata.issystemgenerated ? "QU" : "AD";

    return generateCodeFromID(code, text);
  };

  const onRowPrepared = (e) => {
    if (e.rowType == "data") {
      if (e.data.leaveaccrualtypeid == 2) {
        e.rowElement.style.color = "#85C1E9";
      } else if (e.data.leaveaccrualtypeid == 1) {
        e.rowElement.style.color = "#F7DC6F";
      } else {
        e.rowElement.style.color = "#73C6B6";
      }
    }
  };

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        onInitNewRow={onInitNewRow}
        onRowPrepared={onRowPrepared}
        onToolbarPreparing={setToolbar}
        rowAlternationEnabled={true}
      >
        <FilterRow visible={true} />
        <Editing allowDeleting={true} />
        <Paging pageSize={10} />
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="lms_accruals"
        />
        <ColumnChooser enabled={true} mode="select" />
        <Column dataField="employeeid" caption="Employee" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={EmployeeLUDs}
          />
        </Column>
        <Column
          dataField="leaveaccrualtypeid"
          caption="Accrual Type"
          dataType="number"
        >
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={getLeaveAccrualTypes}
          />
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
          name="referencecode"
          width={100}
          caption="Reference"
          calculateCellValue={calculateReferenceValue}
        />
        <Column dataField="dategiven" caption="Date Given" dataType="date" />.
        <Column
          dataField="valueadded"
          caption="Value Added"
          dataType="number"
        />
        <Column dataField="year" caption="Year" width={75} dataType="number" />
        <Column dataField="remarks" caption="Remark" dataType="string" />
        <Column
          dataField="issystemgenerated"
          caption="System Generated"
          dataType="boolean"
          allowEditing={false}
        />
        <Export enabled={true} allowExportSelectedData={true} />
        <Selection mode="multiple" />
        <Summary>
          <TotalItem column="employeeid" summaryType="count" />
        </Summary>
      </DataGrid>
    </div>
  );
}

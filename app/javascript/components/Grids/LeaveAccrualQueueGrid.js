import React, { useState, useEffect } from "react";

import DataGrid, {
  Column,
  Export,
  Selection,
  Lookup,
  ColumnChooser,
  FilterRow,
  Editing,
  Summary,
  TotalItem,
  Pager,
  Paging,
  StateStoring,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import notify from "devextreme/ui/notify";

import {
  getLeaveAccrualQueue,
  getEmployees,
  getActiveStore,
  getLeaveAccrualTypes,
  processAccrualQueue,
} from "../../data/";

import { onToolbarPreparing, generateCodeFromID } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getLeaveAccrualQueue,
});

export default function LeaveAccrualQueueGrid() {
  const [employees, setEmployees] = useState(null);

  const [accrualTypes, setAccrualTypes] = useState(null);

  const setToolbar = (e) => {
    const processButton = [
      {
        location: "after",
        widget: "dxButton",
        options: {
          icon: "refresh",
          text: "Process Accruals",
          onClick: async () => {
            const res = await processAccrualQueue();

            if (res) {
              const number = res.Result;

              let mes = "";
              if (res.Result == 1) {
                mes = `1 record processed.`;
                notify(mes, "success", 3000);
                e.component.refresh();
              } else if (res.Result > 1) {
                mes = `${number} records processed.`;
                notify(mes, "success", 3000);
                e.component.refresh();
              } else {
                notify("No records processed.", "info", 3000);
              }
            }
          },
        },
      },
    ];
    onToolbarPreparing(e, "Accruals Queue", processButton);
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
    getActiveStore(getLeaveAccrualTypes, setAccrualTypes);
  }, []);

  const EmployeeLUDs = {
    store: {
      data: employees,
      type: "array",
    },
    key: "id",
  };

  const calculateCellValue = (rowdata) => {
    const code = rowdata.id;
    return generateCodeFromID(code, "QU");
  };

  const calculateReferenceValue = (rowdata) => {
    const code = rowdata.referenceid;

    return generateCodeFromID(code, "SE");
  };

  const onRowPrepared = (e) => {
    if (e.rowType == "data") {
      e.rowElement.style.color = e.data.posted ? "#7DCEA0" : "#F7DC6F";
    }
  };

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        allowColumnReordering={true}
        allowColumnResizing={true}
        showRowLines={true}
        onRowPrepared={onRowPrepared}
        onToolbarPreparing={setToolbar}
        rowAlternationEnabled={true}
      >
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="lms_queue"
        />
        <Editing allowDeleting={true} />
        <Column
          name="code"
          width={100}
          caption="Code"
          calculateCellValue={calculateCellValue}
        />
        <Column dataField="employeeid" caption="Employee" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={EmployeeLUDs}
          />
        </Column>
        <Column
          dataField="accrualtypeid"
          caption="Accrual Type"
          dataType="number"
        >
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={accrualTypes}
          />
        </Column>
        <Column
          dataField="dateeffective"
          caption="Date Effective"
          dataType="date"
        />
        <Column
          name="basis"
          width={100}
          caption="Basis"
          calculateCellValue={calculateReferenceValue}
        />
        <Column dataField="posted" caption="Posted" dataType="boolean" />
        <Column
          dataField="valuetoadd"
          caption="Value to Add"
          dataType="number"
        />
        <Paging defaultPageSize={8} />
        <Pager
          visible={true}
          displayMode="full"
          showInfo={true}
          showPageSizeSelector={true}
        />
        <Column dataField="year" caption="Year" width={75} dataType="number" />
        <Export enabled={true} allowExportSelectedData={true} />
        <Selection mode="multiple" />
        <ColumnChooser enabled={true} mode="select" />
        <FilterRow visible={true} />
        <Summary>
          <TotalItem column="employeeid" summaryType="count" />
        </Summary>
      </DataGrid>
    </div>
  );
}

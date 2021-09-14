import React, { useState, useEffect } from "react";

import DataGrid, {
  Column,
  Export,
  Selection,
  ColumnChooser,
  Lookup,
  Paging,
  Editing,
  FilterPanel,
  FormItem,
  StateStoring,
  FilterRow,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import notify from "devextreme/ui/notify";

import {
  getLeaveAccrualSettings,
  getEmployees,
  getLeaveTypes,
  getActiveStore,
  generateAccruals,
  generateIndividualAccruals,
  generateAccrualSettings,
} from "../../data/";

import {
  onToolbarPreparing,
  setActiveLookUp,
  generateCodeFromID,
} from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getLeaveAccrualSettings,
});

export default function LeaveAccrualSettingsGrid() {
  const [employees, setEmployees] = useState(null);
  const [leaveTypes, setLeaveTypes] = useState(null);

  const setToolbar = (e) => {
    const processButton = [
      {
        location: "after",
        widget: "dxButton",
        options: {
          icon: "refresh",
          text: "Load employees",
          onClick: async () => {
            const res2 = await generateAccrualSettings();
            const mes = `Records processed.`;
            notify(mes, "info", 3000);
            e.component.refresh();
          },
        },
      },
      {
        location: "after",
        widget: "dxButton",
        options: {
          icon: "refresh",
          text: "Process to Queue",
          onClick: async () => {
            const res2 = await generateIndividualAccruals();
            const res = await generateAccruals();

            const mes = `Records processed.`;
            notify(mes, "info", 3000);
            e.component.refresh();
          },
        },
      },
    ];

    onToolbarPreparing(e, "Accrual Settings", processButton);
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
    getActiveStore(getLeaveTypes, setLeaveTypes);
  }, []);

  const EmployeeLUDs = {
    store: {
      data: employees,
      type: "array",
    },
    key: "id",
  };

  const onInitNewRow = (e) => {
    e.data.active = true;
    e.data.isregular = false;
    e.data.isyearly = false;
    e.data.rate = 5 / 12;
    e.data.leavetypeid = 1;
    e.data.year = new Date().getFullYear();
  };

  const onEditorPreparing = (e) => {
    setActiveLookUp(e, "leavetypeid", leaveTypes);
  };

  const calculateReferenceValue = (rowdata) => {
    const code = rowdata.id;

    return generateCodeFromID(code, "SE");
  };

  const onRowPrepared = (e) => {
    if (e.rowType == "data") {
      if (e.data.isregular) {
        e.rowElement.style.color = e.data.isyearly ? "#85C1E9" : "#F7DC6F";
      }
    }
  };

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        allowColumnReordering={true}
        allowColumnResizing={true}
        onEditorPreparing={onEditorPreparing}
        onInitNewRow={onInitNewRow}
        onRowPrepared={onRowPrepared}
        onToolbarPreparing={setToolbar}
        rowAlternationEnabled={true}
      >
        <FilterPanel visible={true} />
        <FilterRow visible={true} />
        <Paging pageSize={10} />
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="lms_settings"
        />
        <Column
          name="code"
          width={100}
          caption="Code"
          calculateCellValue={calculateReferenceValue}
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
        </Column>
        <Column
          dataField="dateeffective"
          caption="Date Effective"
          dataType="date"
        />
        <Column dataField="year" caption="Year" dataType="number" />
        <Column dataField="rate" caption="Rate" dataType="number" />
        <Column
          dataField="isyearly"
          caption="Credited Per Year"
          dataType="boolean"
        />
        <Column
          dataField="active"
          caption="Active"
          dataType="boolean"
          visible={false}
        />
        <Export enabled={true} allowExportSelectedData={true} />
        <Selection mode="multiple" />
        <Editing allowDeleting={true} />
        <ColumnChooser enabled={true} mode="select" />
        <Summary>
          <TotalItem column="employeeid" summaryType="count" />
        </Summary>
      </DataGrid>
    </div>
  );
}

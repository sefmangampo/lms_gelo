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
  StateStoring,
  FormItem,
  Summary,
  TotalItem,
  FilterRow,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getEmployees, getAdjustments, getActiveStore } from "../../data/";

import {
  onToolbarPreparing,
  generateCodeFromID,
  setActiveLookUp,
} from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getAdjustments,
});

export default function AdjustmentsGrid() {
  const [employees, setEmployees] = useState(null);
  const setToolbar = (e) => {
    onToolbarPreparing(e, "Accrual Adjustments");
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
    pageSize: 20,
    paginate: true,
  };

  useEffect(() => {
    initEmployees();
  }, []);

  const onInitNewRow = (e) => {
    e.data.year = new Date().getFullYear();
    e.data.posted = false;
  };

  const rateEditorOptions = {
    showClearButton: true,
  };

  const calculateReferenceValue = (rowdata) => {
    const code = rowdata.id;
    return generateCodeFromID(code, "AD");
  };

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
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
          storageKey="lms_adjustments"
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
          name="code"
          width={100}
          caption="Code"
          calculateCellValue={calculateReferenceValue}
        >
          <FormItem visible={false} />
        </Column>
        <Column dataField="year" caption="Year" dataType="number" />
        <Column
          dataField="rate"
          caption="Rate"
          dataType="number"
          editorOptions={rateEditorOptions}
        />
        <Column
          dataField="dateeffective"
          caption="Date Effective"
          dataType="date"
        />
        <Column dataField="remarks" caption="Remarks" dataType="string" />
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

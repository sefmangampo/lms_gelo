import React, { useState, useEffect } from "react";

import DataGrid, {
  Column,
  Export,
  Selection,
  Lookup,
  Editing,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getLeaveAccruals, getEmployees, getLeaveAccrualTypes } from "../../data/";
import { exportToPDF, exportButton } from "./Helpers/ExportToPDF";

const dataSource = new DataSource({
  key: "id",
  store: getLeaveAccruals,
});

export default function LeaveAccrualsGrid() {
  const [employees, setEmployees] = useState(null);
  const [accrualTypes, setAccrualTypes] = useState(null);

  const onToolbarPreparing = (e) => {
    exportButton.options.onClick = () => {
      exportToPDF(e.component, "LeaveCredits");
    };

    e.toolbarOptions.items.unshift(exportButton);
    e.toolbarOptions.items[1].location = "before";
  };

  const initAccrualTypes = async () => {
    const data = await getLeaveAccrualTypes.load();
    const activeData = data.filter((e) => e.active);

    setAccrualTypes(activeData);
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
    initAccrualTypes();
  }, []);

  const EmployeeLUDs = {
    store: {
      data: employees,
      type: "array",
    },
    key: "id",
  };

  const accrualLUDs = {
    store: {
      data: accrualTypes,
      type: "array",
    },
    key: "id",
  };

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        onToolbarPreparing={onToolbarPreparing}
        rowAlternationEnabled={true}
      >
        <Editing allowAdding={true} allowUpdating={true} allowDeleting={true} />
        <Column dataField="employeeid" caption="Employee" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={EmployeeLUDs}
          />
        </Column>
        <Column dataField="leaveaccrualtypeid" caption="Accrual Type" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={accrualLUDs}
          />
        </Column>
        <Column dataField="dategiven" caption="Date Given" dataType="date" />.
        <Column
          dataField="valueadded"
          caption="Value Added"
          dataType="number"
        />
        <Column dataField="remarks" caption="Remark" dataType="string" />
        <Column
          dataField="issystemgenerated"
          caption="System Generated"
          dataType="boolean"
        />
        <Export enabled={true} allowExportSelectedData={true} />
        <Selection mode="multiple" />
      </DataGrid>
    </div>
  );
}

import React, { useState, useEffect } from "react";

import DataGrid, {
  Column,
  Editing,
  Selection,
  Export,
  Lookup,
  RequiredRule,
  StateStoring,
  FilterRow,
  Paging,
  FilterPanel,
  FormItem,
  ColumnChooser,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import {
  getEmployees,
  getEmployeeFullName,
  getCampaigns,
  getPositions,
  getActiveStore,
} from "../../data";

import { onToolbarPreparing, setActiveLookUp } from "./Helpers";

const dataSource = new DataSource({
  key: "id",
  store: getEmployees,
});

export default function EmployeeMasterGrid() {

  const [positionsLU, setPositionsLU] = useState();
  const [campaignsLU, setCampaignsLU] = useState();
  const [managersLU, setManagersLU] = useState();
  const [activeManagersLU, setActiveManagersLU] = useState()


  const setToolbar = (e) => {
    onToolbarPreparing(e, "Employees");
  };

  const initemployees = async () => {
    const d = await getEmployeeFullName()
    setManagersLU(d);
    const a = await getEmployeeFullName(true)
    setActiveManagersLU(a);
  }

  useEffect(() => {
    getActiveStore(getPositions, setPositionsLU);
    getActiveStore(getCampaigns, setCampaignsLU);
    initemployees();
  }, []);

  const onInitNewRow = (e) => {
    e.data.active = true;
  };

  const displayFullName = rowData => {
    return `${rowData.lastname}, ${rowData.firstname} ${rowData.middlename}`
  }

  const onEditorPreparing = (e) => {
    setActiveLookUp(e, "positionid", positionsLU);
    setActiveLookUp(e, "campaignid", campaignsLU);
    setActiveLookUp(e, 'managerid', activeManagersLU)
  };

  return (
    <div>
      <DataGrid
        onToolbarPreparing={setToolbar}
        dataSource={dataSource}
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        showRowLines={true}
        onEditorPreparing={onEditorPreparing}
        onInitNewRow={onInitNewRow}
        rowAlternationEnabled={true}
      >
        <Editing
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          mode="popup"
        />
        <FilterPanel visible={true} />
        <FilterRow visible={true} />
        <Paging pageSize={10} />
        <StateStoring enabled={true} type="localStorage" storageKey="storage" />
        <Column dataField="lastname" caption="Last Name" visible={true} >
          <RequiredRule />
        </Column>
        <Column dataField="firstname" caption="First Name" visible={false} >
          <RequiredRule />
        </Column>
        <Column dataField="middlename" caption="Middle Name" visible={false} />
        <Column calculateCellValue={displayFullName} caption="Full Name">
          <FormItem visible={false} />
        </Column>
        <Column dataField="datehired" caption="Date Hired" dataType="date" >
          <RequiredRule />
        </Column>
        <Column
          dataField="dateregular"
          caption="Date Regular"
          dataType="date"
        />
        <Column dataField="positionid" caption="Position" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={getPositions}
          />
        </Column>
        <Column dataField="campaignid" caption="Campaign" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={campaignsLU}
          />
        </Column>
        <Column dataField="managerid" caption="Manager" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={managersLU}
          />
        </Column>
        <Column dataField="active" dataType="boolean" caption="Active" />
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} mode="select" />
        <Selection mode="multiple" />
      </DataGrid>
    </div>
  );
}

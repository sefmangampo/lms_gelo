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
  Pager,
  Scrolling,
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
  getSexes,
  getPaymentModes,
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
  const [activeManagersLU, setActiveManagersLU] = useState();
  const [sexLU, setSexLU] = useState();
  const [paygroupsLU, setPaygroupsLU] = useState();

  const setToolbar = (e) => {
    onToolbarPreparing(e, "Employees");
  };

  const initemployees = async () => {
    const d = await getEmployeeFullName();
    setManagersLU(d);
    const a = await getEmployeeFullName(true);
    setActiveManagersLU(a);
  };

  useEffect(() => {
    getActiveStore(getPositions, setPositionsLU);
    getActiveStore(getCampaigns, setCampaignsLU);
    getActiveStore(getSexes, setSexLU);
    getActiveStore(getPaymentModes, setPaygroupsLU);
    initemployees();
  }, []);

  const onInitNewRow = (e) => {
    e.data.active = true;
  };

  const displayFullName = (rowData) => {
    return `${rowData.lastname}, ${rowData.firstname} ${rowData.middlename}`;
  };

  const onEditorPreparing = (e) => {
    setActiveLookUp(e, "positionid", positionsLU);
    setActiveLookUp(e, "campaignid", campaignsLU);
    setActiveLookUp(e, "managerid", activeManagersLU);
    setActiveLookUp(e, "sexid", sexLU);
    setActiveLookUp(e, "paygroupid", paygroupsLU);
  };

  return (
    <div>
      <DataGrid
        onToolbarPreparing={setToolbar}
        dataSource={dataSource}
        onEditorPreparing={onEditorPreparing}
        onInitNewRow={onInitNewRow}
        width={"auto"}
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        showRowLines={true}
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
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="lms_employee"
        />
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} mode="select" />
        <Selection mode="multiple" />

        <Paging defaultPageSize={8} />
        <Pager
          visible={true}
          displayMode="compact"
          showInfo={true}
          showPageSizeSelector={true}
        />
        <Scrolling
          preloadEnabled={true}
          rowRenderingMode={true}
          showScrollbar="always"
        />

        <Column dataField="lastname" caption="Last Name" visible={false}>
          <RequiredRule />
        </Column>
        <Column dataField="firstname" caption="First Name" visible={false}>
          <RequiredRule />
        </Column>
        <Column dataField="middlename" caption="Middle Name" visible={false} />
        <Column dataField="fullname" caption="Full Name">
          <FormItem visible={false} />
        </Column>
        <Column dataField="datehired" caption="Date Hired" dataType="date">
          <RequiredRule />
        </Column>
        <Column
          dataField="dateanniversary"
          caption="Anniversary Date"
          dataType="date"
        />
        <Column
          dataField="dateregular"
          caption="Date Regular"
          dataType="date"
          visible={false}
        />
        <Column dataField="positionid" caption="Job Position" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={getPositions}
          />
        </Column>
        <Column
          dataField="campaignid"
          caption="Office Branch"
          dataType="number"
        >
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
        <Column dataField="ombmtmid" caption="OM/BM/TM" dataType="number">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={managersLU}
          />
        </Column>
        <Column dataField="paygroupid" dataType="number" caption="Pay Group">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={getPaymentModes}
          />
        </Column>
        <Column dataField="sexid" dataType="number" caption="Sex">
          <Lookup
            valueExpr="id"
            allowClearing={true}
            displayExpr="name"
            dataSource={getSexes}
          />
        </Column>
        <Column dataField="suffix" dataType="string" caption="Suffix" />
        <Column dataField="active" dataType="boolean" caption="Active" />
        <Column dataField="remarks" dataType="string" caption="Remarks" />
      </DataGrid>
    </div>
  );
}

import React, { useState, useEffect } from "react";

import DataGrid, {
    Column,
    Export,
    Selection,
    Lookup,
    Paging,
    Editing,
    FilterPanel,
    StateStoring,
    FilterRow,
    Summary,
    TotalItem,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import notify from "devextreme/ui/notify";

import {
    getEmployees,
    getCutOffGroupMembers,
    getPaymentModes,
    getActiveStore,
    loadEmployeesToGroups
} from "../../data/";

import { onToolbarPreparing } from "./Helpers";

const dataSource = new DataSource({
    key: "id",
    store: getCutOffGroupMembers,
});

export default function CutOffGroupMembersGrid() {

    const [employees, setEmployees] = useState(null);
    const [pModes, setPModes] = useState(null);

    const setToolbar = (e) => {

        const processButton = [
            {
                location: "after",
                widget: "dxButton",
                options: {
                    icon: "pulldown",
                    text: "Load Employees",
                    onClick: async () => {

                        const res = await loadEmployeesToGroups();
                        if (res) {
                            notify('Loaded Employees', "success", 3000);
                            e.component.refresh();
                        }

                    },
                },
            },
        ];

        onToolbarPreparing(e, "Payment Group Employees", processButton);
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
        getActiveStore(getPaymentModes, setPModes)
    }, []);

    return (
        <div>
            <DataGrid
                dataSource={dataSource}
                showBorders={true}
                showRowLines={true}
                allowColumnReordering={true}
                allowColumnResizing={true}
                onToolbarPreparing={setToolbar}
                rowAlternationEnabled={true}
            >
                <FilterPanel visible={true} />
                <FilterRow visible={true} />
                <Paging pageSize={10} />
                <StateStoring enabled={true} type="localStorage" storageKey="storage" />
                <Column dataField="employeeid" caption="Employee" dataType="number" allowEditing={false}>
                    <Lookup
                        valueExpr="id"
                        allowClearing={true}
                        displayExpr="name"
                        dataSource={EmployeeLUDs}
                    />
                </Column>
                <Column dataField="cutoffgroupid" caption="Cutoff Group" dataType="number" >
                    <Lookup
                        valueExpr="id"
                        allowClearing={true}
                        displayExpr="name"
                        dataSource={pModes}
                    />
                </Column>
                <Export enabled={true} allowExportSelectedData={true} />
                <Editing
                    allowUpdating={true}
                    allowDeleting={true}
                    mode="batch"
                />
                <Selection mode="multiple" />
                <Summary>
                    <TotalItem column="employeeid" summaryType="count" />
                </Summary>
            </DataGrid>
        </div>
    );
}

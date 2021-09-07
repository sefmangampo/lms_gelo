import React, { useState, useEffect } from "react";

import DataGrid, {
    Column,
    Export,
    Selection,
    Lookup,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getLeaveAccrualQueue, getEmployees, getLeaveTypes } from "../../data/";

import { exportToPDF, exportButton } from "./Helpers/ExportToPDF";

const dataSource = new DataSource({
    key: "id",
    store: getLeaveAccrualQueue,
});

export default function LeaveAccrualQueueGrid() {
    const [employees, setEmployees] = useState(null);
    const [leaveTypes, setLeaveTypes] = useState(null);

    const onToolbarPreparing = (e) => {
        exportButton.options.onClick = () => {
            exportToPDF(e.component, "LeaveAccrualQueue");
        };

        e.toolbarOptions.items.unshift(exportButton);
        e.toolbarOptions.items[1].location = "before";
    };

    const initEmployees = async () => {
        const data = await getEmployees.load();
        const activeData = data.filter((e) => e.active);

        activeData.map((d) => {
            d.name = `${d.lastname}, ${d.firstname} ${d.middlename}`;
        });
        setEmployees(activeData);
    };

    const initLeaveTypes = async () => {
        const data = await getLeaveTypes.load();
        const activeData = data.filter((e) => e.active);

        setLeaveTypes(activeData);
    };

    useEffect(() => {
        initEmployees();
        initLeaveTypes();
    }, []);

    const EmployeeLUDs = {
        store: {
            data: employees,
            type: "array",
        },
        key: "id",
    };

    const LeaveLUDs = {
        store: {
            data: leaveTypes,
            type: "array",
        },
        key: "id",
    };

    return <div>
        <DataGrid
            dataSource={dataSource}
            showBorders={true}
            showRowLines={true}
            onToolbarPreparing={onToolbarPreparing}
            rowAlternationEnabled={true}
        >
            <Column dataField="employeeid" caption="Employee" dataType="number">
                <Lookup
                    valueExpr="id"
                    allowClearing={true}
                    displayExpr="name"
                    dataSource={EmployeeLUDs}
                />
            </Column>
            <Column dataField="leavetypeid" caption="Leave Type" dataType="number">
                <Lookup
                    valueExpr="id"
                    allowClearing={true}
                    displayExpr="name"
                    dataSource={LeaveLUDs}
                />
            </Column>
            <Column dataField="dateeffective" caption="Date Effective" dataType="date" />
            <Column dataField="valuetoadd" caption="Value to Add" dataType="number" />
            <Export enabled={true} allowExportSelectedData={true} />
            <Selection mode="multiple" />
        </DataGrid>
    </div>;
}

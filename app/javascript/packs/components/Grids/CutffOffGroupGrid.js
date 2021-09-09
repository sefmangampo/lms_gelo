import React, { useState, useEffect } from "react";

import DataGrid, { Column, Editing, Export, Lookup } from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getCutOffGroups, getPaymentModes, } from "../../data/";
import { onToolbarPreparing } from "./Helpers";

const dataSource = new DataSource({
    key: "id",
    store: getCutOffGroups,
});

export default function CutffOffGroupGrid() {

    const [pModes, setPModes] = useState(null);
    const [pmLu, setPmLu] = useState(null);

    const setToolbar = (e) => {

        const filterSelectBox = [
            {
                location: "after",
                widget: "dxSelectBox",
                options: {
                    dataSource: pmLu,
                    displayExpr: "name",
                    valueExpr: "id",
                    value: 0,
                    onValueChanged: ({ value }) => {
                        const grid = datagridRef.current.instance;

                        if (value === 0) {
                            grid.clearFilter();
                        } else {
                            grid.filter(["paymentmodeid", "=", value]);
                        }
                    },
                },
            },
        ];

        onToolbarPreparing(e, "Payment Mode Groups ", filterSelectBox);
    };

    const onInitNewRow = (e) => {
        e.data.active = true;
        e.data.paymodeid = 1;
    };

    const paymentModes = async () => {
        const data = await getPaymentModes.load();
        const modes = data.filter((item) => item.active && item.useincutoffs);
        setPModes(modes);

        const newModes = [{ id: 0, name: "All" }, ...modes];

        setPmLu(newModes);
    };

    useEffect(() => {
        paymentModes();
    }, []);



    const LUdataSource = {
        store: {
            data: pModes,
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
                onInitNewRow={onInitNewRow}
                onToolbarPreparing={setToolbar}
                rowAlternationEnabled={true}
            >
                <Editing
                    allowUpdating={true}
                    allowAdding={true}
                    allowDeleting={true}
                    mode="form"
                />
                <Column dataField="name" caption="Name" dataType="string" />
                <Column dataField="paymodeid" caption="Payment Mode" dataType="number" >
                    <Lookup
                        valueExpr="id"
                        allowClearing={true}
                        displayExpr="name"
                        dataSource={LUdataSource}
                    />
                </Column>
                <Column dataField="year" caption="Year" dataType="number" />
                <Column dataField="active" caption="Active" dataType="boolean" />
                <Export enabled={true} />
            </DataGrid>
        </div>
    );
}

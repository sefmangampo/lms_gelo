import React, { useState, useRef, useEffect } from "react";
import DataGrid, {
    Column,
    GroupPanel,
    ColumnChooser,
    Export,
    Format
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";
import SelectBox from "devextreme-react/select-box";
import DateBox from "devextreme-react/date-box";
import Button from "devextreme-react/button";
import TextBox from "devextreme-react/text-box";

import { onToolbarPreparing } from "./Helpers";

import { getPaymentModes, getCutOffs, generateReports, getActiveStore } from "../../data";
import { start } from "turbolinks";

export default function CreateReportsGrid() {

    const dataGridRef = useRef();



    const [enabled, setEnabled] = useState(true);
    const [paygroupid, setPaygrouid] = useState();
    const [cutoffid, setCutoffid] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [paygroupsLU, setPaygroupsLU] = useState()
    const [cutoffsLU, setCutoffsLU] = useState();
    const [allCutOffs, setAllCutoffs] = useState();
    const [nameOfReport, setNameOfReport] = useState("none")
    const [isSaveReport, setIsSaveReport] = useState(false);
    const [gridStore, setGridStore] = useState()

    const dataSource = new DataSource({
        store: {
            data: gridStore,
            type: 'array'
        },
        key: 'id'
    })

    useEffect(() => {
        getActiveStore(getPaymentModes, setPaygroupsLU);
        getActiveStore(getCutOffs, setAllCutoffs)

    }, [])

    const applyFilter = async () => {
        const res = await generateReports(
            {
                paygroupid: paygroupid,
                startdate: startDate,
                enddate: endDate,
                nameofreport: nameOfReport,
                issavereport: false
            }
        )
        setGridStore(res)
    };

    const setToolbar = (e) => {
        onToolbarPreparing(e, "Report");
    };

    const onValueChanged = ({ value }) => {
        setEnabled(value.trim().length > 0 ? false : true);
    };

    const onPayGroupValueChanged = ({ value }) => {
        const _cutoff = allCutOffs.store.data;
        const _co = _cutoff.filter(i => i.paymentmodeid === value);

        setCutoffsLU(_co)
        setPaygrouid(value)
        setStartDate(null)
        setEndDate(null)
    }

    const onCutoffValueChanged = ({ value }) => {

        const _co = cutoffsLU.filter(i => i.id === value)[0];

        setStartDate(_co.startdate);
        setEndDate(_co.enddate);
        setCutoffid(value)
    }

    const onStartDateValueChanged = ({ value }) => {
        setStartDate(value);
    }

    const onEndDateValueChanged = ({ value }) => {
        setEndDate(value);
    }

    const onExporting = e => {
        e.fileName = `Leave-Report-${new Date().getTime()}`
    }

    const startDateCustomText = ({ leavetypecode, dateeffective }) => {
        if (leavetypecode === 'UT')
            return new Date(dateeffective).toLocaleString();

        return new Date(dateeffective).toLocaleDateString();
    }

    const endDateCustomText = ({ leavetypecode, dateuntil }) => {
        if (leavetypecode === 'UT')
            return new Date(dateuntil).toLocaleString();

        return new Date(dateuntil).toLocaleDateString();
    }


    return (
        <div style={styles.container}>
            <div style={styles.widget}>
                <DataGrid
                    dataSource={dataSource}
                    showBorders={true}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    onToolbarPreparing={setToolbar}
                    ref={dataGridRef}
                    onExporting={onExporting}
                >
                    <ColumnChooser enabled={true} visible={true} />
                    <GroupPanel visible={false} />
                    <Export enabled={true} />
                    <Column dataField="fullname" caption="Name of Employee" sortIndex={0} />
                    <Column dataField="leavename" groupIndex={1} caption="Leave Type" />
                    <Column dataField="dateeffective" caption="Starting Date" sortIndex={1} calculateDisplayValue={startDateCustomText} />
                    <Column dataField="dateuntil" caption="Until" calculateDisplayValue={endDateCustomText} />
                    <Column
                        dataField="paymodetype"
                        groupIndex={0}
                        caption="Payment Mode"
                    />
                    <Column dataField="quantity" caption="Total" />
                </DataGrid>
            </div>
            <div style={styles.options}>
                <div style={styles.caption}>Options</div>
                <hr />
                <div style={styles.option}>
                    <span>Pay Group</span>
                    <SelectBox value={paygroupid} dataSource={paygroupsLU} valueExpr="id" displayExpr="name" onValueChanged={onPayGroupValueChanged} />
                </div>
                <div style={styles.option}>
                    <span>Cut-off</span>
                    <SelectBox value={cutoffid} dataSource={cutoffsLU} valueExpr="id" displayExpr="name" onValueChanged={onCutoffValueChanged} />
                </div>
                <div style={styles.option}>
                    <span>Start Date</span>
                    <DateBox value={startDate} openOnFieldClick={true} onValueChanged={onStartDateValueChanged} />
                </div>
                <div style={styles.option}>
                    <span>End Date</span>
                    <DateBox value={endDate} openOnFieldClick={true} onValueChanged={onEndDateValueChanged} />
                </div>
                <div style={styles.buttonOption}>
                    <Button text="Apply Filter" onClick={applyFilter} />
                </div>
                <div style={styles.saveOption}>
                    <div style={styles.option}>
                        <TextBox
                            onValueChanged={onValueChanged}
                            placeholder="Name of report"
                            stylingMode="filled"
                        />
                    </div>
                    <div style={styles.buttonOption}>
                        <Button disabled={enabled} text="Save Report" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    saveOption: {
        marginTop: "10px",
        border: "1px solid #515159",
        padding: "0.5em",
        display: "flex",
        flexDirection: "column",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        paddingTop: "1em",
    },
    widget: {
        flex: 5,
        padding: "1em",
    },
    options: {
        padding: "1em",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(191,191,191, 0.15",
    },
    caption: {
        fontSize: "18px",
        fontWeight: 500,
    },
    option: {
        marginTop: "10px",
    },
    buttonOption: {
        marginTop: "10px",
        alignSelf: "center",
    },
};

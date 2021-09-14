import React, { useState, useEffect } from "react";

import DataGrid, {
  Column,
  Export,
  Selection,
  MasterDetail,
  ColumnChooser,
  Paging,
  StateStoring,
  FilterRow,
  Summary,
  TotalItem,
  Format,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getLeaveCredits } from "../../data/";
import { onToolbarPreparing, groupBy } from "./Helpers";

export default function LeaveCreditsGrid() {
  const [leaveCreditsData, setLeaveCreditsData] = useState(null);

  const aggregateEntries = (yearlyArr = [], returnArray) => {
    let ydata = [];
    const hasLeave = yearlyArr.findIndex((el) => el.isleave);
    const hasAccruals = yearlyArr.findIndex((el) => el.isleave == 0);

    if (hasLeave == -1 && hasAccruals >= 0) {
      ydata[0] = yearlyArr;
    } else if (hasAccruals == -1 && hasLeave >= 0) {
      ydata[1] = yearlyArr;
    } else {
      ydata = groupBy(yearlyArr, "isleave");
    }

    const y_accrualData = ydata[0];
    const y_leavesData = ydata[1];

    if (hasLeave > -1) {
      const y_employeeLeaves = groupBy(y_leavesData, "employeeid");

      for (let key in y_employeeLeaves) {
        if (y_employeeLeaves.hasOwnProperty(key)) {
          const el = y_employeeLeaves[key][0];

          if (
            !returnArray.find(
              (x) => x.employeeid === el.employeeid && x.year === el.year
            )
          ) {
            returnArray.push({
              employeeid: el.employeeid,
              employee: el.employee,
              leavetype: el.leaveaccrualtype,
              total: 0,
              year: el.year,
            });
          }
        }
      }
    }

    if (hasAccruals > -1) {
      const y_employeeAccruals = groupBy(y_accrualData, "employeeid");

      for (let key in y_employeeAccruals) {
        if (y_employeeAccruals.hasOwnProperty(key)) {
          const el = y_employeeAccruals[key][0];

          if (
            !returnArray.find(
              (x) => x.employeeid === el.employeeid && x.year === el.year
            )
          ) {
            returnArray.push({
              employeeid: el.employeeid,
              employee: el.employee,
              leavetype: el.leaveaccrualtype,
              total: 0,
              year: el.year,
            });
          }
        }
      }
    }
  };

  const initData = async () => {
    const data = await getLeaveCredits.load();
    const masterList = [];

    const byYearData = groupBy(data, "year");

    for (let key in byYearData) {
      if (byYearData.hasOwnProperty(key)) {
        const dat = byYearData[key];

        aggregateEntries(dat, masterList);
      }
    }

    for (let x = 0; x < data.length; x++) {
      const d = data[x];
      d.quantity = d.isleave == 1 ? d.quantity * -1 : d.quantity;

      for (let y = 0; y < masterList.length; y++) {
        const emp = masterList[y];

        if (emp.employeeid === d.employeeid && emp.year === d.year) {
          emp.total = emp.total + d.quantity;
        }
      }
    }

    setLeaveCreditsData(masterList);
  };

  useEffect(() => {
    initData();
  }, []);

  const dataSource = new DataSource({
    key: "id",
    store: {
      data: leaveCreditsData,
      type: "array",
    },
  });

  const setToolbar = (e) => {
    onToolbarPreparing(e, "Leave Credits");
  };

  const detailTemplate = ({ data }) => {
    const [db, setDb] = useState(null);

    const getDB = async () => {
      const d = await getLeaveCredits.load();
      const newD = d.filter(
        (df) =>
          df.employeeid == data.key.employeeid && df.year === data.key.year
      );
      newD.forEach((element) => {
        element.quantity =
          element.isleave == 1 ? element.quantity * -1 : element.quantity;
      });
      setDb(newD);
    };

    useEffect(() => {
      getDB();
    }, []);

    const datasource = {
      key: "id",
      store: {
        type: "array",
        data: db,
      },
    };

    const onRowPrepared = (e) => {
      if (e.rowType == "data") {
        e.rowElement.style.color = e.data.isleave ? "#F1948A" : "#7DCEA0";
      }
    };

    const quantityCellRender = ({ data }) => {
      const text = data.isleave ? data.quantity * -1 : data.quantity;
      return <div>{text}</div>;
    };
    return (
      <>
        <p>
          Leave Credits details for{" "}
          <i>
            "{data.key.employee}" - {data.key.year}
          </i>{" "}
        </p>
        <DataGrid
          dataSource={datasource}
          showBorders={true}
          showRowLines={true}
          allowColumnReordering={true}
          allowColumnResizing={true}
          rowAlternationEnabled={true}
          onRowPrepared={onRowPrepared}
        >
          <FilterRow visible={true} />
          <Paging pageSize={10} />
          <Selection mode="multiple" />
          <ColumnChooser enabled={true} mode="select" />
          <Column dataField="id" visible={false} />
          <Column dataField="employeeid" visible={false} />
          <Column dataField="isleave" visible={false} />
          <Column dataField="employee" caption="Employee" dataType="string" />
          <Column
            dataField="reference"
            caption="Reference Code"
            dataType="string"
          />
          <Column dataType="number" dataField="quantity" caption="Quantity" />
          <Column dataField="date" dataType="date" />
          <Column
            dataField="leaveaccrualtype"
            caption="Type"
            dataType="string"
          />
          <Column dataField="period" caption="Cut-off" dataType="string" />
          <Summary>
            <TotalItem column="employee" summaryType="count" />
            <TotalItem column="quantity" summaryType="sum" />
          </Summary>
        </DataGrid>
      </>
    );
  };

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
        <FilterRow visible={true} />
        <Paging pageSize={10} />
        <Selection mode="multiple" />
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="lms_credits_main"
        />
        <Column
          dataField="employee"
          caption="Employee"
          dataType="string"
        ></Column>
        <Column dataField="leavetype" caption="Type" dataType="string" />
        <Column dataField="total" caption="Credits" dataType="number">
          <Format type="fixedPoint" precision={2} />
        </Column>
        <Column dataField="year" caption="Year" dataType="number" />
        <Export enabled={true} allowExportSelectedData={true} />

        <MasterDetail enabled={true} component={detailTemplate} />
        <Summary>
          <TotalItem column="employee" summaryType="count" />
        </Summary>
      </DataGrid>
    </div>
  );
}

import React, { useState, useEffect } from "react";

import DataGrid, {
  Column,
  Export,
  Selection,
  MasterDetail,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";

import { getLeaveCredits, getEmployees, getLeaveTypes } from "../../data/";
import { exportToPDF, exportButton } from "./Helpers/ExportToPDF";

const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);



export default function LeaveCreditsGrid() {

  const [leaveCreditsData, setLeaveCreditsData] = useState(null);

  const initData = async () => {
    const data = await getLeaveCredits.load();
    const gdata = groupBy(data, 'isleave');

    const masterList = [];

    const accrualData = gdata[0]
    const leavesData = gdata[1]

    const employeeLeaves = groupBy(leavesData, 'employeeid');
    const employeeAccruals = groupBy(accrualData, 'employeeid');

    let leavecaption = "";

    console.log("eav:m", employeeLeaves)

    for (let key in employeeLeaves) {

      if (employeeLeaves.hasOwnProperty(key)) {
        const el = employeeLeaves[key][0];

        leavecaption = el.leaveaccrualtype;

        masterList.push({
          employeeid: el.employeeid,
          employee: el.employee,
          leavetype: leavecaption,
          total: 0,
          year: el.year,
        });
      }
    }

    for (let key in employeeAccruals) {

      if (employeeAccruals.hasOwnProperty(key)) {
        const el = employeeAccruals[key][0];

        if (!masterList.find(x => x.employeeid === el.employeeid)) {
          masterList.push({
            employeeid: el.employeeid,
            employee: el.employee,
            leavetype: leavecaption,
            total: 0,
            year: el.year,
          });
        }


      }
    }

    console.log(masterList)

    setLeaveCreditsData(masterList)


  }

  useEffect(() => {
    initData()
  }, [])


  const dataSource = new DataSource({
    key: "id",
    store: {
      data: leaveCreditsData,
      type: 'array'
    }
  });

  const onToolbarPreparing = (e) => {
    exportButton.options.onClick = () => {
      exportToPDF(e.component, "LeaveCredits");
    };

    e.toolbarOptions.items.unshift(exportButton);
    e.toolbarOptions.items[1].location = "before";
  };

  const detailTemplate = ({ data }) => {

    console.log(data);

    return (<>
      hello po
      <p>I am mater details</p>
    </>)
  }

  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        onToolbarPreparing={onToolbarPreparing}
        rowAlternationEnabled={true}
      >
        <Column
          dataField="employee"
          caption="Employee"
          dataType="string"
        ></Column>
        <Column dataField="leavetype" caption="Type" dataType="string" />
        <Column dataField="quantity" caption="Credits" dataType="number" />
        <Column dataField="year" caption="Year" dataType="number" />
        <Export enabled={true} allowExportSelectedData={true} />
        <Selection mode="multiple" />
        <MasterDetail enabled={true} component={detailTemplate} />
      </DataGrid>
    </div>
  );
}



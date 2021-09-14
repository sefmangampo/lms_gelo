import React, { useState, useEffect } from "react";

import Button from "devextreme-react/button";
import ExcelUploader from "../ExcelUploader";

import {
  createMultipleCampaigns,
  createMultipleEmploymentStatus,
  createMultiplePositions,
  createMultipleStatus,
  createMultipleEmployees,
  createMultipleLeavees,
} from "../../data/CustomEndpoints";

import {
  getCampaigns,
  getStatus,
  getPositions,
  getEmploymentStatus,
  getEmployees,
} from "../../data";

import {
  groupBy,
  sortObjectValuesCompare,
  ExcelDateToJSDate,
} from "../Grids/Helpers";

export default function UploadExcelLayout() {
  const [employeeUpload, setEmployeeUpload] = useState();
  const [leavesUpload, setLeavesUpload] = useState();

  useEffect(() => {
    if (employeeUpload) {
      processData(employeeUpload);
    }

    if (leavesUpload) {
      processLeaves(leavesUpload);
    }
  }, [employeeUpload, leavesUpload]);

  const processLeaves = async (data) => {
    const employeeLookup = await getEmployees.load();

    const records = [];

    data.map((item) => {
      for (let key in item) {
        if (item.hasOwnProperty(key)) {
          if (
            key === "First" ||
            key === "Second" ||
            key === "Third" ||
            key === "Fourth" ||
            key === "Fifth"
          ) {
            const value = item[key];
            const type = typeof value;
            const employeename = item["NAME OF EMPLOYEE"];
            const splitname = employeename.split(",");

            const lastname = splitname[0].toLowerCase().trim();
            const firstname = splitname[1].toLowerCase().trim();
            const middlename = splitname[2];

            const empid = employeeLookup.find(
              (i) =>
                i.lastname.toLowerCase() == lastname &&
                i.firstname.toLowerCase() == firstname
            );

            if (empid) {
              if (type == "number") {
                records.push({
                  empid: empid.id,
                  employeename: employeename,
                  leavedate: ExcelDateToJSDate(item[key]),
                  isfound: true,
                  iscorrectdate: true,
                });
              } else {
                records.push({
                  empid: empid.id,
                  employeename: employeename,
                  leavedate: item[key],
                  isfound: true,
                  iscorrectdate: false,
                });
              }
            } else {
              if (type == "number") {
                records.push({
                  empid: 0,
                  employeename: employeename,
                  leavedate: ExcelDateToJSDate(item[key]),
                  isfound: false,
                  iscorrectdate: true,
                });
              } else {
                records.push({
                  empid: 0,
                  employeename: employeename,
                  leavedate: item[key],
                  isfound: false,
                  iscorrectdate: false,
                });
              }
            }
          }
        }
      }
    });

    createMultipleLeavees(records);
  };

  const processData = async (data) => {
    const campaignLU = await getCampaigns.load();
    const statusLU = await getStatus.load();
    const employmentStatusLU = await getEmploymentStatus.load();
    const positionLU = await getPositions.load();
    const employeesLU = await getEmployees.load();

    const status = groupBy(data, "STATUS");
    const jobposition = groupBy(data, "JOB POSITION");
    const employeestatus = groupBy(data, "EMPLOYEE STATUS");
    const officebranch = groupBy(data, "OFFICE BRANCH");

    const newData = [];

    if (Object.keys(officebranch).length > 0) {
      insertEntries(officebranch, "campaign");
    }

    if (Object.keys(employeestatus).length > 0) {
      insertEntries(employeestatus, "employmentstatus");
    }

    if (Object.keys(jobposition).length > 0) {
      insertEntries(jobposition, "position");
    }

    if (Object.keys(status).length > 0) {
      insertEntries(status, "status");
    }
    data.map(async (d) => {
      const newEmployee = {};

      const splittedName = d["EMPLOYEE NAME"].split(",");
      const lastname = splittedName[0];
      const firstname = splittedName[1];
      const middlename = splittedName[2] === undefined ? "" : splittedName[2];

      const isExisted = employeesLU.find(
        (i) => i.lastname == lastname && i.firstname == firstname
      );

      if (!isExisted) {
        newEmployee.employeename = d["EMPLOYEE NAME"];
        newEmployee.idnumber = d["ID NO."];
        newEmployee.lastname = lastname.trim();
        newEmployee.firstname = firstname.trim();
        newEmployee.middlename = middlename.trim();
        newEmployee.dateanniversary = ExcelDateToJSDate(d["ANNIV DATE"]);
        newEmployee.datehired = ExcelDateToJSDate(d["DATE HIRED"]);
        newEmployee.manager =
          d["TEAM LEADER"] == undefined ? "" : d["TEAM LEADER"].trim();
        newEmployee.teamleader =
          d["OM/BM/TM"] == undefined ? "(none)" : d["OM/BM/TM"].trim();
        newEmployee.active = true;

        const campaignid = campaignLU.find((i) => i.name == d["OFFICE BRANCH"]);
        const positionid = positionLU.find((i) => i.name == d["JOB POSITION"]);
        const statusid = statusLU.find((i) => i.name == d["STATUS"]);
        const employmentstatusid = employmentStatusLU.find(
          (i) => i.name == d["EMPLOYEE STATUS"]
        );

        if (campaignid) {
          newEmployee.campaignid = campaignid.id;
        }

        if (positionid) {
          newEmployee.positionid = positionid.id;
        }

        if (statusid) {
          newEmployee.statusid = statusid.id;
        }

        if (employmentstatusid) {
          newEmployee.employmentstatusid = employmentstatusid.id;
        }

        newData.push(newEmployee);
      }
    });
    createMultipleEmployees(newData);
  };

  const insertEntries = async (data, type = "") => {
    const entries = [];

    for (let key in data) {
      entries.push({
        name: key,
        active: true,
      });
    }

    entries.sort(sortObjectValuesCompare);

    switch (type) {
      case "campaign":
        createMultipleCampaigns(entries);
        break;
      case "position":
        createMultiplePositions(entries);
        break;
      case "status":
        createMultipleStatus(entries);
        break;
      case "employmentstatus":
        createMultipleEmploymentStatus(entries);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="form">
        <div style={styles.container}>
          <div style={styles.containerButton}>
            <div>
              <div>Employees</div>
              <Button text="Get employees template" />
            </div>
            <ExcelUploader
              width={300}
              label="upload via excel"
              returnData={setEmployeeUpload}
            />
          </div>
          <div style={styles.containerButton}>
            <div>
              <h4>Leaves</h4>
              <Button text="Get leave template" />
            </div>
            <ExcelUploader
              width={300}
              label="upload via excel"
              returnData={setLeavesUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  containerButton: {
    flex: 1,
    display: "flex",
    alignItems: "flexStart",
    justifyContent: "center",
    flexDirection: "column",
    border: "1px solid #515159",
    margin: "1em",
  },
  containerUploader: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

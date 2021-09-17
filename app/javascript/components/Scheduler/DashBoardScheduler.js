import React, { useState, useEffect, useRef } from "react";

import Scheduler from "devextreme-react/scheduler";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";

import {
  getEmployeeLeaves,
  getEmployees,
  getLeaveTypes,
  getAppointments,
} from "../../data";

export default function DashBoardScheduler() {
  const views = ["day", "week", "workWeek", "month"];

  const schedulerRef = useRef();
  const [appointments, setAppointments] = useState();
  const [lastid, setLastId] = useState(0);

  let data = [];

  const populateData = async () => {
    const empi = await getEmployeeLeaves.load();
    const employees = await getEmployees.load();
    const leaveTypes = await getLeaveTypes.load();

    empi.map((leave) => {
      if (leave.status == 2) {
        const employee = employees.filter((i) => i.id == leave.employeeid)[0];
        const leaveType = leaveTypes.filter(
          (i) => i.id == leave.leavetypeid
        )[0];

        const remarks = leave.quantity == 1 ? "Whole Day" : "Half Day";
        const dateEff = new Date(leave.dateeffective);
        const dateEnd = new Date(leave.dateeffective).setHours(
          dateEff.getHours() + 1
        );
        const leaveRemarks = leave.remarks === null ? "" : leave.remarks;

        const entry = {
          id: leave.id * -1,
          text: `${employee.fullname} - ${leaveType.code}`,
          startDate: dateEff,
          endDate: dateEnd,
          iseditable: false,
          isWholeDay: leave.quantity == 1 ? true : false,
          description: `${remarks} - ${leaveRemarks}`,
        };

        data.push(entry);
      }
    });

    const app = await getAppointments.load();
    const x = [...data, ...app];
    setAppointments(x);
  };

  useEffect(() => {
    populateData();
  }, []);

  const onAppointmentAdded = (e) => {
    console.log(e);
    e.appointmentData.id = lastid;
  };

  const onAppointmentAdding = async ({ appointmentData }) => {
    appointmentData.startDate = new Date(appointmentData.startDate);
    appointmentData.endDate = new Date(appointmentData.endDate);
    appointmentData.isusermade = true;
    appointmentData.iseditable = true;

    const added = await getAppointments.insert(appointmentData);
    setLastId(added.id);
  };

  const onAppointmentUpdating = ({ oldData, newData }) => {
    newData.endDate = new Date(newData.endDate);
    newData.startDate = new Date(newData.startDate);
    getAppointments.update(oldData.id, newData);
  };

  const onAppointmentDeleting = ({ appointmentData }) => {
    getAppointments.remove(appointmentData.id);
  };

  const onAppointmentFormOpening = (e) => {
    console.log(e.appointmentData);
    setTimeout(() => {
      //  const toolbar = document.getElementsByClassName("dx-toolbar-after")[0];
      //  console.log((toolbar.children[0].style.display = "none"));
    });
  };

  return (
    <div>
      <Scheduler
        dataSource={appointments}
        ref={schedulerRef}
        views={views}
        onAppointmentFormOpening={onAppointmentFormOpening}
        onAppointmentAdding={onAppointmentAdding}
        onAppointmentAdded={onAppointmentAdded}
        onAppointmentDeleting={onAppointmentDeleting}
        onAppointmentUpdating={onAppointmentUpdating}
        defaultCurrentView={"workWeek"}
        startDayHour={7}
        endDayHour={21}
      />
    </div>
  );
}

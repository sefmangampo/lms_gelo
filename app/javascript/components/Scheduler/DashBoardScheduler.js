import React, { useEffect } from "react";

import Scheduler from "devextreme-react/scheduler";

export default function DashBoardScheduler() {
  const views = ["day", "week", "workWeek", "month"];

  let data = [];

  const populateData = () => {
    const newData = [
      {
        text: "Website Re-Design Plan",
        startDate: new Date("2021-09-29T16:30:00.000Z"),
        endDate: new Date("2021-09-29T18:30:00.000Z"),
        iseditable: false,
      },
      {
        text: "Book Flights to San Fran for Sales Trip",
        startDate: new Date("2021-09-29T19:00:00.000Z"),
        endDate: new Date("2021-09-29T20:00:00.000Z"),
        allDay: true,
      },
      {
        text: "Website Re-Design Plan",
        startDate: new Date("2021-09-26T16:30:00.000Z"),
        endDate: new Date("2021-09-26T18:30:00.000Z"),
      },
      {
        text: "Book Flights to San Fran for Sales Trip",
        startDate: new Date("2021-09-26T19:00:00.000Z"),
        endDate: new Date("2021-09-26T20:00:00.000Z"),
        allDay: true,
      },
      {
        text: "Install New Router in Dev Room",
        startDate: new Date("2021-09-26T21:30:00.000Z"),
        endDate: new Date("2021-09-26T22:30:00.000Z"),
      },
      {
        text: "Approve Personal Computer Upgrade Plan",
        startDate: new Date("2021-09-27T17:00:00.000Z"),
        endDate: new Date("2021-09-27T18:00:00.000Z"),
      },
      {
        text: "Final Budget Review",
        startDate: new Date("2021-09-27T19:00:00.000Z"),
        endDate: new Date("2021-09-29T20:35:00.000Z"),
      },
      {
        text: "New Brochures",
        startDate: new Date("2021-09-27T21:30:00.000Z"),
        endDate: new Date("2021-09-27T22:45:00.000Z"),
      },
    ];
  };

  useEffect(() => {
    populateData();
  }, []);

  const onAppointmentAdded = (e) => {
    console.log(e, data);
  };

  const onAppointmentAdding = (e) => {
    if (e.appointmentData.allDay === true) {
      console.log("bawal");
      e.cancel = true;
    }
  };

  const onAppointmentUpdated = (e) => {};

  const onAppointmentDeleted = (e) => {};

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
        views={views}
        dataSource={data}
        height={500}
        defaultCurrentView={"workWeek"}
        startDayHour={7}
        endDayHour={21}
      />
    </div>
  );
}

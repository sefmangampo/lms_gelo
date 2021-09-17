import React from "react";

import MaintenanceTab from "./MaintenanceTab/MaintenanceTab";
import DashboardTab from "./DashboardTab/DashboardTab";
import LeaveMonitoringTab from "./LeaveMonitoringTab/LeaveMonitoringTab";
import ReportsTab from "./ReportsTab/ReportsTab";

const renderMaintenanceTab = () => <MaintenanceTab />;
const renderDashboardTab = () => <DashboardTab />;
const renderLeaveMonitoringTab = () => <LeaveMonitoringTab />;
const renderReportsTab = () => <ReportsTab />;

export {
  renderMaintenanceTab,
  renderDashboardTab,
  renderLeaveMonitoringTab,
  renderReportsTab,
};

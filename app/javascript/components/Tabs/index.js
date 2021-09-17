import React from "react";

import MaintenanceTab from "./MaintenanceTab/MaintenanceTab";
import DashboardTab from "./DashboardTab/DashboardTab";
import LeaveMonitoringTab from "./LeaveMonitoringTab/LeaveMonitoringTab";
import ReportsTab from "./ReportsTab/ReportsTab";
import SettingsTab from "./SettingsTab/SettingsTab";

const renderMaintenanceTab = () => <MaintenanceTab />;
const renderDashboardTab = () => <DashboardTab />;
const renderLeaveMonitoringTab = () => <LeaveMonitoringTab />;
const renderReportsTab = () => <ReportsTab />;
const renderSettingsTab = () => <SettingsTab />;

export {
  renderMaintenanceTab,
  renderDashboardTab,
  renderLeaveMonitoringTab,
  renderReportsTab,
  renderSettingsTab,
};

import React from "react";

import MaintenanceTab from "./MaintenanceTab/MaintenanceTab";
import DashboardTab from "./DashboardTab";
import LeaveMonitoringTab from "./LeaveMonitoringTab";

const renderMaintenanceTab = () => <MaintenanceTab />;
const renderDashboardTab = () => <DashboardTab />;
const renderLeaveMonitoringTab = () => <LeaveMonitoringTab />;

export { renderMaintenanceTab, renderDashboardTab, renderLeaveMonitoringTab };

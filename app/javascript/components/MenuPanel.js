import React from "react";
import TabPanel, { Item } from "devextreme-react/tab-panel";

import {
  renderMaintenanceTab,
  renderDashboardTab,
  renderLeaveMonitoringTab,
  renderReportsTab,
} from "./Tabs";

export default function MenuPanel() {
  return (
    <div>
      <TabPanel
        animationEnabled={true}
        swipeEnabled={false}
        showNavButtons={true}
      >
        <Item title="Dashboard" render={renderDashboardTab} />
        <Item title="Maintenance" render={renderMaintenanceTab} />
        <Item title="Monitoring" render={renderLeaveMonitoringTab} />
        <Item title="Reports" render={renderReportsTab} />
      </TabPanel>
    </div>
  );
}

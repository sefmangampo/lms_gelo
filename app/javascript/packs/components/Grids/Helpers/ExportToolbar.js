import React from "react";
import { exportButton, exportToPDF } from "./ExportToPDF";

export default function onToolbarPreparing(e, name, newToolbars) {
  exportButton.options.onClick = () => {
    exportToPDF(e.component, name);
  };

  const label = {
    location: "center",
    locateInMenu: "never",
    text: name,
  };

  e.toolbarOptions.items.unshift(label);
  e.toolbarOptions.items.unshift(exportButton);

  const items = e.toolbarOptions.items;
  items.map((item) => {
    if (item.name === "exportButton") {
      item.location = "before";
    }
  });

  if (newToolbars) {
    for (let x = 0; x < newToolbars.length; x++) {
      items.unshift(newToolbars[x]);
    }
  }

  e.toolbarOptions.items = items;
}

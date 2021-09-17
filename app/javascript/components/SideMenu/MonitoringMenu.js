import React from "react";
import TreeView from "devextreme-react/tree-view";

const items = [
  {
    id: 1,
    text: "Leaves",
    selected: true,
  },
  {
    id: 2,
    text: "Leave Credits",
  },
  {
    id: 3,
    text: " Undertime",
  },
  {
    id: 4,
    text: "Accruals",
  },
  {
    id: 5,
    text: "Accrual Queue",
  },
  {
    id: 6,
    text: "Accrual Settings",
  },
  {
    id: 7,
    text: "Accrual Adjustments",
  },
];

export default function MonitoringMenu({ setSelectedItem }) {
  const onItemClick = ({ itemData }) => {
    setSelectedItem(itemData.id);
  };
  return (
    <div>
      <TreeView
        items={items}
        selectByClick={true}
        selectionMode="single"
        onItemClick={onItemClick}
      />
    </div>
  );
}

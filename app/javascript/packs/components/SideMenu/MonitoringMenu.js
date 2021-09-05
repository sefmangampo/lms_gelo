import React from "react";
import TreeView from "devextreme-react/tree-view";

const items = [
  {
    id: "1",
    text: "Employee Leaves",
    selected: true,
  },
  {
    id: "2",
    text: "Employee Leave Credits",
  },
  {
    id: "3",
    text: "Employee Undertime",
  },
];

export default function MonitoringMenu({ setSelectedItem }) {
  const onItemClick = ({ itemIndex }) => {
    setSelectedItem(itemIndex);
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

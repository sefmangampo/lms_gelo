import React from "react";
import TreeView from "devextreme-react/tree-view";

const items = [
  {
    id: 1,
    text: "Create Report",
    selected: true,
  },
  {
    id: 2,
    text: "View Reports",
  },
  {
    id: 3,
    text: "Audit Trail",
  },
];

export default function ReportsMenu({ setSelectedItem }) {
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

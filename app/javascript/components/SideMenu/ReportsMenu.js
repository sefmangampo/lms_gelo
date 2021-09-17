import React from "react";
import TreeView from "devextreme-react/tree-view";

const items = [
  {
    id: 1,
    text: "Create Report",
    selected: true,
  },
];

export default function ReportsMenu({ setSelectedItem }) {
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

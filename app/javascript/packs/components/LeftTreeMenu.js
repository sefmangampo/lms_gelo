import React from "react";
import TreeView from "devextreme-react/tree-view";

const items = [
  {
    id: "1",
    text: "Employees",
    selected: true,
  },
  {
    id: "2",
    text: "Cutoffs",
  },
  {
    id: "3",
    text: "Payment Mode",
  },
  {
    id: "4",
    text: "Leave Status",
  },
];

export default function LeftTreeMenu({ setSelectedItem }) {
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

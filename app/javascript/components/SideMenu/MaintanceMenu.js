import React from "react";
import TreeView from "devextreme-react/tree-view";

const items = [
  {
    id: 1,
    text: "Employees",
    selected: true,
  },
  {
    id: 2,
    text: "Cutoffs",
  },
  {
    id: 3,
    text: "Payment Mode",
  },
  {
    id: 4,
    text: "Leave Status",
  },
  {
    id: 5,
    text: "Leave Types",
  },
  {
    id: 6,
    text: "Accrual Types",
  },
  {
    id: 7,
    text: "Office Branch",
  },
  {
    id: 8,
    text: "Job Positions",
  },
  {
    id: 9,
    text: "Sex",
  },
  {
    id: 10,
    text: "Status",
  },
  {
    id: 11,
    text: "Employee Status",
  },
  {
    id: 12,
    text: "Upload via Excel",
  },
];

export default function MaintanceMenu({ setSelectedItem }) {
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

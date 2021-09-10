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
  {
    id: "5",
    text: "Leave Types",
  },
  {
    id: "6",
    text: "Accrual Types",
  },
  {
    id: "7",
    text: "Campaigns",
  },
  {
    id: "8",
    text: "Positions",
  },
  {
    id: "9",
    text: "Sex",
  },
  {
    id: "10",
    text: "Accrual Frequency",
  },
  {
    id: "11",
    text: "PayGroups",
  },
];

export default function MaintanceMenu({ setSelectedItem }) {
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

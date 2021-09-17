import React from "react";
import TreeView from "devextreme-react/tree-view";

const items = [
  {
    id: 1,
    text: "User",
    selected: true,
  },
  {
    id: 2,
    text: "Preferences",
  },
];

export default function SettingsMenu({ setSelectedItem }) {
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

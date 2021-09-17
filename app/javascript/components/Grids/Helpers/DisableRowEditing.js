const disableRowEditing = (e) => {
  if (e.rowType === "data" && e.column.command == "edit") {
    if (e.data.internal === true) {
      e.cellElement.style.visibility = "hidden";
    }
  }
};

export default disableRowEditing;

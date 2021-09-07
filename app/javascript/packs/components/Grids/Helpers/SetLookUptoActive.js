export default function setActiveLookUp(e, field, store) {
  if (e.parentType === "dataRow") {
    if (e.dataField === field) {
      e.editorOptions.dataSource = store;
    }
  }
}

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";

export const exportToPDF = (grid, name) => {
  const doc = new jsPDF();
  exportDataGridToPdf({
    jsPDFDocument: doc,
    component: grid,
  }).then(() => {
    doc.save(`${name}.pdf`);
  });
};

export const exportButton = {
  location: "before",
  widget: "dxButton",
  options: {
    icon: "exportpdf",
    hint: "Export to PDF",
  },
};

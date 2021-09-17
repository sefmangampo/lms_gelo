import React, { useRef } from "react";
import FileUploader from "devextreme-react/file-uploader";

import { ExcelToJson } from "../data";

export default function ExcelUploader({ label, returnData }) {
  const uploadFile = async (file, progressCallBack) => {
    const data = await ExcelToJson(file);

    returnData(data);
  };

  return (
    <div>
      <FileUploader
        selectButtonText={label}
        labelText=""
        uploadFile={uploadFile}
        uploadMode="useButtons"
        allowedFileExtensions={[".cvs", ".xls", ".xlsx"]}
      />
    </div>
  );
}

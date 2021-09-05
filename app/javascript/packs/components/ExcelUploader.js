import React, { useRef } from "react";
import FileUploader from "devextreme-react/file-uploader";

import { ExcelToJson } from "../data";

export default function ExcelUploader() {
  const uploadFile = async (file, progressCallBack) => {
    console.log(file);
    const data = await ExcelToJson(file);

    console.log(data);
  };

  return (
    <div>
      <FileUploader
        selectButtonText="Upload via Excel"
        labelText=""
        uploadFile={uploadFile}
        uploadMode="useButtons"
        allowedFileExtensions={[".cvs", ".xls", ".xlsx"]}
      />
    </div>
  );
}

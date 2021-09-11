import XLXS from "xlsx";

export const ExcelToJson = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    let result = {};

    reader.onload = (e) => {
      let data = e.target.result;
      data = new Uint8Array(data);

      const workbook = XLXS.read(data, { type: "array" });

      for (let x = 0; x < workbook.SheetNames.length; x++) {
        const sheetName = workbook.SheetNames[x];
        let roa = XLXS.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
        });
        if (roa.length) result[sheetName] = roa;
      }

      res(result);
    };
    reader.readAsArrayBuffer(file);
  });
};

import XLXS from "xlsx";

export const ExcelToJson = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      let data1 = e.target.result;
      data1 = new Uint8Array(data1);

      let workbook = XLXS.read(data1, { type: "array" });
      var sheet_name_list = workbook.SheetNames;

      sheet_name_list.forEach((y) => {
        const worksheet = workbook.Sheets[y];
        const headers = {};
        const data = [];

        for (let z in worksheet) {
          if (z[0] === "!") {
            continue;
          }
          const col = z.substring(0, 1);
          const row = parseInt(z.substring(1));
          const value = worksheet[z].v;

          if (row === 1) {
            headers[col] = value;
            continue;
          }

          if (!data[row]) data[row] = {};
          data[row][headers[col]] = value;
        }
        res(data);
      });

      // const workbook = XLXS.read(data, { type: "array" });
      // console.log("wrobok", workbook);

      // const datum = XLXS.utils.sheet_to_json(workbook.Sheets["Sheet"], {
      //   blankrows: false,
      // });
      // console.log("real sheet", datum);

      // for (let x = 0; x < workbook.SheetNames.length; x++) {
      //   const sheetName = workbook.SheetNames[x];
      //   console.log("sheetname", sheetName);
      //   console.log("sheet", workbook.Sheets[sheetName]);
      //   let roa = await XLXS.utils.sheet_to_json(workbook.Sheets[sheetName], {
      //     raw: false,
      //   });
      //   console.log("roa", roa);
      //   if (roa.length) result[sheetName] = roa;
      // }
    };
    reader.readAsArrayBuffer(file);
  });
};

const path = require("path");
const XLSX = require("xlsx");
const fs = require("fs");
const {
  FilterReportingFilesHandler,
} = require("./FilterReportingFilesHandler");
const { errorResponse } = require("../../../utility/ResponseHandler");
const {
  checkAccessForAllUsersArchive,
} = require("../../user/query/checkAccessForAllUsersArchive");
const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

module.exports.sendReportingFile = async (req, res) => {
  //["گزارش گیری"]
  const archiveIds = await checkAccessForAllUsersArchive(
    ["61e3caf7d6d14316ac387bc6"],
    req.user.userId
  );
  if (archiveIds.length === 0) return errorResponse(res, 6);
  let data = [];

  const { files } = await FilterReportingFilesHandler(req.query, true);

  files.map((f) => {
    data.push({
      عنوان: f.title,
      قفسه: f.archiveTreeId.title,
      تاریخ: f.fileDate,
      وضعیت: f.fileStatus,
      نوع: f.type,
      شماره: f.fileCode,
      "ایجاد کننده": f.creator.firstName + f.creator.lastName,
      ایجاد: f.createDate,
    });
  });
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  if (!wb.Workbook) wb.Workbook = {};
  if (!wb.Workbook.Views) wb.Workbook.Views = [];
  if (!wb.Workbook.Views[0]) wb.Workbook.Views[0] = {};
  wb.Workbook.Views[0].RTL = true;

  const wscols = [
    { wch: 40 },
    { wch: 20 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];

  ws["!cols"] = wscols;

  XLSX.utils.book_append_sheet(wb, ws, "گزارش پرونده ها");
  const fileName = Date.now() + ".xlsx";
  XLSX.writeFile(
    wb,
    path.join(
      __dirname + "../" + "../" + "../" + "../" + "/uploads/" + fileName
    )
  );

  await fs.readFile(
    path.join(
      __dirname + "../" + "../" + "../" + "../" + "/uploads/" + fileName
    ),
    (err, file) => {
      setTimeout(async () => {
        return res.sendFile(
          path.join(
            __dirname + "../" + "../" + "../" + "../" + "/uploads/" + fileName
          )
        );
      }, 1000);
    }
  );
};

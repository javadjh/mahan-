const { roleGuard } = require("../../../authUtilities/Auth");
const unzipper = require("unzipper");
const { errorResponse } = require("../../../utility/ResponseHandler");
const glob = require("glob");
const DocumentModel = require("../../../model/DocumentModel");
const fs = require("fs");
const encrypt = require("node-file-encrypt");
const libre = require("libreoffice-convert");
var mime = require("mime");

libre.convertAsync = require("util").promisify(libre.convert);

module.exports.getDocumentsFile = async (req, res) => {
  await roleGuard(["نمایش سندها", "ناظر"], req, res);
  if (res.statusCode > 399) return errorResponse(res, 6);

  const { id } = req.params;

  /*//حذف فایل های گذشته
    glob("uploads\\\\"+"*",{"ignore":["uploads\\\\"+'*.crypt']}, async function (err, files) {
        for (let i = 0; i < files.length; i++) {
            await fs.unlinkSync(files[i])
        }
    })*/

  //برای پیدا کردن سند
  let document = await DocumentModel.findById(id).lean();

  //برای decrypt کردن فایل
  let encryptPath = "";
  if (
    document.ex === "png" ||
    document.ex === "jpg" ||
    document.ex === "jpge" ||
    document.ex === "docx" ||
    document.ex === "xlsm" ||
    document.ex === "xlsx" ||
    document.ex === "txt"
  ) {
    encryptPath = "uploads\\\\\\\\" + document.uniquePdfFileId;
  } else {
    encryptPath = "uploads\\\\\\\\" + document.uniqueFileId;
  }
  let fr = new encrypt.FileEncrypt(encryptPath);
  fr.openSourceFile();
  try {
    await fr.decrypt(process.env.encryptKey, async () => {
      if (
        document.ex === "png" ||
        document.ex === "jpg" ||
        document.ex === "jpge" ||
        document.ex === "docx" ||
        document.ex === "xlsm" ||
        document.ex === "xlsx" ||
        document.ex === "txt"
      ) {
        fs.readFile("uploads\\\\\\\\" + document._id + ".pdf", (err, file) => {
          res.setContent("Content-Type", "application/pdf");
          res.setContent(
            "Content-Disposition",
            `inline; filename=${document._id + ".pdf"}`
          );
          return res.send(file);
        });
      } else {
        fs.readFile(
          "uploads\\\\\\\\" + document._id + "." + document.ex,
          (err, file) => {
            console.log(err);
            console.log(file);
            return res.send(file);
          }
        );
      }
    });
  } catch (err) {
    if (
      document.ex === "png" ||
      document.ex === "jpg" ||
      document.ex === "jpge" ||
      document.ex === "docx" ||
      document.ex === "xlsm" ||
      document.ex === "xlsx" ||
      document.ex === "txt"
    ) {
      fs.readFile("uploads\\\\\\\\" + document._id + ".pdf", (err, file) => {
        return res.send(file);
      });
    } else {
      fs.readFile(
        "uploads\\\\\\\\" + document._id + "." + document.ex,
        (err, file) => {
          console.log(err);
          console.log(file);
          return res.send(file);
        }
      );
      return res.send("file");
    }
  }

  return res.send("file");
};

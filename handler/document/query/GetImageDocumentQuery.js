const glob = require("glob");
const DocumentModel = require("../../../model/DocumentModel");
const encrypt = require("node-file-encrypt");
const { errorResponse } = require("../../../utility/ResponseHandler");
const { roleGuard } = require("../../../authUtilities/Auth");
const { isValidObjectId } = require("mongoose");
const path = require("path");
const { isLent } = require("../../lend/share");
/*
دریافت اصل عکس جهت ادیتور عکس
*/

module.exports.getImageDocument = async (req, res) => {
  const { id } = req.params;

  /*try {
        //حذف اسناد decrypt شده در اسناد
        glob("uploads\\\\"+"*",{"ignore":["uploads\\\\"+'*.crypt']}, async function (err, files) {
            for (let i = 0; i < files.length; i++) {
                await fs.unlinkSync(files[i])
            }
            console.log(files)
        })
    }catch (e){
        console.log("EEEEEEEEEEError")
        console.log(e)
    }*/

  //برای پیدا کردن سند
  let document = await DocumentModel.findById(id).lean();

  if (!(await isLent(req, document.fileId))) {
    await roleGuard(["نمایش سندها", "ناظر"], req, res);
    if (res.statusCode > 399) return errorResponse(res, 6);
  }

  //برای decrypt کردن فایل
  let encryptPath = "uploads\\\\" + document.uniqueFileId;
  let fr = new encrypt.FileEncrypt(encryptPath);
  fr.openSourceFile();
  try {
    await fr.decrypt(process.env.encryptKey, async () => {
      setTimeout(() => {
        res.sendFile(
          path.join(
            __dirname +
              "../" +
              "../" +
              "../" +
              "../" +
              "/uploads/" +
              document._id +
              "." +
              document.ex
          )
        );
      }, 1000);
    });
  } catch (err) {
    setTimeout(() => {
      res.sendFile(
        path.join(
          __dirname +
            "../" +
            "../" +
            "../" +
            "../" +
            "/uploads/" +
            document._id +
            "." +
            document.ex
        )
      );
    }, 1000);
  }
};

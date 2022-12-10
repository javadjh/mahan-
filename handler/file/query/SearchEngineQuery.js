/*
جست و جو در:
مخاطبین
کلیدواژه
یادداشت ها
شماره پرونده
تاریخ پرونده
هشدار ها
*/
const FileModel = require("../../../model/FileModel");
const UserModel = require("../../../model/UserModel");
const DocumentModel = require("../../../model/DocumentModel");
const {
  checkAccessForAllUsersArchive,
} = require("../../user/query/checkAccessForAllUsersArchive");
module.exports.searchEngine = async (req, res) => {
  // const user = await UserModel.findById(req.user.userId)

  //["جستجوی پیشرفته اسناد"]
  let archives = await checkAccessForAllUsersArchive(
    ["61e3caf7d6d14316ac387bc0"],
    req.user.userId
  );

  /*user.role.map(r=>{
        archives.push(r.archiveId)
    })
    console.log(archives)*/
  const { searchValue } = req.query;
  if (searchValue?.length < 1 || !searchValue) {
    return res.send({
      files: [],
      documents: [],
    });
  }

  const user = await UserModel.findById(req.user.userId).select("role");
  let fileAccess = [];
  user.role.map((role) => {
    if (role.archiveId.toString() === req.headers.archive.toString()) {
      fileAccess = role.fileAccess;
    }
  });

  let filter = {
    isActive: true,
    archiveId: { $in: archives },
    type: {
      $in: fileAccess,
    },
    $or: [
      { title: { $regex: searchValue, $options: "i" } },
      { fileCode: { $regex: searchValue, $options: "i" } },
      { fileStatus: { $regex: searchValue, $options: "i" } },
      { keyword: { $regex: searchValue, $options: "i" } },
      { type: { $regex: searchValue, $options: "i" } },
      { "archiveTreeId.title": { $regex: searchValue, $options: "i" } },
      { "contacts.label": { $regex: searchValue, $options: "i" } },
      {
        form: {
          $elemMatch: { answer: { $regex: searchValue, $options: "i" } },
        },
      },
    ],
  };

  if (
    req.user.userId.toString() !== "61e3f77540129135ec4d928f" &&
    req.user.userId.toString() !== "626451c2ce31af260c2238be"
  )
    filter.isConfirm = true;

  const files = await FileModel.find(filter)
    .populate("archiveTreeId archiveId")
    .sort({ createDate: -1 })
    .select("-form")
    .limit(5)
    .lean();

  let filesValues = [];
  files.map((file) => {
    if (file.title.includes(searchValue)) filesValues.push("title");
    if (file.fileCode.includes(searchValue)) filesValues.push("fileCode");
    if (file.fileStatus.includes(searchValue)) filesValues.push("fileStatus");
    if (file.keyword)
      if (file.keyword.includes(searchValue)) filesValues.push("keyword");
    if (file.type.includes(searchValue)) filesValues.push("type");
    if (file.archiveTreeId.title.includes(searchValue))
      filesValues.push("archiveTreeId");
    /*if(file.contacts.length>0)
            if(file.contacts.label.includes(searchValue)) filesValues.push('contacts')*/
    if (filesValues.length === 0) {
      filesValues.push("form");
    }
    file.target = filesValues;
    filesValues = [];
  });

  let documentFilter = {
    isActive: true,
    archiveId: { $in: archives },
    $or: [
      { title: { $regex: searchValue, $options: "i" } },
      { documentOCR: { $regex: searchValue, $options: "i" } },
      { documentName: { $regex: searchValue, $options: "i" } },
      { "notes.description": { $regex: searchValue, $options: "i" } },
      { "videoFlags.description": { $regex: searchValue, $options: "i" } },
    ],
  };

  if (
    req.user.userId.toString() !== "61e3f77540129135ec4d928f" &&
    req.user.userId.toString() !== "626451c2ce31af260c2238be"
  )
    documentFilter.isConfirm = true;
  const documents = await DocumentModel.find(documentFilter, null, {})
    .sort({ createDate: -1 })
    .populate("archiveId fileId ")
    .limit(5)
    .lean();

  let documentsValues = [];
  documents.map((document) => {
    if (document?.title?.includes(searchValue)) documentsValues.push("title");
    if (document?.documentOCR?.includes(searchValue))
      documentsValues.push("OCR");
    if (document?.documentName?.includes(searchValue))
      documentsValues.push("documentName");

    if (document.notes.length > 0)
      document?.notes?.map((note) => {
        if (note?.description?.includes(searchValue))
          documentsValues.push("note");
      });

    if (document?.videoFlags?.length > 0)
      document?.videoFlags?.map((flag) => {
        if (flag?.description?.includes(searchValue))
          documentsValues.push("flag");
      });

    console.log(documentsValues);
    document.target = documentsValues;
    documentsValues = [];
  });

  return res.send({
    files,
    documents,
  });
};

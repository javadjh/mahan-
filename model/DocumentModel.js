const mongoose = require("mongoose");
const VideoFlagSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  startSecond: {
    type: Number,
  },
  endSecond: {
    type: Number,
  },
});
const DocumentNotesSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  userFullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});
const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  documentName: {
    type: String,
    required: true,
  },
  isMain: {
    type: Boolean,
    default: true,
  },
  mainParent: {
    type: mongoose.Types.ObjectId,
  },
  documentSize: {
    type: Number,
    required: true,
  },
  archiveId: {
    type: mongoose.Types.ObjectId,
    ref: "archive",
  },
  fileId: {
    type: mongoose.Types.ObjectId,
    ref: "file",
  },
  version: {
    type: Number,
    default: 1,
  },
  ex: {
    type: String,
    required: true,
  },
  uiId: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: [DocumentNotesSchema],
  },
  creator: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  uniqueFileId: {
    type: String,
    required: true,
  },
  //برای فایل های pdf - اگر فایل قابل pdf شدن باشه در این قسمت شناسه encrypt شده ذخیره می شود
  uniquePdfFileId: {
    type: String,
  },
  imageWidth: {
    type: Number,
  },
  imageHeight: {
    type: Number,
  },
  videoFlags: {
    type: [VideoFlagSchema],
  },
  isFileConfirm: {
    type: Boolean,
    default: false,
  },
  lastVersion: {
    type: Number,
    default: 1,
  },
  inShelve: {
    type: Boolean,
    default: false,
  },
  documentOCR: {
    type: String,
  },
});
const DocumentModel = mongoose.model("document", DocumentSchema);
module.exports = DocumentModel;

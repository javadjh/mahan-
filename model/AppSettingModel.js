const mongoose = require("mongoose");
const AppSettingSchema = new mongoose.Schema({
  mailHost: {
    type: String,
    required: true,
  },
  mailPort: {
    type: Number,
    required: true,
  },
  mailUser: {
    type: String,
    required: true,
  },
  mailPassword: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  isSupervisorActive: {
    type: Boolean,
    default: true,
  },
  version: {
    type: String,
    required: true,
    default: "1.0.0",
  },
  illegalFormats: {
    type: [String],
    default: ["dll", "ini", "bat", "msi", "exe", "info"],
  },
  logo: {
    type: String,
  },
});
const AppSettingModel = mongoose.model("appsetting", AppSettingSchema);
module.exports = AppSettingModel;

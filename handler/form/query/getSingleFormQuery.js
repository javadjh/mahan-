const FormModel = require("../../../model/FormModel");

module.exports.getForm = async (req, res) => {
  return res.send(await FormModel.findById(req.params.id));
};

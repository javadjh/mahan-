const ApplicantModel = require("../../../model/ApplicantModel");

module.exports.getApplicantsAuto = async (req, res) => {
  const applicants = await ApplicantModel.find().limit(1000);
  applicantsList = [];
  applicants.map((applicant) => {
    applicantsList.push({
      value: applicant._id,
      label: `${applicant.title}`,
    });
  });

  return res.send({
    applicants: applicantsList,
  });
};

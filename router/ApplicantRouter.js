const express = require("express");
const {
  deleteApplicant,
} = require("../handler/applicant/command/DeleteApplicantCommand");
const {
  insertApplicant,
} = require("../handler/applicant/command/InsertApplicantCommand");
const {
  getApplicants,
} = require("../handler/applicant/query/GetApplicantsQuery");
const {
  deleteCompanyChart,
} = require("../handler/applicant/command/DeleteApplicantCommand");
const {
  insertCompanyChart,
} = require("../handler/applicant/command/InsertApplicantCommand");
const { firstGuard } = require("../authUtilities/Auth");
const {
  getCompanyChart,
} = require("../handler/applicant/query/GetApplicantsQuery");
const {
  getApplicantsAuto,
} = require("../handler/applicant/query/GetApplicantsAutoQuery");
const router = express.Router();

/*
@GET
@Access:{
    مدیریت سمت سازمانی
}
*/
router.get("/applicants", [firstGuard], getApplicants);

/*
@GET

*/
router.get("/applicants/auto", getApplicantsAuto);

/*
@POST
@Body:title
@Access:{
    مدیریت سمت سازمانی
}
*/
router.post("/insert/applicant", [firstGuard], insertApplicant);

/*
@DELETE
@Body:title
@Access:{
    مدیریت سمت سازمانی
}
*/
router.delete("/applicants/:id", [firstGuard], deleteApplicant);

module.exports = router;

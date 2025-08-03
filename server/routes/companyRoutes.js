const express = require("express");

const router = express.Router();

const companyController = require("../Controllers/companyController");
// register a company

router.post("/register", companyController.register);

// company login

router.post("/login", companyController.loginCompany);
// get company data

router.get("/company", companyController.getCompanyData);

// post a job

router.post("/post-job", companyController.postJob);

//get applicants data of a company

router.get("/applicants", companyController.getCompanyJobApplicants);

// get company job list

router.get("/list-jobs", companyController.getCompanyPostedJobs);

// change job application status

router.post("/change-status", companyController.changeJobApplicationStatus);

// change app visiblity

router.post("/change-visibility", companyController.changeJobVisibility);

module.exports = router;

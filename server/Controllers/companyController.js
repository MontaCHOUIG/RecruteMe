// Register a new company
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file ? req.file.path : null;
  if (!name || !email || !password || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }
  } catch (error) {
    console.error("Error registering company:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// company login
exports.loginCompany = async (req, res) => {};

// get company

exports.getCompanyData = async (req, res) => {};

//

// get company job applicants

exports.getCompanyJobApplicants = async (req, res) => {};

// get company posted jobs

exports.getCompanyPostedJobs = async (req, res) => {};

// change job application status
exports.changeJobApplicationStatus = async (req, res) => {};

//change job visibility

exports.changeJobVisibility = async (req, res) => {};

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
  const newCompany = new Company({
    name,
    email,
    password,
    image,
  });
  try {
    await newCompany.save();
    return res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error saving company:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// company login
exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const isMatch = await company.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = company.generateAuthToken();
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in company:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get company

exports.getCompanyData = async (req, res) => {
  const companyId = req.params.id;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json(company);
  } catch (error) {
    console.error("Error fetching company data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//

// get company job applicants

exports.getCompanyJobApplicants = async (req, res) => {
  const companyId = req.params.id;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const jobApplicants = await JobApplication.find({ companyId });
    return res.status(200).json(jobApplicants);
  } catch (error) {
    console.error("Error fetching job applicants:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get company posted jobs

exports.getCompanyPostedJobs = async (req, res) => {};

// change job application status
exports.changeJobApplicationStatus = async (req, res) => {};

//change job visibility

exports.changeJobVisibility = async (req, res) => {};

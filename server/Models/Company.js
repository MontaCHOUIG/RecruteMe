const mongoose = require("mongoose");
const { RequiredError } = require("svix/dist/openapi");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;

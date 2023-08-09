import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Experience: {
    type: Number,
    default: 0,
  },
  "Skill 1": {
    type: String,
    default: "",
  },
  "Skill 2": {
    type: String,
    default: "",
  },
  "Skill 3": {
    type: String,
    default: "",
  },
  "Description 1": {
    type: String,
    default: "",
  },
  "Description 2": {
    type: String,
    default: "",
  },
  "Description 3": {
    type: String,
    default: "",
  },
  marks: [
    {
      topic: String,
      marks: {
        type: Number,
        default: 0,
      },
    },
  ],
});

// Create the model using the schema
const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;

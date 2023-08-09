import mongoose from "mongoose"; // Assuming the correct path to the Applicant model

const selectedSchema = new mongoose.Schema({
  job: {
    type: String,
  },
  eligible: {
    type: [mongoose.Schema.Types.ObjectId], // This will store an array of ObjectIds
    ref: "Applicant", // Reference to the 'Applicant' model
  },
});

const Selected = mongoose.model("Selected", selectedSchema);

export default Selected;

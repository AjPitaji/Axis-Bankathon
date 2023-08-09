
import mongoose from "mongoose"; // Assuming the correct path to the Applicant model

const listSchema = new mongoose.Schema({
  Title: {
    type: String,
  },
});

const Listing = mongoose.model("Listing", listSchema);

export default Listing;

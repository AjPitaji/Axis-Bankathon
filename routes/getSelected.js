import express from "express";
import Selected from "../models/selected.js";

const router = express.Router();

router.get("/", async (req, res) => {
try {
  // Fetch all documents from the "Selected" model

  const selectedDocuments = await Selected.find({}).populate("eligible");

  console.log(selectedDocuments);
  // Return the selected applicants' information
  res.render("selected",{selected:selectedDocuments})
} catch (error) {
  return res.status(400).json({
    success: false,
    error: error.response
      ? error.response.data
      : "There was an issue on the server",
  });
}

});

router.get("/:job", async (req, res) => {
  const job = req.params.job;
  try {
    // Fetch documents from the "Selected" model for the specified job
    const selectedDocuments = await Selected.find({ job }).populate("eligible");

    // Return the selected applicants' information for the specified job
    res.render("selected", { selected: selectedDocuments });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

export default router;

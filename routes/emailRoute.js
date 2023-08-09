import express from "express";
import Selected from "../models/selected.js";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { job } = req.body;

    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Please provide the 'job' parameter.",
      });
    }

    // Fetch the selected document for the specified job
    const selectedDocument = await Selected.findOne({ job }).populate(
      "eligible"
    );

    if (!selectedDocument) {
      return res.status(200).json({
        success: true,
        message: "No selected candidates found for the specified job.",
      });
    }

    const { eligible } = selectedDocument;
    // If there are no selected candidates for the specified job, return a message
    if (eligible.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No selected candidates for the specified job to email.",
      });
    }

    // Email configuration (You need to replace these with your actual email credentials)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "aj03jha@gmail.com",
        pass: "zfiiibgwazhidrjz",
      },
      debug: true, // Enable debugging
    });

    // Collect email addresses of eligible candidates
    const emailRecipients = eligible.map((candidate) => candidate.Email); // Assuming the candidate objects have an 'email' field
    // Create the email message
    const mailOptions = {
      from: "aj03jha@gmail.com", // Sender's email address
      to: emailRecipients.join(", "), // Comma-separated list of recipient email addresses
      subject: job, // Use the job title as the subject
      text:
        "Congratulations! You have been selected for the following job: " + job,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Emails sent successfully to selected candidates.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
})

export default router
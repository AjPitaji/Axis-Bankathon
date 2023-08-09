import express from "express";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import Applicant from "../models/applicant.js";
import Selected from "../models/selected.js";

dotenv.config();
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);



router.post("/", async (req, res) => {
  try {
    const applicants = await Applicant.find({});
    const { job } = req.body;

    

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
         I have provided you with a array of applicants and a job description select canditates( if available ). Each applicant will have three skills field
         even if one matches you can select them if you find more than 3 candidates check their marks field if it exists and give prefrence according to it.Dont select any candidate not having that skill mentioned in job description

    Job Description:
    ${job}

    Applicants:
    ${JSON.stringify(applicants)}

        don't give reasons, return the object ids as an array like this ["objectId"] dont add slashes
        ###
      `,
      max_tokens: 200, // Adjust the max_tokens value as per your response length requirement
      temperature: 0,
      top_p: 0,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["###"], // Add a unique stop condition
    });

    const chosenIds = JSON.parse(response.data.choices[0].text.trim());
    // const chosenApplicant = await Applicant.findById(chosenId);
    const selectedApplicants = await Applicant.find({
      _id: { $in: chosenIds },
    });
    // Log the chosen applicant's information

    const newSelectedDocument = new Selected({
      job: job, // Replace this with the actual job description
      eligible: selectedApplicants, // Pass the array of selectedApplicants' ObjectIds
    });

    // Save the document to the database
    await newSelectedDocument.save();

    res.redirect("/selectedApplicants/"+job);
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

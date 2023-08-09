import express from "express";
import Question from "../models/question.js";
import Applicant from "../models/applicant.js";
const router = express.Router();

router.get("/:job", async (req, res) => {
  try {
    const jobTitle = req.params.job; // Get the job title from the URL parameter
    const questions = await Question.find({ jobTitle: jobTitle }); // Fetch questions with the specified job title
    res.render("test", { questions: questions , job:jobTitle}); // Pass the questions to the template
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/:job",async(req,res)=>{
  try {

    // Parse the req.body object
    const submittedAnswers = req.body;

    let totalScore = 0;

    // Loop through the submitted answers
    for (const questionIndex in submittedAnswers) {
      const answerData = JSON.parse(submittedAnswers[questionIndex]);
      const questionId = answerData.questionId;
      const selectedOption = answerData.optionValue;

      // Retrieve the Question object from the database using the question ID
      const question = await Question.findById(questionId);
      if (question && question.correctAnswer === selectedOption) {
        totalScore++;
      }
    }

    
    let name = req.session.username
    // You can send a response or render a view here
    const applicant = await Applicant.findOne({ Name: name });

   applicant["marks"].push({topic:req.params.job,marks:totalScore})
   await applicant.save()
   res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default router;

import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
  },
  option2: {
    type: String,
  },
  option3: {
    type: String,
  },
  option4: {
    type: String,
  },
  correctAnswer: {
    type: String,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  createdAt:{
    type: String,
    default:" "
  }

});

const Question = mongoose.model("Question", questionSchema);

export default Question;


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import emailRoute from "./routes/emailRoute.js"
import filterRoute from "./routes/filterRoute.js"
import applicantRoute from "./routes/getapplicants.js"
import getSelectedRoute from "./routes/getSelected.js"
import getQuestionRoute from "./routes/getQuestions.js"
import getListing from "./routes/getListings.js"
import applyRoute from "./routes/apply.js"
import authRoute from "./routes/auth.js"
import bodyParser from "body-parser";
import session from "express-session";
import adminRoute from './routes/admin.js'

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key", // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect(process.env.MONGO_URI);

const requireLogin = (req, res, next) => {
  if (req.session && req.session.userId) {
    // If the user is logged in (user ID is stored in the session), proceed to the next middleware/route
    next();
  } else {
    // If the user is not logged in, redirect to the login page
    res.redirect("/auth"); // Replace "/auth" with the URL of your login page
  }
};

app.get("/",requireLogin,getListing);
app.use("/apply",requireLogin,applyRoute)
app.use("/admin",requireLogin,adminRoute)
app.use("/filter", filterRoute);
app.use("/applicants",applicantRoute);
app.use("/selectedApplicants",requireLogin,getSelectedRoute);
app.use("/email", emailRoute);
app.use("/auth",authRoute)
app.use("/test",requireLogin,getQuestionRoute)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

// Assuming you have imported the necessary models and libraries at the beginning of your code.

// Define the route to fetch all applicants from the "Selected" model






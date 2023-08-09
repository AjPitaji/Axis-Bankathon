import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import Applicant from "../models/applicant.js"; // Replace with the correct path to your User model

// Login Route

let msg = ""
router.get("/",(req,res)=>{
  res.render("auth",{msg:msg});
})
router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Find the user by email
    const user = await Applicant.findOne({ Email: Email });

    // Check if the user exists and verify the password
    if (!user || !bcrypt.compareSync(Password, user.Password)) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Set the user ID in the session
    req.session.userId = user._id;
    req.session.username = user.Name;
    req.session.email = user.Email;

    res.redirect("/")
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Register Route
router.post("/register", async (req, res) => {
  const { Name, Email, Password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await Applicant.findOne({ Email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    // Create a new user and save to the database
    const newUser = new Applicant({
      Name,
      Email,
      Password: hashedPassword,
    });

    await newUser.save();

    res.redirect("/auth")
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/signout", (req, res) => {
  // Clear the user's session to log them out
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Unable to sign out.",
      });
    }
    res.redirect("/auth"); // Redirect the user to the login page after sign-out
  });
});

export default router;

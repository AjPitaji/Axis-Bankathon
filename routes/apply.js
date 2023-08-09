import express from "express";
const router = express.Router();
import Applicant from "../models/applicant.js"; // Replace with the correct path to your User model
import Listing from "../models/listings.js";



let msg = "";
router.get("/",async (req,res)=>{
    const listings = await Listing.find({});
    console.log(listings);
    const {username,email} = req.session;
    res.render("apply",{name:username,email:email,listings:listings});
})

router.post("/",async(req,res)=>{
const {
  name,
  skill1,
  description1,
  skill2,
  description2,
  skill3,
  description3,
} = req.body;

console.log(req.body)
try {
  // Find the applicant by name
  const applicant = await Applicant.findOne({ Name: name });

  if (!applicant) {
    return res.status(404).json({ error: "Applicant not found" });
  }

  // Update the skills and descriptions
  applicant["Skill 1"] = skill1;
  applicant["Description 1"] = description1;
  applicant["Skill 2"] = skill2;
  applicant["Description 2"] = description2;
  applicant["Skill 3"] = skill3;
  applicant["Description 3"] = description3;

  // Save the updated applicant to the database
  await applicant.save();

 msg="your Skills and descriptions updated successfully and you can update them again by filling this form";
 res.redirect("/");
} catch (error) {
  res.status(500).json({ error: error.message });
}
});



export default router
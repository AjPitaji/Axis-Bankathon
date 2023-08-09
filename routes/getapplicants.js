import express from "express";
import Applicant from "../models/applicant.js";

const router = express.Router();

router.get("/",async(req,res)=>{
      const applicants = await Applicant.find({});

      res.render("applicants",{selected:applicants})
})

export default router;
import express from "express";
import Listing from "../models/listings.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const listings = await Listing.find({});

  res.render("home",{listings:listings});
});

export default router;

import express from "express";
const router = express.Router();

router.get("/",(req,res)=>{
res.render("admin-auth");
})
router.post("/",(req,res)=>{
     const receivedPasscode = req.body.passcode;
     const storedPasscode = process.env.PASSCODE; // Make sure your .env file has a PASSCODE variable
     if (receivedPasscode === storedPasscode) {
       res.redirect("/admin/filter")
     } else {
       res
         .status(401)
         .json({
           success: false,
           message: "Passcode did not match. Access denied!",
         });
     }
});

router.get("/filter",(req,res)=>{
    res.render("admin-filter")
})

export default router;
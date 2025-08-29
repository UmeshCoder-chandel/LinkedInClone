import express from "express";
import cloudinary from "../config/cloudinary.js";
import upload from "../authentication/multer.js";
const router = express.Router();

// POST /api/upload
router.post("/", upload.single("file"), async (req, res) => {
  cloudinary.uploader.upload(req.file.path,(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({ error: "Upload failed" });
    }
    res.status(200).json({
      success:true,
      message:"File uploaded successfully",
      data:result.url

    });
  });
});

export default router;

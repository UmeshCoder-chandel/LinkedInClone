import express from "express";
import cloudinary from "../config/cloudinary.js";
import upload from "../authentication/multer.js";

const router = express.Router();

// POST /api/upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "messages", // optional: keep uploads organized
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: result.secure_url,   // ✅ return as "url"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;

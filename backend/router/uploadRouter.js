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

    // Determine folder based on file type or request
    let folder = "messages"; // default folder
    if (req.file.mimetype.includes('pdf') || req.file.mimetype.includes('doc')) {
      folder = "resumes"; // separate folder for resumes
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folder,
      resource_type: "auto",
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: result.secure_url,
      data: result.secure_url, // Keep backward compatibility
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;

import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
app.use(cors());

// ================= MongoDB =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const FileSchema = new mongoose.Schema({
  url: String,
});

const FileModel = mongoose.model("File", FileSchema);

// ================= Cloudinary =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================= Multer =================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= Route =================
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) return res.status(500).json(error);

        const saved = await FileModel.create({
          url: result.secure_url,
        });

        res.json({ url: saved.url });
      }
    );

    stream.end(file.buffer);

  } catch (err) {
    res.status(500).json(err);
  }
});

// ================= Start Server =================
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
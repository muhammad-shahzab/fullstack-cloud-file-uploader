import File from "../models/File.js";
import { uploadBufferToCloudinary } from "../utils/cloudinaryUpload.js";
import { buildDeliveryUrl, formatCloudinaryFile } from "../utils/formatCloudinaryFile.js";

export async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }

    const cloudinaryResult = await uploadBufferToCloudinary(req.file.buffer, {
      folder: "uploads",
    });

    const cloudinaryData = formatCloudinaryFile(cloudinaryResult);

    const savedFile = await File.create({
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      cloudinary: cloudinaryData,
      deliveryUrl: buildDeliveryUrl({ cloudinary: cloudinaryData }),
    });

    return res.status(201).json({
      message: "File uploaded successfully",
      file: savedFile,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
}

export async function getAllFiles(req, res) {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    return res.status(200).json({
      count: files.length,
      files,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({
      message: "Failed to fetch files",
      error: error.message,
    });
  }
}
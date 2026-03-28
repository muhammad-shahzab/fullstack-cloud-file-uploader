import mongoose from "mongoose";

const CloudinarySchema = new mongoose.Schema(
  {
    assetId: String,
    publicId: String,
    resourceType: String,
    format: String,
    bytes: Number,
    version: Number,
    type: String,
    originalFilename: String,
    secureUrl: String,
    url: String,
    width: Number,
    height: Number,
    pages: Number,
    createdAt: String,
  },
  { _id: false }
);

const FileSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },

    cloudinary: {
      type: CloudinarySchema,
      required: true,
    },

    deliveryUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const File = mongoose.model("File", FileSchema);
export default File;
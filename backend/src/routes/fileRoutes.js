import express from "express";
import { upload } from "../middleware/upload.js";
import { getAllFiles, uploadFile } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getAllFiles);

export default router;
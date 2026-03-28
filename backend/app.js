import express from "express";
import cors from "cors";
import fileRoutes from "./src/routes/fileRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);

app.use(express.json());
app.use("/api/files", fileRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

export default app;
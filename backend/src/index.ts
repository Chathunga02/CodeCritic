import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/api/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok" } });
});

app.listen(PORT);

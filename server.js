import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { detect } from "./lib/detect.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 8787;

app.use(express.json({ limit: "32kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "phishguard", version: "1.0.0" });
});

app.post("/api/scan", async (req, res) => {
  const url = req.body?.url;
  const live = req.body?.live !== false;
  try {
    const result = await detect(url, { live });
    if (!result.ok) return res.status(400).json(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message || "Scan failed." });
  }
});

app.get("/api/scan", async (req, res) => {
  const url = req.query.url;
  try {
    const result = await detect(url, { live: req.query.live !== "0" });
    if (!result.ok) return res.status(400).json(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message || "Scan failed." });
  }
});

app.listen(PORT, () => {
  console.log(`PhishGuard running at http://127.0.0.1:${PORT}`);
});

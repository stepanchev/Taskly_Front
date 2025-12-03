const express = require("express");
const router = express.Router();

// Пример API endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Пример POST endpoint
router.post("/data", (req, res) => {
  const data = req.body;
  res.json({
    message: "Данные получены",
    received: data,
  });
});

module.exports = router;

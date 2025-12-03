import express from "express";
const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Пример API
router.get("/tasks", (req, res) => {
  res.json([
    { id: 1, title: "Изучить Express", done: true },
    { id: 2, title: "Настроить Tailwind", done: false },
    { id: 3, title: "Создать API", done: false },
  ]);
});

export default router;

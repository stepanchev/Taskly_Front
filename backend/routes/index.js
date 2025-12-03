import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Главная страница
router.get("/", (req, res) => {
  res.render("index", {
    title: "Главная",
    message: "Привет, Taskly!",
  });
});

// О нас
router.get("/about", (req, res) => {
  res.render("about", {
    title: "О нас",
    message: "Это Taskly - менеджер задач",
  });
});

export default router;

const express = require("express");
const router = express.Router();
const path = require("path");

// Главная страница
router.get("/", (req, res) => {
  console.log("Рендерим главную страницу");
  res.render("index", {
    title: "Главная страница",
    message: "Добро пожаловать в Taskly!",
  });
});

// Пример другой страницы
router.get("/about", (req, res) => {
  res.render("about", {
    title: "О нас",
    message: "Taskly - ваш менеджер задач",
  });
});

module.exports = router;

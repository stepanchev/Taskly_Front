require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка EJS с правильными путями
app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "../frontend/views"),
  path.join(__dirname, "../frontend/views/partials"),
]);

// Статические файлы
app.use("/css", express.static(path.join(__dirname, "../frontend/public/css")));
app.use("/js", express.static(path.join(__dirname, "../frontend/public/js")));
app.use("/assets", express.static(path.join(__dirname, "../frontend/assets")));

// Или просто все из public
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Маршруты
app.use("/", require("./routes/index"));
app.use("/api", require("./routes/api"));

// Главная страница (добавим напрямую для теста)
app.get("/test", (req, res) => {
  res.render("test", {
    title: "Тестовая страница",
    message: "Всё работает!",
  });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).render("error", {
    title: "404 Not Found",
    message: "Страница не найдена",
  });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error("Ошибка:", err.message);
  res.status(500).render("error", {
    title: "500 Server Error",
    message: "Что-то пошло не так: " + err.message,
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📁 Режим: ${process.env.NODE_ENV}`);
  console.log(`📁 Views path: ${path.join(__dirname, "../frontend/views")}`);
});

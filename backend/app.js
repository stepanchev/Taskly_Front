import "dotenv/config";
import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import expressLayouts from "express-ejs-layouts";

// Для работы с __dirname в ES модулях
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");
app.set("views", path.join(__dirname, "../frontend/views"));

// Статические файлы
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Импорт маршрутов
import indexRoutes from "./routes/index.js";
import apiRoutes from "./routes/api.js";

// Маршруты
app.use("/", indexRoutes);
app.use("/api", apiRoutes);

// Обработка 404
app.use((req, res) => {
  res.status(404).send("404 - Страница не найдена");
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500 - Ошибка сервера");
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});

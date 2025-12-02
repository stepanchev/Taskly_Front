Вот **исправленный файл README.md** — скопируй и замени всё содержимое своего файла:

```markdown
# 🚀 **Taskly Front - Development Guide**

## 🎯 **Для начала работы**

### 📥 **Установка Git**
[![Download Git](https://img.shields.io/badge/Download-Git-2E8B57?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/install/windows)

### ⚙️ **Настройка Git**
```bash
# Установите ваше имя и email
git config --global user.name "Ваше Имя"
git config --global user.email "ваш.email@example.com"

# Проверьте настройки
git config --list
```

---

## 📊 **Основные команды Git**

### 🔍 **Проверка статуса**
```bash
git status
```

### 📁 **Добавление файлов**
```bash
# Все файлы
git add .

# Конкретный файл
git add index.html
```

### 💾 **Создание коммитов**
```bash
# Стандартный коммит
git commit -m "Описание изменений"

# Коммит с подробным описанием
git commit -m "Краткое описание" -m "Подробное описание изменений"
```

---

## 🌿 **Работа с ветками**

### 📋 **Просмотр веток**
```bash
# Список всех веток
git branch

# Список с удаленными ветками
git branch -a
```

### ✨ **Создание и переключение**
```bash
# Создать и перейти в новую ветку
git checkout -b feature/новая-фича

# Переключиться на существующую
git checkout main
```

### 🗑️ **Удаление веток**
```bash
# Удалить локальную ветку
git branch -d feature/старая-ветка

# Удалить удаленную ветку
git push origin --delete feature/старая-ветка
```

---

## 🔄 **Рабочий процесс**

### 🚀 **Клонирование проекта**
```bash
# Клонировать репозиторий
git clone https://github.com/stepanchev/Taskly_Front.git

# Перейти в папку проекта
cd Taskly_Front
```

### 🎯 **Начало работы над задачей**
```bash
# 1. Получить последние изменения
git pull origin main

# 2. Создать ветку для задачи
git checkout -b feature/ваша-задача

# 3. Работать над кодом...
# 4. Добавить изменения
git add .

# 5. Создать коммит
git commit -m "feat: добавлена новая функция"

# 6. Отправить изменения
git push origin feature/ваша-задача
```

### ↩️ **Отмена изменений**
```bash
# Отменить последний коммит (сохраняя изменения)
git reset --soft HEAD~1

# Отменить изменения в файле
git checkout -- filename.js

# Отменить все незакоммиченные изменения
git reset --hard
```

---

## 🎨 **Frontend Stack**

### 🌀 **Tailwind CSS v4.1**
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

```bash
# Установка
npm install -D tailwindcss@latest
npx tailwindcss init
```

```css
/* Использование */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 🎭 **Material UI**
[![Material UI](https://img.shields.io/badge/Material_UI-5.15-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/)

---

## 🐳 **Docker**

### 🚢 **Установка Docker**
[![Docker](https://img.shields.io/badge/Docker-Desktop-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

### 🐋 **Основные команды**
```bash
# Проверка установки
docker --version

# Запуск контейнера
docker run -p 3000:3000 myapp

# Сборка образа
docker build -t taskly-front .

# Просмотр контейнеров
docker ps
```

### 📦 **Docker Compose для разработки**
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src
    environment:
      - NODE_ENV=development
```

---

## 🛠️ **Быстрые команды**

### 📝 **Шпаргалка Git**
```bash
# 📌 Инициализация
git init                            # Новый репозиторий
git clone <url>                     # Клонировать проект

# 📌 Основные операции
git status                          # Статус изменений
git add <file>                      # Добавить файл
git commit -m "message"             # Создать коммит
git push origin <branch>            # Отправить изменения
git pull origin <branch>            # Получить изменения

# 📌 Ветки
git branch                          # Список веток
git checkout -b <name>              # Новая ветка
git merge <branch>                  # Слить ветки
git branch -d <name>                # Удалить ветку
```

<div align="center">
[![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)](https://git-scm.com/)
[![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://docker.com/)
</div>

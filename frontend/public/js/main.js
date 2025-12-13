// Главный JavaScript файл
console.log("Taskly JS загружен");

// Простой пример функциональности
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM готов");

  // Можно добавить любую клиентскую логику
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll(".current-year");

  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
});

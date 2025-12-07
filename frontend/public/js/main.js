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
document.addEventListener('DOMContentLoaded', function() {
    const galleryTrack = document.querySelector('.gallery-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const currentCounter = document.querySelector('.gallery-counter .current');
    const totalCounter = document.querySelector('.gallery-counter .total');
    
    let currentIndex = 0;
    const itemsPerView = 5; // Сколько элементов видно одновременно
    const totalItems = galleryItems.length;
    const maxIndex = totalItems - itemsPerView; // Максимальный индекс для смещения
    
    totalCounter.textContent = totalItems - itemsPerView + 1;
    
    // Функция обновления позиции галереи
    function updateGalleryPosition() {
        // Рассчитываем смещение
        const itemWidth = galleryItems[0].offsetWidth + 20; // width + gap
        const translateValue = currentIndex * itemWidth;
        
        galleryTrack.style.transform = `translateX(-${translateValue}px)`;
        
        // Обновляем счетчик
        currentCounter.textContent = currentIndex + 1;
    }
    
    // Следующий элемент
    nextBtn.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            // Переход к следующему элементу
            currentIndex++;
        } else {
            // Возврат к началу
            currentIndex = 0;
        }
        updateGalleryPosition();
    });
    
    // Предыдущий элемент
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            // Переход к предыдущему элементу
            currentIndex--;
        } else {
            // Переход к последней позиции
            currentIndex = maxIndex;
        }
        updateGalleryPosition();
    });
    
    // Обработка свайпов на мобильных устройствах
    let startX = 0;
    let endX = 0;
    
    galleryTrack.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    galleryTrack.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            // Свайп влево - следующий
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateGalleryPosition();
        } else if (endX - startX > swipeThreshold) {
            // Свайп вправо - предыдущий
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }
            updateGalleryPosition();
        }
    }
    
    // Автоматическая прокрутка
    let autoSlideInterval;
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextBtn.click();
        }, 5000);
    }
    
    // Останавливаем автопрокрутку при наведении
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    galleryContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Адаптация при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateGalleryPosition();
        }, 100);
    });
    
    // Инициализация
    updateGalleryPosition();
    startAutoSlide();
});
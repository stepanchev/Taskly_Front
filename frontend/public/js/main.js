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


     document.addEventListener('DOMContentLoaded', function() {
            const banner = document.querySelector('.banner');
            const bannerSlides = document.querySelectorAll('.banner-slide');
            const prevBtn = document.querySelector('.banner-prev');
            const nextBtn = document.querySelector('.banner-next');
            const bannerDots = document.querySelector('.banner-dots');
            
            let currentBannerSlide = 0;
            let bannerInterval;
            const bannerDelay = 5000; // 5 секунд между автоматической сменой слайдов
            
            // Инициализация баннера
            function initBanner() {
                // Сначала очищаем контейнер с точками
                bannerDots.innerHTML = '';
                
                // Создаем точки-индикаторы - РОВНО СТОЛЬКО, СКОЛЬКО СЛАЙДОВ
                createDots();
                
                // Показываем первый слайд
                goToBannerSlide(0);
                
                // Запускаем автопрокрутку
                startAutoPlay();
                
                // Добавляем обработчики событий
                addEventListeners();
                
                // Выводим информацию для отладки
                console.log(`Всего слайдов: ${bannerSlides.length}`);
            }
            
            // Создание точек-индикаторов (горизонтальных)
            function createDots() {
                // Создаем точки только для каждого слайда
                for (let i = 0; i < bannerSlides.length; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('banner-dot');
                    dot.dataset.slide = i;
                    
                    if (i === 0) dot.classList.add('active');
                    
                    dot.addEventListener('click', () => goToBannerSlide(i));
                    bannerDots.appendChild(dot);
                }
                
                // Выводим информацию для отладки
                console.log(`Создано точек: ${bannerSlides.length}`);
            }
            
            // Переход к конкретному слайду
            function goToBannerSlide(slideIndex) {
                // Зацикливаем баннер
                if (slideIndex < 0) {
                    currentBannerSlide = bannerSlides.length - 1;
                } else if (slideIndex >= bannerSlides.length) {
                    currentBannerSlide = 0;
                } else {
                    currentBannerSlide = slideIndex;
                }
                
                // Перемещаем баннер
                banner.style.transform = `translateX(-${currentBannerSlide * 100}%)`;
                
                // Обновляем активную точку
                updateDots();
                
                // Сбрасываем автопрокрутку
                resetAutoPlay();
            }
            
            // Обновление активной точки
            function updateDots() {
                const dots = document.querySelectorAll('.banner-dot');
                dots.forEach((dot, index) => {
                    if (index === currentBannerSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Следующий слайд
            function nextBannerSlide() {
                goToBannerSlide(currentBannerSlide + 1);
            }
            
            // Предыдущий слайд
            function prevBannerSlide() {
                goToBannerSlide(currentBannerSlide - 1);
            }
            
            // Автопрокрутка
            function startAutoPlay() {
                bannerInterval = setInterval(nextBannerSlide, bannerDelay);
            }
            
            function stopAutoPlay() {
                clearInterval(bannerInterval);
            }
            
            function resetAutoPlay() {
                stopAutoPlay();
                startAutoPlay();
            }
            
            // Добавление обработчиков событий
            function addEventListeners() {
                // Кнопки навигации
                prevBtn.addEventListener('click', prevBannerSlide);
                nextBtn.addEventListener('click', nextBannerSlide);
                
                // Клавиши клавиатуры
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowLeft') prevBannerSlide();
                    if (e.key === 'ArrowRight') nextBannerSlide();
                });
                
                // Пауза при наведении на баннер
                banner.parentElement.addEventListener('mouseenter', stopAutoPlay);
                banner.parentElement.addEventListener('mouseleave', startAutoPlay);
                
                // Касание для мобильных устройств
                let touchStartX = 0;
                let touchEndX = 0;
                
                banner.parentElement.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                    stopAutoPlay();
                });
                
                banner.parentElement.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                 
                    setTimeout(startAutoPlay, 3000);
                });
                
                function handleSwipe() {
                    const swipeThreshold = 50;
                    const diff = touchStartX - touchEndX;
                    
                    if (Math.abs(diff) > swipeThreshold) {
                        if (diff > 0) {
                           
                            nextBannerSlide();
                        } else {
                         
                            prevBannerSlide();
                        }
                    }
                }
            }
            
         
            initBanner();
            
    
            setTimeout(() => {
                bannerDots.style.opacity = '1';
            }, 300);
        });
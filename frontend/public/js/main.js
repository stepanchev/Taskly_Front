document.addEventListener("DOMContentLoaded", function () {
  // 1. Обновление текущего года в футере
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll(".current-year");
  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });

  // 2. Галерея товаров
  const galleryTrack = document.querySelector(".gallery-track");
  if (galleryTrack) {
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const currentCounter = document.querySelector(".gallery-counter .current");
    const totalCounter = document.querySelector(".gallery-counter .total");

    let currentIndex = 0;
    const itemsPerView = 5;
    const totalItems = galleryItems.length;
    const maxIndex = Math.max(0, totalItems - itemsPerView);

    if (totalCounter) {
      totalCounter.textContent = Math.max(1, totalItems - itemsPerView + 1);
    }

    function updateGalleryPosition() {
      if (galleryItems.length > 0) {
        const itemWidth = galleryItems[0].offsetWidth + 20;
        const translateValue = Math.min(currentIndex, maxIndex) * itemWidth;
        galleryTrack.style.transform = `translateX(-${translateValue}px)`;

        if (currentCounter) {
          currentCounter.textContent = Math.min(currentIndex + 1, maxIndex + 1);
        }
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateGalleryPosition();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = maxIndex;
        }
        updateGalleryPosition();
      });
    }

    if (galleryTrack) {
      let startX = 0;
      let endX = 0;

      galleryTrack.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
      });

      galleryTrack.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
      });

      function handleSwipe() {
        const swipeThreshold = 50;

        if (startX - endX > swipeThreshold) {
          if (currentIndex < maxIndex) {
            currentIndex++;
          } else {
            currentIndex = 0;
          }
          updateGalleryPosition();
        } else if (endX - startX > swipeThreshold) {
          if (currentIndex > 0) {
            currentIndex--;
          } else {
            currentIndex = maxIndex;
          }
          updateGalleryPosition();
        }
      }
    }

    let autoSlideInterval;
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        if (nextBtn) nextBtn.click();
      }, 5000);
    }

    const galleryContainer = document.querySelector(".gallery-container");
    if (galleryContainer) {
      galleryContainer.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
      });

      galleryContainer.addEventListener("mouseleave", () => {
        startAutoSlide();
      });
    }

    let resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateGalleryPosition();
      }, 100);
    });

    updateGalleryPosition();
    startAutoSlide();
  }

  // 3. Баннер (слайдер)
  const banner = document.querySelector(".banner");
  if (banner) {
    const bannerSlides = document.querySelectorAll(".banner-slide");
    const prevBtn = document.querySelector(".banner-prev");
    const nextBtn = document.querySelector(".banner-next");
    const bannerDots = document.querySelector(".banner-dots");

    let currentBannerSlide = 0;
    let bannerInterval;
    const bannerDelay = 5000;

    function initBanner() {
      if (!bannerDots) return;

      bannerDots.innerHTML = "";
      createDots();
      goToBannerSlide(0);
      startAutoPlay();
      addEventListeners();
    }

    function createDots() {
      for (let i = 0; i < bannerSlides.length; i++) {
        const dot = document.createElement("div");
        dot.classList.add("banner-dot");
        dot.dataset.slide = i;

        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => goToBannerSlide(i));
        bannerDots.appendChild(dot);
      }
    }

    function goToBannerSlide(slideIndex) {
      if (slideIndex < 0) {
        currentBannerSlide = bannerSlides.length - 1;
      } else if (slideIndex >= bannerSlides.length) {
        currentBannerSlide = 0;
      } else {
        currentBannerSlide = slideIndex;
      }

      banner.style.transform = `translateX(-${currentBannerSlide * 100}%)`;
      updateDots();
      resetAutoPlay();
    }

    function updateDots() {
      const dots = document.querySelectorAll(".banner-dot");
      dots.forEach((dot, index) => {
        if (index === currentBannerSlide) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    function nextBannerSlide() {
      goToBannerSlide(currentBannerSlide + 1);
    }

    function prevBannerSlide() {
      goToBannerSlide(currentBannerSlide - 1);
    }

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

    function addEventListeners() {
      if (prevBtn) prevBtn.addEventListener("click", prevBannerSlide);
      if (nextBtn) nextBtn.addEventListener("click", nextBannerSlide);

      const bannerParent = banner.parentElement;
      if (bannerParent) {
        bannerParent.addEventListener("mouseenter", stopAutoPlay);
        bannerParent.addEventListener("mouseleave", startAutoPlay);

        let touchStartX = 0;
        let touchEndX = 0;

        bannerParent.addEventListener("touchstart", function (e) {
          touchStartX = e.changedTouches[0].screenX;
          stopAutoPlay();
        });

        bannerParent.addEventListener("touchend", function (e) {
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
    }

    initBanner();

    setTimeout(() => {
      if (bannerDots) bannerDots.style.opacity = "1";
    }, 300);
  }

  // 4. Табы в каталоге
  const tabButtons = document.querySelectorAll(".tab-btn");
  if (tabButtons.length > 0) {
    const tabContents = document.querySelectorAll(".tab-content");

    function switchTab(tabId) {
      tabContents.forEach((content) => {
        content.classList.remove("active");
      });

      const activeTab = document.getElementById(tabId);
      if (activeTab) {
        activeTab.classList.add("active");
      }

      tabButtons.forEach((button) => {
        button.classList.remove("active");
        if (button.getAttribute("data-tab") === tabId) {
          button.classList.add("active");
        }
      });
      localStorage.setItem("selectedTab", tabId);
    }

    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");
        switchTab(tabId);
      });
    });

    const savedTab = localStorage.getItem("selectedTab") || "recommended";
    switchTab(savedTab);
  }

  // 5. Добавление товаров в корзину
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  if (addToCartButtons.length > 0) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function addToCartSimple(button) {
      const card = button.closest(".card");
      if (!card) return;

      const productImage = card.querySelector(".product-image img")?.src || "";
      const productName =
        card.querySelector(".product-name")?.textContent.trim() || "Товар";
      const productPrice = card
        .querySelector(".current-price")
        ?.textContent.replace("₽", "")
        .replace(/\s/g, "")
        .trim();

      if (!productPrice || isNaN(parseInt(productPrice))) {
        console.warn("Не удалось получить цену товара");
        return;
      }

      const productId = `${productImage}-${productPrice}`;
      const existingItem = cart.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: parseInt(productPrice),
          image: productImage,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
      showNotification(`✅ ${productName} добавлен в корзину!`);
      console.log(`Добавлен в корзину: ${productName}, цена: ${productPrice}₽`);
    }

    function updateCartDisplay() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const cartCounter = document.querySelector(".cart-counter");
      if (cartCounter) {
        cartCounter.textContent = totalItems;
      }
    }

    function showNotification(message) {
      // Удаляем старые уведомления
      const oldNotifications = document.querySelectorAll(".notification");
      oldNotifications.forEach((notification) => notification.remove());

      const notification = document.createElement("div");
      notification.className = "notification";
      notification.textContent = message;

      // Стили для уведомления
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
      `;

      // Добавляем анимацию
      const style = document.createElement("style");
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = "slideIn 0.3s ease reverse";
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    }

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        addToCartSimple(this);
      });
    });

    updateCartDisplay();
  }

  // 6. Отзывы клиентов (только один раз!)
  const testimonialsSlider = document.querySelector(".testimonials-slider");
  if (testimonialsSlider) {
    const testimonials = [
      {
        name: "Санек",
        date: "12.12.23",
        text: "Отличный сервис! Купил зимнюю резину, сделали шиномонтаж быстро и качественно.",
      },
      {
        name: "Анна Петрова",
        date: "15.11.23",
        text: "Очень довольна обслуживанием. Мастера знают свое дело, цены адекватные, атмосфера приятная.",
      },
      {
        name: "Дмитрий Иванов",
        date: "08.10.23",
        text: "Быстро заменили масло и проверили все системы автомобиля. Рекомендую!",
      },
      {
        name: "Елена Смирнова",
        date: "22.09.23",
        text: "Отличное соотношение цены и качества. Обслуживание на высшем уровне, всегда вежливый персонал.",
      },
      {
        name: "Алексей Кузнецов",
        date: "05.08.23",
        text: "Приехал с проблемой подвески, уехала без нее. Быстро, качественно и по разумной цене.",
      },
      {
        name: "Мария Орлова",
        date: "18.07.23",
        text: "Починили кондиционер за один день. Цена оказалась ниже, чем в других сервисах.",
      },
      {
        name: "Игорь Николаев",
        date: "30.06.23",
        text: "Замена тормозных колодок и дисков. Работа выполнена идеально, никаких шумов после ремонта.",
      },
      {
        name: "Ольга Семенова",
        date: "12.05.23",
        text: "Регулярно обслуживаю свой автомобиль здесь. Всегда честно и без накруток.",
      },
      {
        name: "Владимир Козлов",
        date: "25.04.23",
        text: "Помогли в экстренной ситуации - заменили колесо в дороге. Спасибо за оперативность!",
      },
      {
        name: "Наталья Васнецова",
        date: "08.03.23",
        text: "Купила здесь летнюю резину со скидкой. Установили бесплатно, все быстро и аккуратно.",
      },
      {
        name: "Сергей Морозов",
        date: "20.02.23",
        text: "Полное ТО автомобиля. Проверили все системы, заменили жидкости. Автомобиль как новый!",
      },
      {
        name: "Татьяна Новикова",
        date: "05.01.23",
        text: "Отличный сервисный центр. Всегда можно записаться на удобное время.",
      },
      {
        name: "Павел Григорьев",
        date: "15.12.22",
        text: "Починили электронику после заливки. Спасли от дорогостоящего ремонта у дилера.",
      },
      {
        name: "Юлия Ковалева",
        date: "28.11.22",
        text: "Обслуживаю два автомобиля в этой мастерской. Ни разу не подвели!",
      },
      {
        name: "Артем Белов",
        date: "10.10.22",
        text: "Качественный ремонт ходовой части. После ремонта машина стала ехать как по маслу.",
      },
    ];

    const avatarsColumn = document.querySelector(".avatars-column");
    const currentIndexEl = document.querySelector(".current-index");
    const totalCountEl = document.querySelector(".total-count");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const ctaButton = document.querySelector(".cta-button");

    const VISIBLE_AVATARS = 5;
    let currentIndex = 0;
    let autoSlideInterval;

    function initAvatars() {
      if (!avatarsColumn) return;
      avatarsColumn.innerHTML = "";

      for (let i = 0; i < VISIBLE_AVATARS; i++) {
        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.setAttribute("data-index", i);

        const avatarIcon = document.createElement("span");
        avatarIcon.className = "avatar-icon";
        avatarIcon.textContent = "👤";

        avatar.appendChild(avatarIcon);
        avatarsColumn.appendChild(avatar);

        avatar.addEventListener("click", function () {
          const avatarIndex = parseInt(this.getAttribute("data-index"));
          goToSlide(avatarIndex);
        });
      }

      updateAvatars();
    }

    function initSlides() {
      testimonialsSlider.innerHTML = "";

      testimonials.forEach((testimonial, index) => {
        const slide = document.createElement("div");
        slide.className = `testimonial-slide ${index === 0 ? "active" : ""}`;

        slide.innerHTML = `
          <div class="testimonial-header">
            <div class="testimonial-name">${testimonial.name}</div>
            <div class="testimonial-date">${testimonial.date}</div>
          </div>
          <p class="testimonial-text">${testimonial.text}</p>
        `;

        testimonialsSlider.appendChild(slide);
      });

      if (totalCountEl) {
        totalCountEl.textContent = testimonials.length;
      }
    }

    function updateAvatars() {
      const avatars = document.querySelectorAll(".avatar");
      avatars.forEach((avatar, i) => {
        const testimonialIndex = (currentIndex + i) % testimonials.length;
        avatar.setAttribute("data-index", testimonialIndex);

        avatar.classList.remove("current");
        if (i === 0) {
          avatar.classList.add("current");
        }

        if (window.innerWidth < 768) {
          avatar.classList.add("visible");
        }
      });
    }

    function goToSlide(index) {
      const slides = document.querySelectorAll(".testimonial-slide");
      if (slides.length === 0) return;

      if (slides[currentIndex]) {
        slides[currentIndex].classList.remove("active");
      }

      currentIndex = index % testimonials.length;

      if (slides[currentIndex]) {
        slides[currentIndex].classList.add("active");
      }

      if (currentIndexEl) {
        currentIndexEl.textContent = currentIndex + 1;
      }

      updateAvatars();
      resetAutoSlide();
    }

    function nextSlide() {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      goToSlide(nextIndex);
    }

    function prevSlide() {
      const prevIndex =
        (currentIndex - 1 + testimonials.length) % testimonials.length;
      goToSlide(prevIndex);
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    function initTestimonials() {
      initAvatars();
      initSlides();
      goToSlide(0);
      startAutoSlide();

      if (prevBtn) prevBtn.addEventListener("click", prevSlide);
      if (nextBtn) nextBtn.addEventListener("click", nextSlide);

      if (ctaButton) {
        ctaButton.addEventListener("click", function () {
          alert(
            "Спасибо за желание оставить отзыв! В реальном приложении здесь будет форма для отзыва."
          );
        });
      }

      testimonialsSlider.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
      });

      testimonialsSlider.addEventListener("mouseleave", () => {
        startAutoSlide();
      });

      if (avatarsColumn) {
        avatarsColumn.addEventListener("mouseenter", () => {
          clearInterval(autoSlideInterval);
        });

        avatarsColumn.addEventListener("mouseleave", () => {
          startAutoSlide();
        });
      }
    }

    initTestimonials();

    // Адаптация для мобильных
    window.addEventListener("resize", function () {
      if (window.innerWidth < 768) {
        updateAvatars();
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll(".current-year");

  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const galleryTrack = document.querySelector(".gallery-track");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const currentCounter = document.querySelector(".gallery-counter .current");
  const totalCounter = document.querySelector(".gallery-counter .total");

  let currentIndex = 0;
  const itemsPerView = 5;
  const totalItems = galleryItems.length;
  const maxIndex = totalItems - itemsPerView;

  totalCounter.textContent = totalItems - itemsPerView + 1;

  function updateGalleryPosition() {
    const itemWidth = galleryItems[0].offsetWidth + 20;
    const translateValue = currentIndex * itemWidth;

    galleryTrack.style.transform = `translateX(-${translateValue}px)`;

    currentCounter.textContent = currentIndex + 1;
  }

  nextBtn.addEventListener("click", function () {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateGalleryPosition();
  });

  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex;
    }
    updateGalleryPosition();
  });

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

  let autoSlideInterval;
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      nextBtn.click();
    }, 5000);
  }

  const galleryContainer = document.querySelector(".gallery-container");
  galleryContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  galleryContainer.addEventListener("mouseleave", () => {
    startAutoSlide();
  });

  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateGalleryPosition();
    }, 100);
  });

  // Инициализация
  updateGalleryPosition();
  startAutoSlide();
});

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".banner");
  const bannerSlides = document.querySelectorAll(".banner-slide");
  const prevBtn = document.querySelector(".banner-prev");
  const nextBtn = document.querySelector(".banner-next");
  const bannerDots = document.querySelector(".banner-dots");

  let currentBannerSlide = 0;
  let bannerInterval;
  const bannerDelay = 5000;

  function initBanner() {
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
    // Кнопки навигации
    prevBtn.addEventListener("click", prevBannerSlide);
    nextBtn.addEventListener("click", nextBannerSlide);

    // Пауза
    banner.parentElement.addEventListener("mouseenter", stopAutoPlay);
    banner.parentElement.addEventListener("mouseleave", startAutoPlay);

    let touchStartX = 0;
    let touchEndX = 0;

    banner.parentElement.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    });

    banner.parentElement.addEventListener("touchend", function (e) {
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
    bannerDots.style.opacity = "1";
  }, 300);
});
// катлаог
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
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
});
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

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
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      addToCartSimple(this);
    });
  });

  updateCartDisplay();
});

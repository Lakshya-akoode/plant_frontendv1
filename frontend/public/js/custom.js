document.addEventListener("DOMContentLoaded", function () {
  const headerSticky = document.querySelector("header .header-sticky");
  const mainHeader = document.querySelector("header.main-header");

  if (headerSticky && mainHeader) {
    
    function setHeaderHeight() {
      mainHeader.style.height = headerSticky.offsetHeight + "px";
    }

    // Run initially
    setHeaderHeight();

    // Resize event
    window.addEventListener("resize", setHeaderHeight);

    // Scroll event
    window.addEventListener("scroll", function () {
      const fromTop = window.scrollY;
      setHeaderHeight();

      const headerHeight = headerSticky.offsetHeight;

      // Toggle "hide"
      if (fromTop > headerHeight + 100) {
        headerSticky.classList.add("hide");
      } else {
        headerSticky.classList.remove("hide");
      }

      // Toggle "active"
      if (fromTop > 600) {
        headerSticky.classList.add("active");
      } else {
        headerSticky.classList.remove("active");
      }
    });
  }


/* Hero Slider Layout JS - Moved to React component to prevent conflicts */



  // Home2 Process Slider
  var swiper = new Swiper(".home2-process-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay:10000, // Autoplay duration in milliseconds
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".service-slider-next",
      prevEl: ".service-slider-prev",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      386: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },
  });


});


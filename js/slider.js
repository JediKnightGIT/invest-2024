const swiperText = new Swiper(".villages__text-slider", {
  autoHeight: true,
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  allowTouchMove: false,
});

const swiper = new Swiper(".villages__slider", {
  autoHeight: true,
  loop: true,
  pagination: {
    el: ".villages__pagination",
    clickable: true,
  },
  breakpoints: {
    1150: {
      allowTouchMove: false,
    },
  },
  on: {
    slideChange: function () {
      swiperText.slideTo(this.realIndex);
    },
  },
});

const next = document.querySelector(".villages__arrow.swiper-button-next");
const prev = document.querySelector(".villages__arrow.swiper-button-prev");

document.querySelectorAll(".villages__img").forEach((image) => {
  image.addEventListener("click", () => {
    swiper.slideNext();
    swiperText.slideNext();
  });
});

document.querySelectorAll(".swiper-pagination-bullet").forEach((bullet, i) => {
  bullet.addEventListener("click", () => {
    swiper.slideTo(i);
    swiperText.slideTo(i);
  });
});

next.addEventListener("click", () => {
  swiper.slideNext();
});
prev.addEventListener("click", () => {
  swiper.slidePrev();
});
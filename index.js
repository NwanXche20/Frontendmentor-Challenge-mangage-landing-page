const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const openModal = document.querySelector(".open--modal");
const closeModal = document.querySelector(".close--modal");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelector(".dots");
const arrowRight = document.querySelector(".slider__arrow--right");
const arrowLeft = document.querySelector(".slider__arrow--left");

// navbar display on mobile devices
navToggle.addEventListener("click", () => {
  if (openModal.classList.contains("hidden")) {
    openModal.classList.remove("hidden");
    closeModal.classList.add("hidden");
  } else {
    openModal.classList.add("hidden");
    closeModal.classList.remove("hidden");
  }

  nav.classList.toggle("nav--visible");
});

/////////////////////////////////////////////////
// Slider
let curSlide = 0;
const maxSlide = slides.length;

// Dynamically creating the dots
const createDots = function () {
  slides.forEach(function (s, i) {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class='dot' data-slide='${i}'></button>`
    );
  });
};

// Active state of dot
const activeDot = function (slide) {
  document
    .querySelectorAll(".dot")
    .forEach((d) => d.classList.remove("active"));

  document.querySelector(`.dot[data-slide='${slide}']`).classList.add("active");
};

// Moving slides
const moveToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

// Next slide
const nextSlide = function () {
  if (curSlide == maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  moveToSlide(curSlide);
  activeDot(curSlide);
};

// Previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  moveToSlide(curSlide);
  activeDot(curSlide);
};

// Initial parameters when the browser loads
const init = function () {
  createDots();
  activeDot(0);
  moveToSlide(0);
};
init();

// Event handlers
dots.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const { slide } = e.target.dataset;
    moveToSlide(slide);
    activeDot(slide);
  }
});

arrowRight.addEventListener("click", nextSlide);
arrowLeft.addEventListener("click", prevSlide);

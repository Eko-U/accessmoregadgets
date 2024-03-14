/**
 * STICKY NAVIGATION
 */
const nav = document.querySelector('.navigation');
const navHeight = nav.getBoundingClientRect().height;
const hero = document.querySelector('.hero');

const scrollUpIcon = document.querySelector('.chevron');
console.log(scrollUpIcon);

let options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const obsFunc = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    scrollUpIcon.classList.remove('hidden');
  }

  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
    scrollUpIcon.classList.add('hidden');
  }
};

let observer = new IntersectionObserver(obsFunc, options);
observer.observe(hero); // observing the hero section

/**
 * FAQ DIALOG
 */

const plus = document.querySelectorAll('.faq-plus');
const minus = document.querySelectorAll('.faq-minus');
const faq_result = document.querySelectorAll('.faq-answer');
const faq_question = document.querySelectorAll('.faq-question');
const faq_heading = document.querySelectorAll('.faq-heading');

const faq_container = document.querySelector('.faq-container');

function open() {
  faq_heading[this].style.color = 'var(--color-red-900)';
  faq_question[this].style.border = '3px solid var(--color-red-900)';
  faq_result[this].classList.toggle('hidden');
  minus[this].classList.toggle('hidden');
  plus[this].classList.toggle('hidden');
}

function close() {
  faq_heading[this].style.color = 'var(--color-grey-100)';
  faq_question[this].style.border = '3px solid var(--color-grey-100)';
  faq_result[this].classList.toggle('hidden');
  minus[this].classList.toggle('hidden');
  plus[this].classList.toggle('hidden');
}

plus.forEach((el, i) => el.addEventListener('click', open.bind(i)));
minus.forEach((el, i) => el.addEventListener('click', close.bind(i)));

/****************************
 * SLIDER
 ******************************/

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots');

let curSlide = 0;
let maxSlide = slides.length - 1;

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach((dot) => dot.classList.remove('dots__dot--active'));

  document
    .querySelectorAll('.dots__dot')
    [slide].classList.add('dots__dot--active');
};

const nextSlide = () => {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activeDot(curSlide);
};

const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = slides.length - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activeDot(curSlide);
};

slides.forEach(
  (slide, i) => (slide.style.transform = `translateX(${i * 100}%)`)
);

const goToSlide = (slide) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};

createDots();
activeDot(0);

dotContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dots__dot')) return;
  const slideNumber = e.target.getAttribute('data-slide');

  e.target.addEventListener('click', function () {
    goToSlide(slideNumber);
    activeDot(slideNumber);
  });
});

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

  if (e.key == 'ArrowRight') nextSlide();
  if (e.key == 'ArrowLeft') prevSlide();
});

/**
 * COPYRIGHT YEAR
 */

const copyright = document.querySelector('.copyright-year');
const year = new Date().getFullYear();
copyright.textContent = year;

// smooth scrolling
function smoothScroll(id) {
  if (id === '#') return;

  const targetCoords = document.querySelector(id).getBoundingClientRect();

  console.log(targetCoords);
  const scrollY = window.scrollY;

  window.scrollTo({
    top: targetCoords.top + scrollY - navHeight,
    left: 0,
    behavior: 'smooth',
  });
}

scrollUpIcon.addEventListener('click', function () {
  hero.scrollIntoView({ behavior: 'smooth' });
});

const heroBtn = document.querySelector('.hero-btn');

heroBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const id = heroBtn.getAttribute('href');
  smoothScroll(id);
});

nav.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    e.target.classList.contains('nav') ||
    e.target.classList.contains('nav--logo')
  )
    return;

  if (e.target.classList.contains('nav__list')) {
    const id = e.target.children[0]?.getAttribute('href');
    smoothScroll(id);
  }

  if (e.target.classList.contains('nav__link')) {
    console.log(e.target);
    const id = e.target.getAttribute('href');
    smoothScroll(id);
  }
});

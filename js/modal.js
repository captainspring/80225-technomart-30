////// Slider //////
const slider = document.querySelector('.promo-slider');

if (slider) {
  let slides = slider.querySelectorAll('.promo-slider__slide');
  let slidesNumber = slides.length - 1;
  let firstSlide = slides[0];
  let lastSlide = slides[slidesNumber];

  let bullets = slider.querySelectorAll('.promo-slider__bullet');
  let bulletsNumber = bullets.length - 1;
  let firstBullet = bullets[0];
  let lastBullet = bullets[bulletsNumber];

  const arrowLeft = slider.querySelector('.promo-slider__arrow_left');
  const arrowRight = slider.querySelector('.promo-slider__arrow_right');

  arrowLeft.addEventListener('click', function () {
    for (let i = 0; i < slides.length; i = i + 1) {
      let currentSlide = slides[i];
      let previousSlide = slides[i - 1];

      let currentBullet = bullets[i];
      let previousBullet = bullets[i - 1];

      if (currentSlide.classList.contains('promo-slider__slide_current')) {
        currentSlide.classList.remove('promo-slider__slide_current');
        currentBullet.classList.remove('promo-slider__bullet_current');

        if (!previousSlide) {
          lastSlide.classList.add('promo-slider__slide_current');
          lastBullet.classList.add('promo-slider__bullet_current');
          break
        } else {
          previousSlide.classList.add('promo-slider__slide_current');
          previousBullet.classList.add('promo-slider__bullet_current');
          break
        }
      }
    }
  });

  arrowRight.addEventListener('click', function () {
    for (let i = 0; i < slides.length; i = i + 1) {
      let currentSlide = slides[i];
      let nextSlide = slides[i + 1];

      let currentBullet = bullets[i];
      let nextBullet = bullets[i + 1];

      if (currentSlide.classList.contains('promo-slider__slide_current')) {
        currentSlide.classList.remove('promo-slider__slide_current');
        currentBullet.classList.remove('promo-slider__bullet_current');

        if (!nextSlide) {
          firstSlide.classList.add('promo-slider__slide_current');
          firstBullet.classList.add('promo-slider__bullet_current');
          break
        } else {
          nextSlide.classList.add('promo-slider__slide_current');
          nextBullet.classList.add('promo-slider__bullet_current');
          break
        }
      }
    }
  });

  for (let i = 0; i < bullets.length; i = i + 1) {
    bullets[i].addEventListener('click', function() {
      let clickedBullet = bullets[i];
      let clickedSlide = slides[i];

      let activeBullet = slider.querySelector('.promo-slider__bullet_current');
      let activeSlide = slider.querySelector('.promo-slider__slide_current');

      activeBullet.classList.remove('promo-slider__bullet_current');
      activeSlide.classList.remove('promo-slider__slide_current');
      clickedBullet.classList.add('promo-slider__bullet_current');
      clickedSlide.classList.add('promo-slider__slide_current');
    });
  }
}

////// Feedback popup //////
const feedbackLink = document.querySelector('.office-info .button');
const feedbackPopup = document.querySelector('.modal_feedback');

if (feedbackPopup) {
  const feedbackForm = feedbackPopup.querySelector('.feedback-form');
  const feedbackName = feedbackForm.querySelector('#feedback-name');
  const feedbackEmail = feedbackForm.querySelector('#feedback-email');
  const feedbackText = feedbackForm.querySelector('#feedback-feedback');
  const popupClose = feedbackPopup.querySelector('.modal__close');

  let isStorageSupport = true;
  let storageName = '';
  let storageEmail = '';

  try {
    storageName = localStorage.getItem('name');
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  }

  feedbackLink.addEventListener('click', function(evt) {
    evt.preventDefault();

    feedbackPopup.classList.add('modal_show');

    if (storageName && storageEmail) {
      feedbackName.value = storageName;
      feedbackEmail.value = storageEmail;
      feedbackText.focus();
    } else {
      feedbackName.focus();
    }
  });

  popupClose.addEventListener('click', function (evt) {
    evt.preventDefault();

    feedbackPopup.classList.remove('modal_show');
    feedbackPopup.classList.remove('modal_error');
    feedbackName.classList.remove('modal_error-field');
    feedbackEmail.classList.remove('modal_error-field');
    feedbackText.classList.remove('modal_error-field');
  });

  feedbackForm.addEventListener('submit', function(evt) {
    if (!feedbackName.value || !feedbackEmail.value || !feedbackText.value) {
      evt.preventDefault();

      if (!feedbackName.value) {
        feedbackName.classList.add('modal_error-field');
      }

      if (!feedbackEmail.value) {
        feedbackEmail.classList.add('modal_error-field');
      }

      if (!feedbackText.value) {
        feedbackText.classList.add('modal_error-field');
      }

      feedbackPopup.classList.remove('modal_error');
      feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
      feedbackPopup.classList.add('modal_error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', feedbackName.value);
        localStorage.setItem('email', feedbackEmail.value);
      }

      feedbackName.classList.remove('modal_error-field');
      feedbackEmail.classList.remove('modal_error-field');
      feedbackText.classList.remove('modal_error-field');
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      if (feedbackPopup.classList.contains('modal_show')) {
        evt.preventDefault();
        feedbackPopup.classList.remove('modal_show');
        feedbackPopup.classList.remove('modal_error');
        feedbackName.classList.remove('modal_error-field');
        feedbackEmail.classList.remove('modal_error-field');
        feedbackText.classList.remove('modal_error-field');
      }
    }
  });
}

////// Order popup //////
let buyButtons = document.querySelectorAll('.products-list__buy-button');
const successfulCartPopup = document.querySelector('.modal_successful-cart');

if (buyButtons) {
  const popupClose = successfulCartPopup.querySelector('.modal__close');
  const popupCloseButton = successfulCartPopup.querySelector('.button_no-fill');

  for (buyButton of buyButtons) {
    buyButton.addEventListener('click', function (evt) {
      evt.preventDefault();

      successfulCartPopup.classList.add('modal_show');
    });
  }

  popupClose.addEventListener('click', function (evt) {
    evt.preventDefault();

    successfulCartPopup.classList.remove('modal_show');
  });

  popupCloseButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    successfulCartPopup.classList.remove('modal_show');
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      if (successfulCartPopup.classList.contains('modal_show')) {
        evt.preventDefault();
        successfulCartPopup.classList.remove('modal_show');
      }
    }
  });
}

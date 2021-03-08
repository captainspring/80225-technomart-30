////// Promo-slider //////
const promoSlider = document.querySelector('.promo-slider');

if (promoSlider) {
  let promoSlides = promoSlider.querySelectorAll('.promo-slider__slide');
  let promoSlidesNumber = promoSlides.length - 1;
  let firstSlide = promoSlides[0];
  let lastSlide = promoSlides[promoSlidesNumber];

  let bullets = promoSlider.querySelectorAll('.promo-slider__bullet');
  let bulletsNumber = bullets.length - 1;
  let firstBullet = bullets[0];
  let lastBullet = bullets[bulletsNumber];

  const arrowLeft = promoSlider.querySelector('.promo-slider__arrow_left');
  const arrowRight = promoSlider.querySelector('.promo-slider__arrow_right');

  arrowLeft.addEventListener('click', function () {
    for (let i = 0; i < promoSlides.length; i = i + 1) {
      let currentSlide = promoSlides[i];
      let previousSlide = promoSlides[i - 1];

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
    for (let i = 0; i < promoSlides.length; i = i + 1) {
      let currentSlide = promoSlides[i];
      let nextSlide = promoSlides[i + 1];

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
      let clickedSlide = promoSlides[i];

      let activeBullet = promoSlider.querySelector('.promo-slider__bullet_current');
      let activeSlide = promoSlider.querySelector('.promo-slider__slide_current');

      activeBullet.classList.remove('promo-slider__bullet_current');
      activeSlide.classList.remove('promo-slider__slide_current');
      clickedBullet.classList.add('promo-slider__bullet_current');
      clickedSlide.classList.add('promo-slider__slide_current');
    });
  }
}

////// Services slider //////
const servicesSlider = document.querySelector('.services-slider-tabs');

if (servicesSlider) {
  let tabs = servicesSlider.querySelectorAll('.services-slider-tabs-list__tab');
  let serviceSlides = servicesSlider.querySelectorAll('.services-slider-info-list__item');

  for (let i = 0; i < tabs.length; i = i + 1) {
    tabs[i].addEventListener('click', function () {
      let clickedTab = tabs[i];
      let clickedSlide = serviceSlides[i];

      let activeTab = servicesSlider.querySelector('.services-slider-tabs-list__tab_current');
      let activeSlide = servicesSlider.querySelector('.services-slider-info-list__item_current');

      activeTab.classList.remove('services-slider-tabs-list__tab_current');
      activeSlide.classList.remove('services-slider-info-list__item_current');
      clickedTab.classList.add('services-slider-tabs-list__tab_current');
      clickedSlide.classList.add('services-slider-info-list__item_current');
    });
  }
}

////// Map popup //////
const mapLink = document.querySelector('.office-info__map');
const mapPopup = document.querySelector('.modal_map');

if (mapLink) {
  const mapClose = mapPopup.querySelector('.modal__close')

  mapLink.addEventListener('click', function (evt) {
    evt.preventDefault();

    mapPopup.classList.add('modal_show');
  });

  mapClose.addEventListener('click', function (evt) {
    evt.preventDefault();

    mapPopup.classList.remove('modal_show');
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      if (mapPopup.classList.contains('modal_show')) {
        evt.preventDefault();

        mapPopup.classList.remove('modal_show');
      }
    }
  });
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

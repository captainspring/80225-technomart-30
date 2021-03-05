const feedbackLink = document.querySelector('.office-info .button');
const feedbackPopup = document.querySelector('.modal_feedback');

const popupClose = document.querySelector('.modal__close');

////// Feedback popup //////
const feedbackForm = feedbackPopup.querySelector('.feedback-form');
const feedbackName = feedbackForm.querySelector('#feedback-name');
const feedbackEmail = feedbackForm.querySelector('#feedback-email');
const feedbackText = feedbackForm.querySelector('#feedback-feedback');

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
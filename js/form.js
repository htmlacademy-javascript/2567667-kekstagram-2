import { resetEffects } from './effects-slider.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';
import { initUploadImage } from './upload-image.js';

const form = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const body = document.body;
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const SUCCESS_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
const ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error');

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_DESCRIPTION_LENGTH = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextClass: 'pristine-error',
});

initUploadImage();

// Правила для валидации хэштегов
const INVALID_SYMBOLS_REGEX = /[^a-zA-Z0-9а-яА-ЯёЁ#]/;

const hashtagRules = [
  {
    check: (inputArray) => inputArray.every((item) => item !== '#'),
    error: 'Хэштег не может состоять только из одной решётки',
  },
  {
    check: (inputArray) => inputArray.every((item) => !item.slice(1).includes('#')),
    error: 'Хэштеги разделяются пробелами',
  },
  {
    check: (inputArray) => inputArray.every((item) => item[0] === '#'),
    error: 'Хэштег должен начинаться с символа "#"',
  },
  {
    check: (inputArray) => inputArray.every((item, index, array) => array.indexOf(item) === index),
    error: 'Хэштеги не должны повторяться',
  },
  {
    check: (inputArray) => inputArray.every((item) => item.length <= MAX_SYMBOLS),
    error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решётку`,
  },
  {
    check: (inputArray) => inputArray.length <= MAX_HASHTAGS,
    error: `Нельзя указать больше ${MAX_HASHTAGS} хэштегов`,
  },
  {
    check: (inputArray) => inputArray.every((item) => !INVALID_SYMBOLS_REGEX.test(item.slice(1))),
    error: 'Хэштег не должен содержать спецсимволы, пробелы, эмодзи или знаки пунктуации',
  },
];

// Функция для валидации хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }
  const inputArray = value.trim().toLowerCase().split(/\s+/);
  return hashtagRules.every((rule) => rule.check(inputArray));
};

// Функция для получения текста ошибки
const getHashtagsError = (value) => {
  if (!value.trim()) {
    return '';
  }
  const inputArray = value.trim().toLowerCase().split(/\s+/);
  for (const rule of hashtagRules) {
    if (!rule.check(inputArray)) {
      return rule.error;
    }
  }
  return '';
};

// Правило для валидации комментария
const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;
const getDescriptionError = () =>
  `Длина комментария не может превышать ${MAX_DESCRIPTION_LENGTH} символов.`;

pristine.addValidator(hashtagsInput, validateHashtags, getHashtagsError);
pristine.addValidator(descriptionInput, validateDescription, getDescriptionError);

// Открытие формы
const openEditForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseEditForm);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Закрытие формы
function onCloseEditForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
  pristine.reset();
  resetEffects();
  resetScale();
  closeButton.removeEventListener('click', onCloseEditForm);
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Закрытие формы при нажатии Escape
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    const message = document.querySelector('.success, .error');

    if (message) {
      message.remove();
      document.removeEventListener('keydown', onDocumentKeydown);

      // Проверяем, осталась ли открытой форма
      if (!uploadOverlay.classList.contains('hidden')) {
        document.addEventListener('keydown', onDocumentKeydown);
      }
      return;
    }

    if (
      !hashtagsInput.matches(':focus') &&
      !descriptionInput.matches(':focus')
    ) {
      onCloseEditForm();
    }
  }
}

// Показ сообщений об успехе/ошибке
const showMessage = (template) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const onCloseMessageClick = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onOutsideClick(evt) {
    if (evt.target === message) {
      onCloseMessageClick();
    }
  }

  if (message.querySelector('button')) {
    message.querySelector('button').addEventListener('click', onCloseMessageClick);
  }

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
};

// Обработчик отправки формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    submitButton.disabled = true;
    const formData = new FormData(form);
    sendData(formData)
      .then(() => {
        onCloseEditForm();
        showMessage(SUCCESS_TEMPLATE);
      })
      .catch(() => {
        showMessage(ERROR_TEMPLATE);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
});

form.addEventListener('reset', () => {
  onCloseEditForm();
});

export { openEditForm, showMessage };

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

const COMMENTS_PER_PAGE = 5; // Количество комментариев на один шаг загрузки
let currentComments = [];
let shownComments = 0;

// Копируем шаблон комментария при инициализации
const commentTemplate = socialComments.querySelector('.social__comment').cloneNode(true);

// Функция для генерации комментариев
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach(({ avatar, name, message }) => {
    const commentElement = commentTemplate.cloneNode(true);

    const img = commentElement.querySelector('.social__picture');
    img.src = avatar;
    img.alt = name;

    const text = commentElement.querySelector('.social__text');
    text.textContent = message;

    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);
};

// Функция для показа следующей порции комментариев
const showMoreComments = () => {
  const remainingComments = currentComments.slice(shownComments, shownComments + COMMENTS_PER_PAGE);
  renderComments(remainingComments);
  shownComments += remainingComments.length;

  commentsShownCount.textContent = shownComments;

  if (shownComments >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

// Функция для открытия полноразмерного окна
const openBigPicture = ({ url, likes, description, comments }) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  commentsTotalCount.textContent = comments.length;
  socialCaption.textContent = description;

  // Удаляем старые комментарии и сбрасываем счетчики
  socialComments.innerHTML = ''; // Очистка комментариев
  currentComments = comments;
  shownComments = 0;

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Показываем первую порцию комментариев
  showMoreComments();

  // Добавляем обработчик на кнопку загрузки дополнительных комментариев
  commentsLoader.addEventListener('click', showMoreComments);

  // Обработчики закрытия окна
  const onClose = () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    closeButton.removeEventListener('click', onClose);
    document.removeEventListener('keydown', onEscClose);
    commentsLoader.removeEventListener('click', showMoreComments);
  };

  function onEscClose(evt) {
    if (evt.key === 'Escape') {
      onClose();
    }
  }

  closeButton.addEventListener('click', onClose);
  document.addEventListener('keydown', onEscClose);
};

export { openBigPicture };

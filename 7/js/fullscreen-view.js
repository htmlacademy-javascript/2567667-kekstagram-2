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

// Функция для генерации комментариев
const renderComments = (comments) => {
  const commentTemplate = socialComments.querySelector('.social__comment');
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

  socialComments.replaceChildren(fragment);
};

// Функция для открытия полноразмерного окна
const openBigPicture = ({ url, likes, description, comments }) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  commentsShownCount.textContent = comments.length;
  commentsTotalCount.textContent = comments.length;
  socialCaption.textContent = description;

  renderComments(comments);

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Добавляем обработчики для закрытия
  const onClose = () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    closeButton.removeEventListener('click', onClose);
    document.removeEventListener('keydown', onEscClose);
  };

  const onEscClose = (evt) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  };

  closeButton.addEventListener('click', onClose);
  document.addEventListener('keydown', onEscClose);
};

export { openBigPicture };

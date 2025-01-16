import { generatePhotos } from './data.js';
import { openBigPicture } from './fullscreen-view.js';

const renderImages = () => {
  const photos = generatePhotos();
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, likes, comments } = photo;

    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    // Добавляем обработчик клика для открытия полноразмерного окна
    pictureElement.addEventListener('click', () => {
      openBigPicture(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderImages };

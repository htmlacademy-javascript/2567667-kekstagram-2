import {generatePhotos} from './data.js';

const renderImages = () => {
  const photos = generatePhotos();
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');


  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export {renderImages};

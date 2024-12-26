import {Ranges, PHOTOS_COUNT, DESCRIPTIONS, COMMENTS, NAMES} from './const.js';
import {getRandomInteger, getRandomArrayElement} from './util.js';

const createComment = () => ({
  id: getRandomInteger(Ranges.ID.MIN, Ranges.ID.MAX),
  avatar: img/avatar-${getRandomInteger(Ranges.AVATAR.MIN, Ranges.AVATAR.MAX)}.svg,
  message: Array.from(
    { length: getRandomInteger(Ranges.MESSAGE.MIN, Ranges.MESSAGE.MAX) },
    () => getRandomArrayElement(COMMENTS)
  ).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (id) => ({
  id,
  url: photos/${id}.jpg,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(Ranges.LIKES.MIN, Ranges.LIKES.MAX),
  comments: Array.from(
    { length: getRandomInteger(Ranges.COMMENTS.MIN, Ranges.COMMENTS.MAX) },
    createComment
  ),
});

const generatePhotos = () =>
  Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));

export {createComment, createPhoto, generatePhotos};

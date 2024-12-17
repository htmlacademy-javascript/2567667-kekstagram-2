import {
  MIN_ID_VALUE, MAX_ID_VALUE,
  MIN_AVATAR_VALUE, MAX_AVATAR_VALUE,
  MIN_LIKES, MAX_LIKES,
  MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT,
  MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT,
  PHOTOS_COUNT, DESCRIPTIONS, COMMENTS, NAMES
} from './const.js';

import { getRandomInteger, getRandomArrayElement } from './util.js';

const createComment = () => ({
  id: getRandomInteger(MIN_ID_VALUE, MAX_ID_VALUE),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_VALUE, MAX_AVATAR_VALUE)}.svg`,
  message: Array.from(
    { length: getRandomInteger(MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT) },
    () => getRandomArrayElement(COMMENTS)
  ).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT) },
    createComment
  ),
});

const generatePhotos = () =>
  Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));

export { createComment, createPhoto, generatePhotos };

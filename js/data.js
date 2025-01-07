import { MIN_VALUES, MAX_VALUES, PHOTOS_COUNT, DESCRIPTIONS, COMMENTS, NAMES } from './const.js';
import { getRandomInteger, getRandomArrayElement } from './util.js';

const createComment = () => ({
  id: getRandomInteger(MIN_VALUES.ID, MAX_VALUES.ID),
  avatar: `img/avatar-${getRandomInteger(MIN_VALUES.AVATAR, MAX_VALUES.AVATAR)}.svg`,
  message: Array.from(
    { length: getRandomInteger(MIN_VALUES.MESSAGE, MAX_VALUES.MESSAGE) },
    () => getRandomArrayElement(COMMENTS)
  ).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_VALUES.LIKES, MAX_VALUES.LIKES),
  comments: Array.from(
    { length: getRandomInteger(MIN_VALUES.COMMENTS, MAX_VALUES.COMMENTS) },
    createComment
  ),
});

const generatePhotos = () =>
  Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));

export { generatePhotos };

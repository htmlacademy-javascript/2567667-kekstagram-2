import { renderImages } from './render-images.js';
import { debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const RANDOM_PHOTO_COUNT = 10;
let photos = [];

// Функция рендеринга изображений с учетом фильтра
const applyFilter = (filter) => {
  let filteredPhotos = [...photos];

  switch (filter) {
    case 'random':
      filteredPhotos = [...photos]
        .sort(() => Math.random() - 0.5)
        .slice(0, RANDOM_PHOTO_COUNT);
      break;
    case 'discussed':
      filteredPhotos = [...photos].sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      break;
  }

  renderImages(filteredPhotos);
};

// Устранение дребезга (теперь обновление списка элементов раз в 500 мс)
const debouncedFilter = debounce((filter) => {
  applyFilter(filter);
}, 500);

// Добавляем обработчики событий на фильтры
const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;
  imgFilters.classList.remove('img-filters--inactive'); // Показываем фильтры

  imgFilters.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');

      const filterId = evt.target.id;
      if (filterId === 'filter-default') {
        debouncedFilter('default');
      } else if (filterId === 'filter-random') {
        debouncedFilter('random');
      } else if (filterId === 'filter-discussed') {
        debouncedFilter('discussed');
      }
    }
  });
};

export { initFilters };

import { getData } from './api.js';
import { renderImages, showError } from './render-images.js';
import { initFilters } from './filters.js';
import './form.js';
import './scale.js';
import './effects-slider.js';

getData()
  .then((photos) => {
    renderImages(photos); // Отрисовываем фото по умолчанию
    initFilters(photos); // Запускаем фильтры
  })
  .catch(() => {
    showError();
  });

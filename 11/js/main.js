import { getData } from './api.js';
import { renderImages, showError } from './render-images.js';
import './form.js';
import './scale.js';
import './effects-slider.js';

getData()
  .then((photos) => renderImages(photos))
  .catch(() => {
    showError();
  });

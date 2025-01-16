const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT_SCALE = 100;

// Устанавливаем начальное значение масштаба
let currentScale = DEFAULT_SCALE;
scaleControlValue.value = `${currentScale}%`;

// Функция для обновления масштаба изображения
const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imgPreview.style.transform = `scale(${currentScale / 100})`;
};

// Обработчик для кнопки уменьшения масштаба
scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
});

// Обработчик для кнопки увеличения масштаба
scaleControlBigger.addEventListener('click', () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    updateScale();
  }
});

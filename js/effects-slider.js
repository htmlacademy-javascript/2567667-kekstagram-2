const DEFAULT_EFFECT = 'none';
const EFFECTS = {
  none: {
    filter: null,
    sliderOptions: null,
  },
  chrome: {
    filter: 'grayscale',
    sliderOptions: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    sliderOptions: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    sliderOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    },
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    sliderOptions: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
    },
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    sliderOptions: {
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1,
    },
  },
};

const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

// Текущий выбранный эффект
let currentEffect = DEFAULT_EFFECT;

// Инициализация слайдера
noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

// Обновление изображения при изменении значения слайдера
const updateEffect = () => {
  const effect = EFFECTS[currentEffect];
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;

  if (effect.filter) {
    const unit = effect.unit || ''; // Единицы измерения
    imgPreview.style.filter = `${effect.filter}(${sliderValue}${unit})`;
  } else {
    imgPreview.style.filter = '';
  }
};

// Обработчик переключения эффектов
effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;
  const effect = EFFECTS[currentEffect];

  if (effect.sliderOptions) {
    effectLevelSlider.noUiSlider.updateOptions(effect.sliderOptions);
    effectLevel.classList.remove('hidden');
  } else {
    effectLevel.classList.add('hidden');
    imgPreview.style.filter = '';
  }

  // Сбрасываем слайдер к начальному значению
  effectLevelSlider.noUiSlider.set(effect.sliderOptions?.start || 100);
  updateEffect();
});

// Обновляем эффект при движении слайдера
effectLevelSlider.noUiSlider.on('update', updateEffect);

// Инициализация эффектов по умолчанию
const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  imgPreview.style.filter = '';
  effectLevel.classList.add('hidden');
  effectLevelSlider.noUiSlider.set(100);
};

resetEffects();

export { resetEffects };

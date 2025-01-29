import { openEditForm, showMessage } from './form.js';

const fileInput = document.getElementById('upload-file');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

const FILE_TYPES = /\.(jpg|jpeg|png)$/i; // Улучшенная проверка расширения файла

const onFileInputChange = () => {
  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.test(fileName);

  if (!matches) {
    fileInput.value = ''; // Очищаем input
    showMessage(document.querySelector('#error').content.querySelector('.error'));
    return; // Останавливаем выполнение, если формат неверный
  }

  const fileURL = URL.createObjectURL(file);
  imgPreview.src = fileURL;

  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${fileURL})`;
  });

  openEditForm(); // Открываем форму только если формат верный
};

const initUploadImage = () => {
  fileInput.addEventListener('change', onFileInputChange);
};

export { initUploadImage };

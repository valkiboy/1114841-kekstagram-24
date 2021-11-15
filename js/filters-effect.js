const SCALE_CONTROL_STEP = 25;
const SCALE_CONTROL_MIN = 25;
const SCALE_CONTROL_MAX = 100;

// Константы для изменения масштаба фото

const scaleControlValue = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview img');

// Константы для изменеия эффектов

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let controlValue = scaleControlValue.value;

const getScalePhoto = (value) => {
  if (value >= 100) {
    previewImg.style.transform = 'scale(1.0)';
  } else {
    previewImg.style.transform = `scale(0.${value})`;
  }
};

//Функция увеличения фото

const getBiggerImg = () => {
  if (controlValue < SCALE_CONTROL_MAX) {
    controlValue = controlValue + SCALE_CONTROL_STEP;
    getScalePhoto (controlValue);
    scaleControlValue.value = `${controlValue}%`;
  } else {
    controlValue = SCALE_CONTROL_MAX;
  }
};

// Функция уменьшения фото

const getSmallerImg = () => {
  if (controlValue > SCALE_CONTROL_MIN) {
    controlValue = controlValue - SCALE_CONTROL_STEP;
    getScalePhoto (controlValue);
    scaleControlValue.value = `${controlValue}%`;
  } else {
    controlValue = SCALE_CONTROL_MIN;
  }
};

const onSmallerImg = () => {
  getSmallerImg();
};

const onBiggerImg = () => {
  getBiggerImg();
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
});

const checkSlider = (effect, symbol = '') => {
  effectLevelSlider.noUiSlider.on('update', (value, handle) => {
    effectLevelValue.value = value[handle];
    previewImg.style.filter = `${effect}(${value[handle]}${symbol})`;
  });
};

const getChangePhoto = (item) => {

  if ('effect-none' === item) {
    previewImg.className = 'effects__preview--none';
    previewImg.style.filter = '';
    effectLevelSlider.style.display = 'none';

  }

  if ('effect-chrome' === item) {
    previewImg.className = 'effects__preview--chrome';
    effectLevelSlider.style.display = 'block';

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    checkSlider('grayscale');
  }

  if ('effect-sepia' === item) {
    previewImg.className = 'effects__preview--sepia';
    effectLevelSlider.style.display = 'block';

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    checkSlider('sepia');
  }

  if ('effect-marvin' === item) {
    previewImg.className = 'effects__preview--marvin';
    effectLevelSlider.style.display = 'block';

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    checkSlider('invert', '%');
  }

  if ('effect-phobos' === item) {
    previewImg.className = 'effects__preview--phobos';
    effectLevelSlider.style.display = 'block';

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    checkSlider('blur', 'px');
  }

  if ('effect-heat' === item) {
    previewImg.className = 'effects__preview--heat';
    effectLevelSlider.style.display = 'block';

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    checkSlider('brightness');
  }
};

effectsList.addEventListener('click',(evt) => {
  if (evt.target.closest('.effects__item')) {
    const pictureEffect = evt.target.closest('.effects__item').querySelector('.effects__radio').id;
    getChangePhoto(pictureEffect);
  }
});


const resetPhotoEffect = () => {
  previewImg.style.transform = 'scale(1.0)';
  controlValue = '100';
  previewImg.className = '';
  previewImg.style.filter = '';
};

const getHideSlider = () => {
  effectLevelSlider.style.display = 'none';
  scaleControlValue.value = `${controlValue}%`;
};

export {onSmallerImg, onBiggerImg, resetPhotoEffect, getHideSlider};

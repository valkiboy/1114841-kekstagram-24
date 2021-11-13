// Константы для изменения масштаба фото

const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreviewImg = document.querySelector('.img-upload__preview img');

// Константы для изменеия эффектов

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

const SCALE_CONTROL_STEP = 25;
const SCALE_CONTROL_MIN = 25;
const SCALE_CONTROL_MAX = 100;

let controlValue = scaleControlValue.value;

//Функция увеличения фото

function getBiggerImg () {
  if (controlValue < SCALE_CONTROL_MAX) {
    controlValue = controlValue + SCALE_CONTROL_STEP;
    getScalePhoto (controlValue);
    scaleControlValue.value = `${controlValue}%`;
  } else {
    controlValue = SCALE_CONTROL_MAX;
  }
}

// Функция уменьшения фото

function getSmallerImg () {
  if (controlValue > SCALE_CONTROL_MIN) {
    controlValue = controlValue - SCALE_CONTROL_STEP;
    getScalePhoto (controlValue);
    scaleControlValue.value = `${controlValue}%`;
  } else {
    controlValue = SCALE_CONTROL_MIN;
  }
}

function getScalePhoto (value) {
  if (value >= 100) {
    uploadPreviewImg.style.transform = 'scale(1.0)';
  } else {
    uploadPreviewImg.style.transform = `scale(0.${value})`;
  }
}

function onSmallerImg () {
  getSmallerImg ();
}

function onBiggerImg () {
  getBiggerImg();
}

effectsList.addEventListener('click',(evt) => {
  if (evt.target.closest('.effects__item')) {
    const pictureEffect = evt.target.closest('.effects__item').querySelector('.effects__radio').id;
    getChangePhoto(pictureEffect);
  }
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
});

function checkSlider(effect, symbol = '') {
  sliderElement.noUiSlider.on('update', (value, handle) => {
    effectLevelValue.value = value[handle];
    uploadPreviewImg.style.filter = `${effect}(${value[handle]}${symbol})`;
  });
}

function getChangePhoto (item) {

  if ( 'effect-none' === item ) {
    uploadPreviewImg.className = 'effects__preview--none';
    uploadPreviewImg.style.filter = '';
    sliderElement.style.display = 'none';

  }

  if ( 'effect-chrome' === item ) {
    uploadPreviewImg.className = 'effects__preview--chrome';
    sliderElement.style.display = 'block';

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    checkSlider('grayscale');
  }

  if ( 'effect-sepia' === item ) {
    uploadPreviewImg.className = 'effects__preview--sepia';
    sliderElement.style.display = 'block';

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    checkSlider('sepia');
  }

  if ( 'effect-marvin' === item ) {
    uploadPreviewImg.className = 'effects__preview--marvin';
    sliderElement.style.display = 'block';

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    checkSlider('invert', '%');
  }

  if ( 'effect-phobos' === item ) {
    uploadPreviewImg.className = 'effects__preview--phobos';
    sliderElement.style.display = 'block';

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    checkSlider('blur', 'px');
  }

  if ( 'effect-heat' === item ) {
    uploadPreviewImg.className = 'effects__preview--heat';
    sliderElement.style.display = 'block';

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    checkSlider('brightness');
  }
}

function resetPhotoEffect () {
  uploadPreviewImg.style.transform = 'scale(1.0)';
  controlValue = '100';
  uploadPreviewImg.className = '';
  uploadPreviewImg.style.filter = '';
}

function getHideSlider () {
  sliderElement.style.display = 'none';
  scaleControlValue.value = `${controlValue}%`;
}

export {onSmallerImg, onBiggerImg, resetPhotoEffect, getHideSlider};

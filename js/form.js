import {isEscapeKey, checkMaxStringLength, dataPostSuccess, dataPostError} from './util.js';
import {onBiggerImg, onSmallerImg, resetPhotoEffect, getHideSlider} from './filters-effect.js';
import {sendData} from './api.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_ARRAY_LENGTH = 5;
const REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const preview = imgUploadPreview.querySelector('img');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');

//Функция для поиска дубликата

const hasDuplicates = (data) => (new Set(data)).size !== data.length;

// Функция валидации хештегов

const checkHashtagsValidity = () => {
  textHashtags.value = textHashtags.value.replace(/\s+/g, ' '); //Убираем лишние пробелы
  const hashtagsArray = textHashtags.value.toLowerCase().split(' '); //Переводим строку в нижний регистр и создаем массив разделением строки пробелами

  hashtagsArray.forEach((hashtag) => {
    if (hashtagsArray[0] === '') {
      textHashtags.value = textHashtags.value.trim();
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove('text__hashtags--error');
    } else if (!hashtag.startsWith('#')) {
      textHashtags.setCustomValidity('хеш-тег должен начинаться с решётки #');
      textHashtags.classList.add('text__hashtags--error');
    } else if (hashtag === '#'){
      textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки #');
      textHashtags.classList.add('text__hashtags--error');
    } else if (hashtag.length > MAX_HASHTAG_LENGTH){
      textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку #');
      textHashtags.classList.add('text__hashtags--error');
    } else if (!REGEX.test(hashtag)){
      textHashtags.setCustomValidity('хеш-тег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
      textHashtags.classList.add('text__hashtags--error');
    } else if (hashtagsArray.length > MAX_HASHTAG_ARRAY_LENGTH){
      textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      textHashtags.classList.add('text__hashtags--error');
    } else if (hasDuplicates(hashtagsArray)){
      textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      textHashtags.classList.add('text__hashtags--error');
    } else {
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove('text__hashtags--error');
    }
  });

  textHashtags.reportValidity();
};

// Функция валидации комментариев

const checkDescriptionValidity = () => {

  if (!checkMaxStringLength(textDescription.value, MAX_COMMENT_LENGTH)) {
    textDescription.setCustomValidity('длина комментария не может составлять больше 140 символов');
    textDescription.classList.add('text__description--error');
  } else {
    textDescription.setCustomValidity('');
    textDescription.classList.remove('text__description--error');
  }
  textDescription.reportValidity();
};

textHashtags.addEventListener('input', checkHashtagsValidity);
textDescription.addEventListener('input', checkDescriptionValidity);

//Функция не дающая закрыть редактор фото при фокусе на хештегах и комментариях

const onPhotoEditingEscKeydown = (evt) => {
  if (!evt.target.closest('.img-upload__text') && (isEscapeKey(evt))) {
    evt.preventDefault();
    closePhotoEditing();
  }
};

const onUploadCancelClick = () => {
  closePhotoEditing();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  sendData(
    () => dataPostSuccess(),
    () => dataPostError(),
    new FormData(evt.target),
  );
};

//Функция открытия редактора фото

const openPhotoEditing = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',onPhotoEditingEscKeydown);
  imgUploadCancel.addEventListener('click', onUploadCancelClick);
  controlBigger.addEventListener('click', onBiggerImg);
  controlSmaller.addEventListener('click', onSmallerImg);
  imgUploadForm.addEventListener('submit', onFormSubmit);
  getHideSlider();
};

//Функция закрытия редактора фото. Объявлена декларативно что бы не было конфликта.

function closePhotoEditing  ()  {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadForm.reset();
  imgUploadInput.value = '';
  textHashtags.value = '';
  textDescription.value = '';
  document.removeEventListener('keydown',onPhotoEditingEscKeydown);
  imgUploadCancel.removeEventListener('click', onUploadCancelClick);
  controlBigger.removeEventListener('click', onBiggerImg);
  controlSmaller.removeEventListener('click', onSmallerImg);
  imgUploadForm.removeEventListener('submit', onFormSubmit);
  resetPhotoEffect();
}

imgUploadInput.addEventListener('change',() => {
  openPhotoEditing();
  const file = imgUploadInput.files[0];
  preview.src = URL.createObjectURL(file);
});

export {closePhotoEditing};

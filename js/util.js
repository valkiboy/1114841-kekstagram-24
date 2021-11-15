import {closePhotoEditing} from './form.js';

const ALERT_SHOW_TIME = 5000;

const successPopup = document.querySelector('#success');
const errorPopup = document.querySelector('#error');
const body = document.querySelector('body');

const getRandomIntInclusive = (min, max) => {

  if (min >= max || min < 0 || max < 0) {
    return false;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const checkMaxStringLength = (verifiedString, maxLine) => {

  if (verifiedString.length <= maxLine) {
    return true;
  }

  return false;
};

const isEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    return true;
  }
};

const showAlert = (message) => {
  const errorNotification = document.createElement('div');
  errorNotification.style.zIndex = '100';
  errorNotification.style.position = 'absolute';
  errorNotification.style.left = '0';
  errorNotification.style.top = '0';
  errorNotification.style.right = '0';
  errorNotification.style.padding = '10px 3px';
  errorNotification.style.fontSize = '30px';
  errorNotification.style.textAlign = 'center';
  errorNotification.style.backgroundColor = 'red';

  errorNotification.textContent = message;

  document.body.append(errorNotification);

  setTimeout(() => {
    errorNotification.remove();
  }, ALERT_SHOW_TIME);
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelector('.success').remove();
  }
};

const onSuccessPopupClose = (evt) => {
  if (!evt.target.closest('.success__inner') || evt.target.getAttribute('type') === 'button') {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessEscKeydown);
  }
};

const dataPostSuccess = () => {
  const templateItem = successPopup.content.cloneNode(true);
  body.append(templateItem);
  document.querySelector('.success').addEventListener('click', onSuccessPopupClose);
  document.addEventListener('keydown', onSuccessEscKeydown);
  closePhotoEditing();
};

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelector('.error').remove();
  }
};

const onErrorPopupClose = (evt) => {
  if (!evt.target.closest('.error__inner') || evt.target.getAttribute('type') === 'button') {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
  }
};

const dataPostError = () => {
  const templateItem = errorPopup.content.cloneNode(true);
  body.append(templateItem);
  document.querySelector('.error').addEventListener('click', onErrorPopupClose);
  document.addEventListener('keydown', onErrorEscKeydown);
  closePhotoEditing();
};

const shuffle = (items) => {
  let currentIndex = items.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = items[currentIndex];
    items[currentIndex] = items[randomIndex];
    items[randomIndex] = temporaryValue;
  }

  return items;
};

const erasePhotos = () => {
  const pictureElem = document.querySelectorAll('.picture');
  pictureElem.forEach((elem) => {
    elem.remove();
  });
};

const getSort = (a, b) => {
  a = a.comments.length;
  b = b.comments.length;
  return b-a;
};

export {getRandomIntInclusive, isEscapeKey, checkMaxStringLength, showAlert, dataPostSuccess, dataPostError, shuffle, erasePhotos, getSort};

import {closePhotoEditing} from './form.js';

const ALERT_SHOW_TIME = 5000;

const successPopup = document.querySelector('#success');
const errorPopup = document.querySelector('#error');
const body = document.querySelector('body');

function getRandomIntInclusive(min, max) {

  if (min >= max || min < 0 || max < 0) {
    return false;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function checkMaxStringLength(verifiedString, maxLine) {

  if (verifiedString.length <= maxLine) {
    return true;
  }

  return false;
}

function isEscapeKey (evt) {
  if (evt.key === 'Escape') {
    return true;
  }
}

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

function onSuccessEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelector('.success').remove();
  }
}

function onSuccessPopupClose(evt) {
  if (!evt.target.closest('.success__inner') || evt.target.getAttribute('type') === 'button') {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessEscKeydown);
  }
}

function dataPostSuccess() {
  const templateItem = successPopup.content.cloneNode(true);
  body.append(templateItem);
  document.querySelector('.success').addEventListener('click', onSuccessPopupClose);
  document.addEventListener('keydown', onSuccessEscKeydown);
  closePhotoEditing();
}

function onErrorEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelector('.error').remove();
  }
}

function onErrorPopupClose(evt) {
  if (!evt.target.closest('.error__inner') || evt.target.getAttribute('type') === 'button') {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
  }
}

function dataPostError() {
  const templateItem = errorPopup.content.cloneNode(true);
  body.append(templateItem);
  document.querySelector('.error').addEventListener('click', onErrorPopupClose);
  document.addEventListener('keydown', onErrorEscKeydown);
  closePhotoEditing();
}

function shuffle(items) {
  let currentIndex = items.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = items[currentIndex];
    items[currentIndex] = items[randomIndex];
    items[randomIndex] = temporaryValue;
  }

  return items;
}

function erasePhotos () {
  const pictureElem = document.querySelectorAll('.picture');
  pictureElem.forEach((elem) => {
    elem.remove();
  });
}

function getSort (a, b) {
  a = a.comments.length;
  b = b.comments.length;
  return b-a;
}

export {getRandomIntInclusive, isEscapeKey, checkMaxStringLength, showAlert, dataPostSuccess, dataPostError, shuffle, erasePhotos, getSort};

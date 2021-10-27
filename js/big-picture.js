import {userPosts} from './data.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const createBigPicture = userPosts;
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

//Функция добавляет ЭвентЛисенер для закрытия полноразмерного фото при нажатии клавиши ESCAPE

function onBigPictureEscKeydown() {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      socialCommentCount.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      closeBigPictureModal ();
    }
  });
}

//Функция добавляет ЭвентЛисенер для закрытия полноразмерного фото при нажатии на кнопк закрытия (крестик)

function onCloseButtonClick () {
  bigPictureCancel.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    socialCommentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    closeBigPictureModal ();
  });
}

//Функция открытия полноразмерного фото и навешивания ЭвентЛисенеров для кнопки закрытия и ESCAPE

function openBigPictureModal () {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown',onBigPictureEscKeydown);
  bigPictureCancel.addEventListener('click',onCloseButtonClick);
  document.body.classList.add('modal-open');
}

//Функция создания определенного большого фото по ID

function getBigPicture (item) {
  createBigPicture.forEach(({id, url, comments, likes, description}) => {
    if ( id === item) {
      bigPicture.querySelector('.big-picture__img').src = url;
      bigPicture.querySelector('.likes-count').textContent = likes;
      bigPicture.querySelector('.comments-count').textContent = comments.length;
      bigPicture.querySelector('.social__caption').textContent = description;
      openBigPictureModal ();
    }
  });
}

//Функция закрытия полноразмерного фото и удаления ЭвентЛисенеров для кнопки закрытия и ESCAPE

function closeBigPictureModal () {
  document.removeEventListener('keydown',onBigPictureEscKeydown);
  bigPictureCancel.removeEventListener('click',onCloseButtonClick);
}

export {getBigPicture};

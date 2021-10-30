import {userPosts} from './data.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const createBigPicture = userPosts;
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

//Функция для закрытия полноразмерного фото при нажатии клавиши ESCAPE

function onBigPictureEscKeydown(evt)  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal ();
  }
}

//Функция  для закрытия полноразмерного фото при нажатии на кнопк закрытия (крестик)

function onCloseButtonClick () {
  closeBigPictureModal ();
}

//Функция открытия полноразмерного фото и добавления ЭвентЛисенеров для кнопки закрытия и ESCAPE

function openBigPictureModal () {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',onBigPictureEscKeydown);
  bigPictureCancel.addEventListener('click',onCloseButtonClick);
}

//Функция закрытия полноразмерного фото и удаления ЭвентЛисенеров для кнопки закрытия и ESCAPE

function closeBigPictureModal () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown',onBigPictureEscKeydown);
  bigPictureCancel.removeEventListener('click',onCloseButtonClick);
}

//Функция создания определенного большого фото по ID

function getBigPicture (item) {
  createBigPicture.forEach(({url, comments, likes, description}) => {
    if ( url === item) {
      bigPicture.querySelector('.big-picture__img').src = url;
      bigPicture.querySelector('.likes-count').textContent = likes;
      bigPicture.querySelector('.comments-count').textContent = comments.length;
      bigPicture.querySelector('.social__caption').textContent = description;
      openBigPictureModal ();
      // console.log(item);
    }
  });
}


export {getBigPicture};

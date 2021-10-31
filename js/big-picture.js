import {userPosts} from './data.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const createBigPicture = userPosts;
const bigPictureCancel = document.querySelector('.big-picture__cancel');
// const socialComments = bigPicture.querySelector('.social__comments');
// const socialComment = bigPicture.querySelector('.social__comment');
// const socialCommentCount = bigPicture.querySelector('.social__comment-count');
// const commentsLoader = bigPicture.querySelector('.comments-loader');
// const commentLoaderButton = document.querySelector('.social__comments-loader');

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
  // socialCommentCount.classList.add('hidden');
  // commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',onBigPictureEscKeydown);
  bigPictureCancel.addEventListener('click',onCloseButtonClick);
}

//Функция закрытия полноразмерного фото и удаления ЭвентЛисенеров для кнопки закрытия и ESCAPE

function closeBigPictureModal () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // socialCommentCount.classList.remove('hidden');
  // commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown',onBigPictureEscKeydown);
  bigPictureCancel.removeEventListener('click',onCloseButtonClick);
}

//Функция создания определенного большого фото по ID

function getBigPicture (item) {
  createBigPicture.forEach(({url, comments, likes, description}) => {
    if ( url === item) {
      bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
      bigPicture.querySelector('.likes-count').textContent = likes;
      bigPicture.querySelector('.comments-count').textContent = comments.length;
      bigPicture.querySelector('.social__caption').textContent = description;

      // const socialCommentFragment = document.createDocumentFragment();
      // for (let i =0; i < 5; i++) {
      //   const copySocialComment = socialComment.cloneNode(true);

      //   copySocialComment.querySelector('.social__picture').src = comments.avatar;
      //   copySocialComment.querySelector('.social__picture').alt = comments.name;
      //   copySocialComment.querySelector('.social__text').textContent = comments.message;
      //   socialCommentFragment.appendChild(copySocialComment);
      // }
      openBigPictureModal ();
      // socialComments.appendChild(socialCommentFragment);
      // console.log(item);
      // console.log(item);
    }
  });
}


//   socialComments.appendChild(socialCommentFragment);
// const socialCommentFragment = document.createDocumentFragment();
// // function showComments () {
// const copySocialComment = socialComment.cloneNode(true);
//   copySocialComment.querySelector('.social__picture').src = createBigPicture[comment.avatar];
//   copySocialComment.querySelector('.social__picture').alt = name;
//   copySocialComment.querySelector('.social__text').textContent = message;
//   socialCommentFragment.appendChild(copySocialComment);

//   socialComments.appendChild(socialCommentFragment);
// }
export {getBigPicture};

// createBigPicture.forEach(({url, comments, likes}) => {
//   const copySocialComment = socialComment.cloneNode(true);
//   copySocialComment.querySelector('.social__picture').src = comments.avatar;
//   copySocialComment.querySelector('.social__text').textContent = comments.message;
//   socialComments.appendChild(copySocialComment);

// console.log(copySocialComment)

// Все комментарии к изображению выводятся в блок .social__comments.
// Сразу после открытия изображения в полноэкранном режиме отображается не более 5 комментариев.
// Количество показанных комментариев и общее число комментариев отображается в блоке .social__comment-count.
// Пример разметки списка комментариев приведён в блоке .social__comments.
// Комментарий оформляется отдельным элементом списка li с классом social__comment.
// Аватарка автора комментария отображается в блоке .social__picture.
// Имя автора комментария отображается в атрибуте alt его аватарки.
// Текст комментария выводится в блоке .social__text.

// Отображение дополнительных комментариев происходит при нажатии на кнопку .comments-loader.
// При нажатии на кнопку отображается не более 5 новых комментариев.
// При изменении количества показанных комментариев число показанных комментариев в блоке .social__comment-count также изменяется.

// Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.

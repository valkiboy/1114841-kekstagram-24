import {userPosts} from './data.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const createBigPicture = userPosts;
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const commentCurrentCount = bigPicture.querySelector('.comments-current-count');
const commentLoaderButton = bigPicture.querySelector('.social__comments-loader');
const COMMENT_ON_PAGE = 5;

function getBigPicture (item) {

  let pageNum = 0;
  let postData;

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
    document.body.classList.add('modal-open');
    document.addEventListener('keydown',onBigPictureEscKeydown);
    bigPictureCancel.addEventListener('click',onCloseButtonClick);
  }

  //Функция создания списка комментариев

  function showComments(commentsList) {
    const commentsFragment = document.createDocumentFragment();
    commentsList.forEach((currentComment) => {
      const socialCommentCopy = socialComment.cloneNode(true);
      socialCommentCopy.querySelector('.social__picture').src = currentComment.avatar;
      socialCommentCopy.querySelector('.social__picture').alt = currentComment.name;
      socialCommentCopy.querySelector('.social__text').textContent = currentComment.message;
      commentsFragment.appendChild(socialCommentCopy);
    });
    socialComments.appendChild(commentsFragment);

    //Показывает текущее количество комментариев

    const socialCommentsItems = bigPicture.querySelectorAll('.social__comment');
    commentCurrentCount.textContent = socialCommentsItems.length;
    if (socialCommentsItems.length >= postData.comments.length) {
      commentLoaderButton.classList.add('hidden');
    } else {
      commentLoaderButton.classList.remove('hidden');
    }
  }

  //Функция показа определенного количества комментариев (по 5 штук)

  function getComments() {
    const start = pageNum * COMMENT_ON_PAGE;
    const end = start + COMMENT_ON_PAGE;
    const commentsList = postData.comments.slice(start, end);
    showComments(commentsList);
  }

  // Функция показывает следующие 5 комментариев

  function onGetNewComments() {
    pageNum++;
    getComments();
  }

  //Функция закрытия полноразмерного фото и удаления ЭвентЛисенеров для кнопки закрытия и ESCAPE

  function closeBigPictureModal () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown',onBigPictureEscKeydown);
    bigPictureCancel.removeEventListener('click',onCloseButtonClick);
    commentLoaderButton.removeEventListener('click', onGetNewComments);
    pageNum = 0;
    postData = '';
  }

  //Функция создания определенного большого фото по src

  createBigPicture.forEach((post) => {
    if ( post.url === item) {
      bigPictureImg.querySelector('img').src = post.url;
      likesCount.textContent = post.likes;
      commentsCount.textContent = post.comments.length;
      socialCaption.textContent = post.description;
      socialComments.innerHTML = '';
      postData = post;

      commentLoaderButton.addEventListener('click', onGetNewComments);
      getComments ();
      openBigPictureModal ();
    }
  });


}

export {getBigPicture};

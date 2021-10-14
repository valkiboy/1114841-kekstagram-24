import {userPosts} from './data.js';

const templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictures = document.querySelector('.pictures');
const createMiniPicture = userPosts;

const miniPictureFragment = document.createDocumentFragment();

createMiniPicture.forEach(({url, comments, likes}) => {
  const copyPictureTemplate = templatePicture.cloneNode(true);
  copyPictureTemplate.querySelector('.picture__img').src = url;
  copyPictureTemplate.querySelector('.picture__comments').textContent = comments;
  copyPictureTemplate.querySelector('.picture__likes').textContent = likes;
  miniPictureFragment.appendChild(copyPictureTemplate);
});

pictures.appendChild(miniPictureFragment);

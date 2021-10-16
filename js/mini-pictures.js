import {userPosts} from './data.js';
import {getBigPicture} from './big-picture.js';

const templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const miniPictures = document.querySelector('.pictures');
const createMiniPicture = userPosts;

const miniPictureFragment = document.createDocumentFragment();

createMiniPicture.forEach(({url, comments, likes}) => {
  const copyPictureTemplate = templatePicture.cloneNode(true);
  copyPictureTemplate.querySelector('.picture__img').src = url;
  copyPictureTemplate.querySelector('.picture__comments').textContent = comments.length;
  copyPictureTemplate.querySelector('.picture__likes').textContent = likes;
  miniPictureFragment.appendChild(copyPictureTemplate);

  copyPictureTemplate.addEventListener('click',() => {
    getBigPicture ();
  });
});

miniPictures.appendChild(miniPictureFragment);



import {userPosts} from './data.js';
import {getBigPicture} from './big-picture.js';

const templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const miniPictures = document.querySelector('.pictures');
const createMiniPicture = userPosts;

const miniPictureFragment = document.createDocumentFragment();

// Создаю галерею из маленьких фото и жду клика для пересылания ID кликнутой фото в функцию
// для открытия полноразмерного фото

createMiniPicture.forEach(({id, url, comments, likes}) => {
  const copyPictureTemplate = templatePicture.cloneNode(true);
  copyPictureTemplate.querySelector('.picture__img').src = url;
  copyPictureTemplate.querySelector('.picture__comments').textContent = comments.length;
  copyPictureTemplate.querySelector('.picture__likes').textContent = likes;
  miniPictureFragment.appendChild(copyPictureTemplate);

  copyPictureTemplate.addEventListener('click',() => {
    getBigPicture (id);
  });
//   miniPictures.addEventListener('click', (evt) =>{
//     if (evt.target.closest('.picture')) {
//       evt.preventDefault();
//       getBigPicture(createMiniPicture[evt.target.closest('.picture').querySelector('.picture__img')]);
//     }
//   });
});

miniPictures.appendChild(miniPictureFragment);

export {createMiniPicture};

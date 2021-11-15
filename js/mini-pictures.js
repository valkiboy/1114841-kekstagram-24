import {getBigPicture} from './big-picture.js';

const templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const miniPictures = document.querySelector('.pictures');

// Создаю галерею из маленьких фото и жду клика для пересылания url кликнутой фото в функцию
// для открытия полноразмерного фото

const getMiniPictures = (data) => {

  const miniPictureFragment = document.createDocumentFragment();

  data.forEach(({url, comments, likes}) => {
    const copyPictureTemplate = templatePicture.cloneNode(true);
    copyPictureTemplate.querySelector('.picture__img').src = url;
    copyPictureTemplate.querySelector('.picture__comments').textContent = comments.length;
    copyPictureTemplate.querySelector('.picture__likes').textContent = likes;
    miniPictureFragment.appendChild(copyPictureTemplate);

    copyPictureTemplate.addEventListener('click',(evt) => {
      if (evt.target.closest('.picture')) {
        evt.preventDefault();
        const pictureImg = evt.target.closest('.picture').querySelector('.picture__img').src = url;
        getBigPicture (pictureImg, data);
      }
    });
  });
  miniPictures.appendChild(miniPictureFragment);
};

export {getMiniPictures};

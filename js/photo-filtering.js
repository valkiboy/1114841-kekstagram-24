import {getData} from './api.js';
import {getMiniPictures} from './mini-pictures.js';
// import {debounce} from './utils/debounce.js';   раскоментить

const imgFilters = document.querySelector('.img-filters');
const MAX_RANDOM_PHOTO = 10;
const filterDefault = document.getElementById('filter-default');
const filterRandom = document.getElementById('filter-random');
const filterDiscussed = document.getElementById('filter-discussed');
// const RERENDER_DELAY = 500;  раскоментить

getData (getPhotoFiltering);

function getPhotoFiltering (data) {

  imgFilters.classList.remove('img-filters--inactive');
  getData(getMiniPictures);

  function erasePhotos () {
    const pictureElem = document.querySelectorAll('.picture');
    pictureElem.forEach((elem) => {
      elem.remove();
    });
  }

  // Этот код раскоментить

  // function getDefault() {
  //   console.log('я работаю');
  //   erasePhotos ();
  //   getData(getMiniPictures);
  // }

  // function onDefault () {
  //   filterDefault.classList.add('img-filters__button--active');
  //   filterRandom.classList.remove('img-filters__button--active');
  //   filterDiscussed.classList.remove('img-filters__button--active');
  //   debounce(getDefault, RERENDER_DELAY);
  // }

  // Эту функцию закоментить

  function getDefault() {
    erasePhotos ();
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    getData(getMiniPictures);
  }

  // Вот до это строки коментить

  function getRandom () {
    erasePhotos ();
    function shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    data = shuffle(data);
    data = data.slice(0, MAX_RANDOM_PHOTO);
    getMiniPictures(data);
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  }


  function getSort (a, b) {
    a = a.comments.length;
    b = b.comments.length;
    return b-a;
  }

  function getDiscussed () {
    erasePhotos ();
    data.sort(getSort);
    getMiniPictures(data);
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
  }

  // Этот лисенер раскоментить

  // filterDefault.addEventListener('click',onDefault);

  // А этот закоментить

  filterDefault.addEventListener('click', getDefault);


  filterRandom.addEventListener('click',getRandom);
  filterDiscussed.addEventListener('click',getDiscussed);
}

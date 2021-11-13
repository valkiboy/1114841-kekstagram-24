import {getData} from './api.js';
import {getMiniPictures} from './mini-pictures.js';
import {debounce} from './utils/debounce.js';

const imgFilters = document.querySelector('.img-filters');
const MAX_RANDOM_PHOTO = 10;
const filterDefault = document.getElementById('filter-default');
const filterRandom = document.getElementById('filter-random');
const filterDiscussed = document.getElementById('filter-discussed');
let newData;

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

  function onDefault () {
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    erasePhotos ();
    getData(getMiniPictures);
  }


  function onRandom () {
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

    newData = shuffle(data);
    newData = newData.slice(0, MAX_RANDOM_PHOTO);
    getMiniPictures(newData);
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  }


  function getSort (a, b) {
    a = a.comments.length;
    b = b.comments.length;
    return b-a;
  }

  function onDiscussed () {
    erasePhotos ();
    data.sort(getSort);
    getMiniPictures(data);
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
  }

  filterDefault.addEventListener('click', debounce(onDefault));
  filterRandom.addEventListener('click',debounce(onRandom));
  filterDiscussed.addEventListener('click',debounce(onDiscussed));
}

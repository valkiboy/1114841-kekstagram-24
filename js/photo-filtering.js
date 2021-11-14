import {getData} from './api.js';
import {getMiniPictures} from './mini-pictures.js';
import {debounce} from './utils/debounce.js';
import {shuffle, erasePhotos, getSort} from './util.js';

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

  function getDefault () {
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    erasePhotos ();
    getData(getMiniPictures);
  }

  function onDefault () {
    getDefault ();
  }

  function getRandom () {
    erasePhotos ();
    newData = shuffle(data);
    newData = newData.slice(0, MAX_RANDOM_PHOTO);
    getMiniPictures(newData);
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  }

  function onRandom () {
    getRandom ();
  }

  function getDiscussed () {
    erasePhotos ();
    data.sort(getSort);
    getMiniPictures(data);
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
  }

  function onDiscussed () {
    getDiscussed ();
  }

  filterDefault.addEventListener('click', debounce(onDefault));
  filterRandom.addEventListener('click',debounce(onRandom));
  filterDiscussed.addEventListener('click',debounce(onDiscussed));
}

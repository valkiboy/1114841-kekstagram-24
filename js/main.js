// Пример функции взял с сайта mdn https://developer.mozilla.org/ru

function getRandomIntInclusive(min, max) {

  if (min >= max || min < 0 || max < 0) {
    return false;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

getRandomIntInclusive(0, 83);


const MAX_LINE = 140;

function checkMaxStringLength(verifiedString) {

  if (verifiedString <= MAX_LINE) {
    return true;
  }

  return false;
}

checkMaxStringLength(25);

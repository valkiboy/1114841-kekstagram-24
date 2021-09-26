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


function checkMaxStringLength(verifiedString, maxLine) {

  if (verifiedString.length <= maxLine) {
    return true;
  }

  return false;
}

checkMaxStringLength('moyastroka', 100);

import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Не удалось загрузить фото. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      showAlert('Не удалось загрузить фото. Попробуйте ещё раз');
    })
    .then((data) => {
      onSuccess(data);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};

import {showAlert} from './util.js';

function getData(onSuccess) {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        showAlert('Не удалось загрузить фото. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      showAlert('Не удалось отправить форму. Попробуйте ещё раз');
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
}

function sendData(onSuccess, onError, body) {
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
}

export {getData, sendData};

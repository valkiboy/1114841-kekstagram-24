import {isEscapeKey} from './util.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
//const textHashtagsValue = textHashtags.value; безполезная штука)))
//const lowerCaseTextHashtagsValue = textHashtagsValue.toLowerCase().replace(/\s+/g,' '); //Переводим строку в нижний регистр и убираем лишние пробелы
//выше тоже не нужно т.к. инпут будет пустой, нужно слушать ввод данных
// const hashtagsLength = /^#{1,19}$/;
// const hashtagsArray = textHashtagsInput.split(' ');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
re.test('#хэштег'); /* true */
re.test('#'); /* false */
re.test('хэштег'); /* false */
re.test('#хэштегДлиннее20символов'); /* false */

const hasDuplicates = (array) => {
  return (new Set(array)).size !== array.length;
};

const checkValidity = () => {
  textHashtags.value = textHashtags.value.replace(/\s+/g, ' ');
  const hashArray = textHashtags.value.toLowerCase().split(' ');

  console.log(hashArray);

  hashArray.forEach((hash) => {
    if(hash.length > 5) {
      textHashtags.setCustomValidity('хеш-тег должен начинаться с решётки #');
    } else {
      textHashtags.setCustomValidity('');
    }

  });

    textHashtags.reportValidity();
};

textHashtags.addEventListener('input', checkValidity);

// textHashtags.addEventListener('input', () =>{

//   if  (re.test('хэштег')!==true){
//     textHashtags.setCustomValidity('Хештег должен начинаться с #');
//   }  else {
//     textHashtags.setCustomValidity('');
//   }
//   textHashtags.reportValidity();
// });

//Функция создания массива из строки с заданным разделителем

/*const hashtagsArray = [];

function splitString(stringToSplit, separator) {
  const arrayOfStrings = stringToSplit.split(separator);

  hashtagsArray.push(arrayOfStrings);
}

splitString(lowerCaseTextHashtagsValue, ' ');*/
// console.log(hashtagsArray);

//hashtagsArray.forEach((item) => {
  //console.log(item)
  // if (!item.startsWith('#')) {
  //   textHashtags.setCustomValidity('Хештег должен начинаться с #');
  // } else {
  //   textHashtags.setCustomValidity('');
  // }
  // textHashtags.reportValidity();
//});

//Функция для поиска дубликата



function onPhotoEditingEscKeydown () {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePhotoEditing();
    }
  });
}

function onUploadCancelClick () {
  imgUploadCancel.addEventListener('click', () => {
    closePhotoEditing();
  });
}

function openPhotoEditing () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',onPhotoEditingEscKeydown);
  imgUploadCancel.addEventListener('click', onUploadCancelClick);
}

function closePhotoEditing() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadInput.value = '';
  document.removeEventListener('keydown',onPhotoEditingEscKeydown);
  imgUploadCancel.removeEventListener('click', onUploadCancelClick);
}

imageUploadInput.addEventListener('change',openPhotoEditing);

// const MIN_HASHTAGS_LENGTH = 2;
// const MAX_HASHTAGS_LENGTH = 20;

// textHashtags.addEventListener('input', () =>{
//   const valueLength = textHashtags.value.length;
//   if (valueLength < MIN_HASHTAGS_LENGTH) {
//     textHashtags.setCustomValidity(`Ещё ${  MIN_HASHTAGS_LENGTH - valueLength } симв.`);
//   } else if (valueLength > MAX_HASHTAGS_LENGTH) {
//     textHashtags.setCustomValidity(`Удалите лишние ${  valueLength - MAX_HASHTAGS_LENGTH } симв.`);
//   }else {
//     textHashtags.setCustomValidity('');
//   }
//   textHashtags.reportValidity();
// });


// /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/

// Хэш-теги:

// хэш-тег начинается с символа # (решётка);
// строка после решётки должна состоять из букв и чисел и не может содержать пробелы,
//  спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;

// хеш-тег не может состоять только из одной решётки;
// максимальная длина одного хэш-тега 20 символов, включая решётку;
// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// хэш-теги разделяются пробелами;
// один и тот же хэш-тег не может быть использован дважды;
// нельзя указать больше пяти хэш-тегов;
// ===хэш-теги необязательны;===
// Сообщения о неправильном формате хэштега задаются с помощью метода setCustomValidity у соответствующего поля.

// если фокус находится в поле ввода хэш-тега,
//  нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

// Сообщения о неправильном формате хэштега задаются с помощью метода setCustomValidity у соответствующего поля.

// Комментарий:

// ===комментарий не обязателен;===
// ===длина комментария не может составлять больше 140 символов;===

// если фокус находится в поле ввода комментария,
// нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

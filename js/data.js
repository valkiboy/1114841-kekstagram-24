import { getRandomIntInclusive } from './util.js';

const PROPOSAL = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Александр',
  'Максим',
  'Михаил',
  'Артем',
  'Лев',
  'Даниил',
  'Иван',
  'Марк',
  'Дмитрий',
  'Матвей',
  'Роман',
  'Тимофей',
  'Кирилл',
  'Мирон',
  'Алексей',
  'София',
  'Анна',
  'Мария',
  'Алиса',
  'Ева',
  'Виктория',
  'Полина',
  'Александра',
  'Варвара',
  'Елизавета',
];

const PHOTO_DESCRIPTION = [
  'Описание-0',
  'Описание-1',
  'Описание-2',
  'Описание-3',
  'Описание-4',
  'Описание-5',
  'Описание-6',
  'Описание-7',
  'Описание-8',
  'Описание-9',
  'Описание-10',
  'Описание-11',
  'Описание-12',
  'Описание-13',
  'Описание-14',
  'Описание-15',
  'Описание-16',
  'Описание-17',
  'Описание-18',
  'Описание-19',
  'Описание-20',
  'Описание-21',
  'Описание-22',
  'Описание-23',
  'Описание-24',
  'Описание-25',
];

// const name = NAMES[getRandomIntInclusive(0, NAMES.length-1)];
// const message = PROPOSAL[getRandomIntInclusive(0, PROPOSAL.length-1)];
// const avatar = `img/avatar-${getRandomIntInclusive (1,6)}.svg`;

const commentId = [];
while (commentId.length < 26) {
  const randomNumber = Math.ceil(Math.random() * 1000);
  let found = false;
  for (let i = 0; i < commentId.length; i++) {
    if (commentId[i] === randomNumber){
      found = true;
      break;
    }
  }
  if (!found) { commentId[commentId.length]=randomNumber; }
}

// const comments = [];
// for (let i = 0; comments.length < 26; i++){

//   const comment = {
//     id:(commentId[i]),
//     avatar:(`img/avatar-${getRandomIntInclusive (1,6)}.svg`),
//     message:(PROPOSAL[getRandomIntInclusive(0, PROPOSAL.length-1)]),
//     name:(NAMES[getRandomIntInclusive(0, NAMES.length-1)]),
//   };

//   comments.push (comment);
// }

const userPosts = [];
for (let i = 1; userPosts.length < 25; i++){

  const comments = [];
  for (let j = 0; comments.length < 26; j++){

    const comment = {
      id:(commentId[j]),
      avatar:(`img/avatar-${getRandomIntInclusive (1,6)}.svg`),
      message:(PROPOSAL[getRandomIntInclusive(0, PROPOSAL.length-1)]),
      name:(NAMES[getRandomIntInclusive(0, NAMES.length-1)]),
    };

    comments.push (comment);
  }

  const userPost = {
    id:(i),
    url:(`photos/${(i)}.jpg`),
    description:(PHOTO_DESCRIPTION[i]),
    likes:(getRandomIntInclusive (15,200)),
    comments:[comments[i]],
  };
  userPosts.push (userPost);
}

export {userPosts};

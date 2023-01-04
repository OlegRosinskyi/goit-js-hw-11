//Your API key: 32593559-7c2a9151c20a25b0c125348ad
//Список параметров строки запроса которые тебе обязательно необходимо указать:

//   key - твой уникальный ключ доступа к API.
//   q - термин для поиска. То, что будет вводить пользователь.
//   image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
//   orientation - ориентация фотографии. Задай значение horizontal.
//   safesearch - фильтр по возрасту. Задай значение true.

//В ответе будет массив изображений удовлетворивших критериям параметров запроса.
//Каждое изображение описывается объектом, из которого тебе интересны только следующие свойства:

//   webformatURL - ссылка на маленькое изображение для списка карточек.
//   largeImageURL - ссылка на большое изображение.
//   tags - строка с описанием изображения. Подойдет для атрибута alt.
//   likes - количество лайков.
//   views - количество просмотров.
//   comments - количество комментариев.
//   downloads - количество загрузок.

//Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
//В таком случае показывай уведомление с текстом "Sorry, there are no images matching your search query. Please try again.".
// Для уведомлений используй библиотеку notiflix.

import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axiosPhoto from './axiosPhoto';

const inputEl = document.querySelector('#search-form input');
//const divEl = document.querySelector('.country-info');
//const ulEl = document.querySelector('.country-list');
const divEl = document.querySelector('.gallery');

const articleElement = articls => {
  return articls
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        //if (articls.length === 1) {
        return `
   <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" width="450" height="294"loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span> ${likes} </span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div> `;
      }
    )
    .join('');
};
//name.cca3.toLowerCase() languages
console.log(inputEl);
const DEBOUNCE_DELAY = 300;

const onInput = event => {
  console.log(event.target.value.length);
  const valuelongth = event.target.value.length;
  const valuesString = event.target.value;
  let element = '';
  for (let index = 0; index < valuelongth; index++) {
    element = element + ' ';
  }
  //console.log(event.target.value === element);

  if (event.target.value === element) return;
  else {
    console.log(valuesString);
    axiosPhoto(event.target.value.trim())
      .then(res => res.data.hits)
      //.then(Response => {
      //console.log(Response.data);
      //  return Response.data;

      .then(articls => {
        console.log(articls.status);
        console.log(articls);
        if (articls.status === 404) {
          divEl.innerHTML = '';
          Notiflix.Notify.failure(
            '"Sorry, there are no images matching your search query. Please try again."'
          );
        } else {
          //ulEl.innerHTML = '';

          divEl.innerHTML = articleElement(articls);
        }
      })
      .catch(err => {
        console.log(err);

        divEl.innerHTML = '';
      });
  }
};

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

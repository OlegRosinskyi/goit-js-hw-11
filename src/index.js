import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axiosPhoto from './axiosPhoto';

const inputEl = document.querySelector('#search-form input');
const buttonEl = document.querySelector('#search-form button');
const divEl = document.querySelector('.gallery');
const formEl = document.querySelector('#search-form');
buttonEl.classList.add('disabled');
let valuesString = '';

const DEBOUNCE_DELAY = 300;

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
  <img src="${webformatURL}" alt="${tags}" width="360" height="294"loading="lazy" />
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

const onInput = event => {
  event.preventDefault();

  console.log(event.target.value.length);
  const valuelongth = event.target.value.length;
  valuesString = event.target.value;
  let element = '';
  for (let index = 0; index < valuelongth; index++) {
    element = element + ' ';
  }
  //console.log(event.target.value === element);

  if (valuesString === element) return (valuesString = '');
  else {
    // console.log(valuesString);
    buttonEl.classList.remove('disabled');
    valuesString = valuesString.trim();
    console.log(valuesString);
    // return valuesString;
  }
};

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
//inputEl.addEventListener('input', onInput);

const searchPhoto = event => {
  event.preventDefault();
  //console.log(event.currentTarget.elements[0]);

  //const {
  //  elements: { searchQuery },
  //} = event.currentTarget;
  if (valuesString === '') {
    return alert('Please fill in all the fields!');
  }

  // console.log(`text: ${searchQuery.value}`);
  // console.log(`textLonge: ${searchQuery.value.length}`);

  //const formData = {
  //  text,
  //};
  //console.log(formData);
  //event.currentTarget.reset();
  console.log(valuesString);
  axiosPhoto(valuesString)
    .then(res => res.data.hits)

    .then(articls => {
      console.log(articls.status);
      console.log(articls);
      if (articls.status === 404) {
        divEl.innerHTML = '';
        Notiflix.Notify.failure(
          '"Sorry, there are no images matching your search query. Please try again."'
        );
      } else {
        divEl.innerHTML = '';

        divEl.innerHTML = articleElement(articls);
      }
    })
    .catch(err => {
      console.log(err);

      divEl.innerHTML = '';
    });
};

formEl.addEventListener('submit', searchPhoto);

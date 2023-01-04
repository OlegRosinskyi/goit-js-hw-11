import axios from 'axios';
export default function axiosPhoto(name) {
  return axios.get(
    `https://pixabay.com/api/?key=32593559-7c2a9151c20a25b0c125348ad&q=${name}&orientation=horizontal&safesearch=true&image_type=photo`
  );

  // return axios.get(`https://restcountries.com/v3.1/name/${name}`);
}
//https://pixabay.com/api/?key=32593559-7c2a9151c20a25b0c125348ad&q=${name}&orientation=horizontal&safesearch=true&image_type=photo

//  q - термин для поиска. То, что будет вводить пользователь.
//image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
//orientation - ориентация фотографии. Задай значение horizontal.
//safesearch - фильтр по возрасту. Задай значение true.

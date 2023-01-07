import axios from 'axios';
export default function axiosPhoto(name, namberPage, namberPer_page) {
  return axios.get(
    `https://pixabay.com/api/?key=32593559-7c2a9151c20a25b0c125348ad&q=${name}&page=${namberPage}&per_page=${namberPer_page}&orientation=horizontal&safesearch=true&image_type=photo`
  );
}

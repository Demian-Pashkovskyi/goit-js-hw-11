import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";
const API_KEY = '28320130-19a63cf24e9bf5fe751a1157e';

const refs = {
	form: document.querySelector('#search-form'),
	gallery: document.querySelector('.gallery'),
	loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
	event.preventDefault();
	refs.gallery.innerHTML = "";
	imagesAPIService.query = event.currentTarget.searchQuery.value.trim();

	if (imagesAPIService.query === "") {
		Notify.info('Your query is empty. Try again!');
		return;
	} 
}

function fetchImages (imagesName) {
	const options = new URLSearchParams({
		key: `${API_KEY}`,
      q: `${this.searchQuery}`,
      page: `${this.page}`,
      per_page: `${this.PER_PAGE}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
	});

	return fetch(`https://pixabay.com/api/?${options}`).then(res => {
		if (res.ok) {
			return res.json()
		}
		throw new Error(res.statusText);
	});
}
fetchImages("cat").then(data => console.log(data));
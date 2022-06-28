import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";

var API_KEY = '28320130-19a63cf24e9bf5fe751a1157e';
var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
$.getJSON(URL, function(data){
if (parseInt(data.totalHits) > 0)
   $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
else
   console.log('No hits');
});

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
fetchImages("dog").then(data => console.log(data));
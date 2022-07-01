import './sass/main.scss';
'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesAPIService from './js/fetch-img';
import LoadMoreBtn from './js/load-more-btn';
import Markup from './js/imagemerkup';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

const imagesAPIService = new ImagesAPIService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more' });
const renderMarkup = new Markup({ selector: refs.gallery });

refs.form.addEventListener('submit', onFormSubmit);
loadMoreBtn.button.addEventListener('click', onloadMoreBtnClick);

// Submit handler
async function onFormSubmit(event) {
  event.preventDefault();
  renderMarkup.reset();
  imagesAPIService.query = event.currentTarget.searchQuery.value.trim();

  if (imagesAPIService.query === '') {
    loadMoreBtn.hideBtn();
    Notify.info('Your query is empty. Try again!');
    return;
  }

  imagesAPIService.resetPage();

  try {
    loadMoreBtn.showBtn();
    await initFetchImages();
  } catch (error) {
    loadMoreBtn.hideBtn();
    Notify.failure(error.message);
  }

  refs.form.reset();
}

// Load-More Button handler
async function onloadMoreBtnClick() {
	try {
	  await initFetchImages();
	} catch {
	  Notify.failure(error.message);
	}
	// pageScroll();
	renderMarkup.lightbox.refresh();
 }
 
 // Send request
 async function initFetchImages() {
	
	try {
	  loadMoreBtn.disable();
	  const images = await imagesAPIService.fetchImages();
	  renderMarkup.items = images;
	  renderMarkup.render();
	} catch {
	  Notify.failure(error.message);
	}
	 
 
	if (imagesAPIService.endOfHits) {
	  loadMoreBtn.hideBtn();
	  return;
	}
	loadMoreBtn.enable();
 }
 
// scroll to top
const toTopBtn = document.getElementById('topBTN');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopBtn.style.display = 'block';
    toTopBtn.addEventListener('click', topFunction);
  } else {
    toTopBtn.style.display = 'none';
  }
}

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// infinite scroll
const options = {
	rootMargin: '200px',
	threshold: 1.0,
 };
 
 const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
	  if (entry.isIntersecting && imagesAPIService.query ) {
		onloadMoreBtnClick();
	  }
	});
 }, options);
 
 observer.observe(document.querySelector('.scroll-guard'));
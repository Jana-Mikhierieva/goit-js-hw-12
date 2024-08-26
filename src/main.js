import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import { fetchImg } from "./js/pixabay-api";
import { createGalleryCardTemplate } from "./js/render-functions";
const form = document.querySelector('.js-search-form');
const gallerySelected = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.js-load-more');
let currentPage = 1;
let searchInput = '';
const lightbox = new SimpleLightbox('.js-gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        captions: true,
        animationSpeed: 300,
        close: true,
});
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-more');

const handleSubmit = async event => {
    try {
        event.preventDefault();
        gallerySelected.innerHTML = '';
        searchInput = form.elements.user_query.value.trim();
        loadMoreBtn.classList.add('is-hidden');
        currentPage = 1;
        if (!searchInput) {
            iziToast.error({
                title: 'Error',
                message: 'Please fill in the field!',
                position: 'topRight',
                maxWidth: '400px',
                backgroundColor: '#daff00',
            });
            return;
        }
        loader.classList.remove('is-hidden');
        const response = await fetchImg(searchInput, currentPage);        
        if (response.data.hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                maxWidth: '400px',
                backgroundColor: '#daff00',
            });
            return;
        };
        const cardsGalleryList = response.data.hits.map(card => createGalleryCardTemplate(card)).join('');
        gallerySelected.innerHTML = cardsGalleryList;
        loadMoreBtn.classList.remove('is-hidden');
        lightbox.refresh();
    } catch (err) {
        console.error(err);
        iziToast.error({
            title: 'Error',
            message: 'Oops! Error! Try again later!',
            position: 'topRight',
            maxWidth: '400px',
            backgroundColor: '#daff00',
        });
    } finally {
        form.reset();
        loader.classList.add('is-hidden');
    }
};
const onLoadMoreClick = async event => {
    try {
        currentPage++;
        loaderMore.classList.toggle('is-hidden');
        const response = await fetchImg(searchInput, currentPage);
        console.log(response.data);
        const cardsGalleryList = response.data.hits.map(card => createGalleryCardTemplate(card)).join('');
        gallerySelected.insertAdjacentHTML('beforeend', cardsGalleryList);  
        if (response.data.hits.length === 0) {
            loadMoreBtn.classList.add('is-hidden');
            iziToast.info({
            title: 'Hello!',
            message: 'We are sorry, but you have reached the end of search results!',
            position: 'topRight',
            maxWidth: '400px',
            backgroundColor: '#daff00',
        });
        };
    } catch (err) {
        console.error(err);        
    } finally {
        loaderMore.classList.add('is-hidden');
    }
};
form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);
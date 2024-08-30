import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import { fetchImg } from "./js/pixabay-api";
import { createGalleryCardTemplate } from "./js/render-functions";
const form = document.querySelector('.js-search-form');
const gallerySelected = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.js-load-more');
let currentPage = 1;
let searchInput = '';
let cardHight = 0;
const lightbox = new SimpleLightbox('.js-gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        captions: true,
        animationSpeed: 300,
        close: true,
});
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-more');
let totalLoadedImages = 0;
const handleSubmit = async event => {
    try {
        event.preventDefault();
        gallerySelected.innerHTML = '';
        totalLoadedImages = 0;
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
        totalLoadedImages += response.data.hits.length;
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
        const galleryCard = gallerySelected.querySelector('li');
        cardHight = galleryCard.getBoundingClientRect().height;
        if (totalLoadedImages >= response.data.totalHits) { 
            iziToast.info({
            title: 'Hello!',
            message: 'We are sorry, but you have reached the end of search results!',
            position: 'topRight',
            maxWidth: '400px',
            backgroundColor: '#daff00',
        });
        } else loadMoreBtn.classList.remove('is-hidden');
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
        loaderMore.classList.remove('is-hidden');        
        const response = await fetchImg(searchInput, currentPage);
        totalLoadedImages += response.data.hits.length;
        const cardsGalleryList = response.data.hits.map(card => {
            return createGalleryCardTemplate(card)
        }).join('');
        gallerySelected.insertAdjacentHTML('beforeend', cardsGalleryList); 
        scrollBy({
            top: cardHight * 2,
            behavior: 'smooth',
        })
        if (totalLoadedImages >= response.data.totalHits) {
            loadMoreBtn.classList.add('is-hidden');
            iziToast.info({
            title: 'Hello!',
            message: 'We are sorry, but you have reached the end of search results!',
            position: 'topRight',
            maxWidth: '400px',
            backgroundColor: '#daff00',
            });            
        };        
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
        loaderMore.classList.add('is-hidden');        
    }
};
form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);
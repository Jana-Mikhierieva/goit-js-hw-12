import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';
export const fetchImg = searchQuery => {
    const axiosOptions = {
        params: {
            q: searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            key: '45504583-80571ec5a383edfe03322cd8c',
        },
    };
    return axios.get('/api/', axiosOptions);
}
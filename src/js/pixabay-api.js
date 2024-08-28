import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';
export const fetchImg = async (searchQuery, page) => {
    const axiosOptions = {
        params: {
            q: searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 15,
            page: page,
            key: '45504583-80571ec5a383edfe03322cd8c',
        },
    };
    const response = await axios.get('/api/', axiosOptions);
    return response;
}
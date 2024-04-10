import axios from 'axios';

const API_KEY = "43197174-dcc5f5044572d8f441379a766";
const per_page = 125;

export async function searchPictures(searchQuery, page) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: per_page,
        page: page
    });

    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
}
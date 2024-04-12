import axios from 'axios';

const API_KEY = "43197174-dcc5f5044572d8f441379a766";
const per_page = 15;

async function searchPictures(searchQuery){
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
console.log(response);
    const { hits, totalHits } = response.data; 
    const totalPages = Math.ceil(totalHits / per_page);    
    return { hits, totalHits, totalPages };
    
}
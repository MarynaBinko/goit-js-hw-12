import axios from 'axios';


// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";



const gallery = new SimpleLightbox('.gallery a',{
    overlayOpacity: 8,
    captionData: "href",
    captionDelay: 250,
    captionClass: "text-center"
  });



const container = document.querySelector(".gallery");
const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);
 


function handleSubmit(event) {
    event.preventDefault();
    
    const input = form.querySelector("input[type='text']");
    const searchQuery = input.value;

    loader.style.display = 'flex';
    container.innerHTML = "";
   
    searchPictures(searchQuery)       
    .then(data => {
        const hits = data.hits;
if (hits.length === 0) {
    const errorMsg = `<i class="fa-solid fa-xmark"></i>Sorry, there are no images matching your search query. Please try again!`;
    showToast(errorMsg);
}else{ 
    container.innerHTML = createMarkup(hits);
    gallery.refresh();}
       
    })
    .catch(error => {
            const errorMsg = `<i class="fa-solid fa-xmark"></i>Sorry, there are no images matching your search query. Please try again!`;
            showToast(errorMsg)
        })
    
    .finally(()=> { loader.style.display = 'none';
    form.reset()})
    }

const  API_KEY = "43197174-dcc5f5044572d8f441379a766";

function searchPictures(searchQuery){
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });
 
    return fetch(`https://pixabay.com/api/?${params}`)
    .then(response => {
        if(!response.ok){
            throw new Error(showToast(errorMsg));
        }
        return response.json()
    })
 
}


function createMarkup(arr) {
    return  arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>{
        return `   
        <li class="list-item">
        <a class="gallery-link" href="${largeImageURL}">
            <img  class="list-image" src="${webformatURL}" alt="${tags}">
            <div class="image-details">          
                <p class="likes"><span class="span">Likes:</span><br> <span class="span-link">${likes}</span> </p>
                <p class="views"><span class="span">Views:</span><br> <span class="span-link">${views}</span>  </p>                                
                <p class="comments"><span class="span">Comments:</span><br> <span class="span-link">${comments}</span></p>               
                <p class="downloads"><span class="span">Downloads:</span><br> <span class="span-link">${downloads}</span></p>                           
            </div>
        </li>`; })
    .join("")
    ;
}




let toastBox = document.getElementById(`toastBox`);
function showToast(message) {
    let toast = document.createElement(`div`);
    toast.classList.add(`toast`);   
    toast.innerHTML = message;

    toastBox.appendChild(toast);

    
    setTimeout(() => {
        toast.remove();
    }, 3000);
    
};


const loader = document.getElementById('loader');
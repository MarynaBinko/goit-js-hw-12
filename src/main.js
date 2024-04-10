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
const loadBtn = document.querySelector(".load-btn");
form.addEventListener("submit", handleSubmit);
loadBtn.addEventListener("click", handleLoadMore);
const loader = document.getElementById('loader');
 
let page = 1;
let per_page = 125;
loader.style.display = 'none';

async function handleSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input[type='text']");
    const searchQuery = input.value;

    loader.style.display = 'inline-block';
    container.innerHTML = "";
    try{
        const { hits } = await searchPictures(searchQuery);
     if (hits.length === 0) {
        loader.style.display = 'none';
        loadBtn.style.display = 'none';
        const errorMsg = `<i class="fa-solid fa-xmark"></i>Sorry, there are no images matching your search query. Please try again!`;
        showToast(errorMsg);
        
        
    }else{ 
        container.insertAdjacentHTML("beforeend", createMarkup(hits));       
        gallery.refresh();
        page ++;
        loader.style.display = 'none';
        loadBtn.style.marginBottom = '50px';
    }                

        if (page > 1) {
            loadBtn.style.display = 'block';           
        }
    }
    catch {(error) => {
        const errorMsg = `<i class="fa-solid fa-xmark"></i>Sorry, there are no images matching your search query. Please try again!`;
        showToast(errorMsg)
        }
}
finally{ 
   loader.style.display = 'none';
  form.reset();
}
}


async function handleLoadMore() {
    try {               
        loader.style.display = 'flex';
        loader.style.position = "fixed";
        loader.style.bottom = "0";
        loader.style.left = "50%"; 
        loader.style.transform = "translateX(-50%)";
        
        
        const { hits } = await searchPictures(form.querySelector("input[type='text']").value);

        container.insertAdjacentHTML("beforeend", createMarkup(hits));
        gallery.refresh();       
        page++;

        if (hits.length < per_page) {
            loadBtn.style.display = 'none';
           const  message = `<i class="fa-solid fa-xmark"></i>We're sorry, but you've reached the end of search results.`;
            showToast(message);  
            loadBtn.style.display = 'none';  
            loader.style.display = 'none';     
        }
        const cardHeight = document.querySelector('.list-item').getBoundingClientRect().height;
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    } catch (error) {        
        const errorMsg = `<i class="fa-solid fa-xmark"></i>We're sorry, but you've reached the end of search results.`;
        showToast(errorMsg);
    } finally {
        
        loader.style.display = 'none';
      
       
    }
}



const  API_KEY = "43197174-dcc5f5044572d8f441379a766";

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
    return response.data;
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





















// function handleSubmit(event) {
//     event.preventDefault();
    
//     const input = form.querySelector("input[type='text']");
//     const searchQuery = input.value;

//     loader.style.display = 'flex';
//     container.innerHTML = "";
   
//     searchPictures(searchQuery)       
//     .then(data => {
//         const hits = data.hits;
// if (hits.length === 0) {
//     const errorMsg = `<i class="fa-solid fa-xmark"></i>Sorry, there are no images matching your search query. Please try again!`;
//     showToast(errorMsg);
// }else{ 
//     container.innerHTML = createMarkup(hits);
//     gallery.refresh();}
       
//     })
//     .catch(error => {
//             const errorMsg = `<i class="fa-solid fa-xmark"></i>Sorry, there are no images matching your search query. Please try again!`;
//             showToast(errorMsg)
//         })
    
//     .finally(()=> { loader.style.display = 'none';
//     form.reset()})
//     }

// const  API_KEY = "43197174-dcc5f5044572d8f441379a766";

// function searchPictures(searchQuery){
//     const params = new URLSearchParams({
//         key: API_KEY,
//         q: searchQuery,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: true,
//     });
 
//     return fetch(`https://pixabay.com/api/?${params}`)
//     .then(response => {
//         if(!response.ok){
//             throw new Error(showToast(errorMsg));
//         }
//         return response.json()
//     })
 
// }


// function createMarkup(arr) {
//     return  arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>{
//         return `   
//         <li class="list-item">
//         <a class="gallery-link" href="${largeImageURL}">
//             <img  class="list-image" src="${webformatURL}" alt="${tags}">
//             <div class="image-details">          
//                 <p class="likes"><span class="span">Likes:</span><br> <span class="span-link">${likes}</span> </p>
//                 <p class="views"><span class="span">Views:</span><br> <span class="span-link">${views}</span>  </p>                                
//                 <p class="comments"><span class="span">Comments:</span><br> <span class="span-link">${comments}</span></p>               
//                 <p class="downloads"><span class="span">Downloads:</span><br> <span class="span-link">${downloads}</span></p>                           
//             </div>
//         </li>`; })
//     .join("")
//     ;
// }




// let toastBox = document.getElementById(`toastBox`);
// function showToast(message) {
//     let toast = document.createElement(`div`);
//     toast.classList.add(`toast`);   
//     toast.innerHTML = message;

//     toastBox.appendChild(toast);

    
//     setTimeout(() => {
//         toast.remove();
//     }, 3000);
    
// };


// const loader = document.getElementById('loader');
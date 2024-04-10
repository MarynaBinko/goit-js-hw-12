export function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <li class="list-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="list-image" src="${webformatURL}" alt="${tags}">
                <div class="image-details">          
                    <p class="likes"><span class="span">Likes:</span><br> <span class="span-link">${likes}</span> </p>
                    <p class="views"><span class="span">Views:</span><br> <span class="span-link">${views}</span>  </p>                                
                    <p class="comments"><span class="span">Comments:</span><br> <span class="span-link">${comments}</span></p>               
                    <p class="downloads"><span class="span">Downloads:</span><br> <span class="span-link">${downloads}</span></p>                           
                </div>
            </a>
        </li>`;
    }).join("");
}

export function showToast(message) {
    const toastBox = document.getElementById('toastBox');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = message;

    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
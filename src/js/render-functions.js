import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const gallery = document.querySelector(".gallery");
const fetchBtn = document.getElementById("fetch-btn");
export let totalHits = 0;

const renderImages = (data) => {
    const { hits } = data;
    totalHits = data.totalHits;
    if (hits.length === 0) {
            fetchBtn.style.display = "none"

        iziToast.show({
            message: "Sorry, there are no images matching your search query. Please try again!",
            messageColor: 'white',
            position: 'topRight',
            backgroundColor: 'red',
            close: false,
            progressBar: false,
                })
    }
   
    return hits
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
            <div class="image-card">
                <a href="${largeImageURL}" target="_blank">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="image-info">
                    <p><strong>Likes</strong> ${likes}</p>
                    <p><strong>Views</strong> ${views}</p>
                    <p><strong>Comments</strong> ${comments}</p>
                    <p><strong>Downloads</strong> ${downloads}</p>
                </div>
            </div>`
        )
        .join("");
};

export const renderGallery = (data) => {
    const markup = renderImages(data);
    gallery.insertAdjacentHTML("beforeend", markup)
};

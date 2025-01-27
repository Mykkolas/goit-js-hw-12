import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery, totalHits } from "./js/render-functions.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("form");
const gallery = document.querySelector(".gallery");
const fetchBtn = document.getElementById("fetch-btn");

let currentQuery = "";
let page = 1;
let lightbox;


function main() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        //! loading span
        gallery.insertAdjacentHTML("beforebegin", "<span class='loader'></span>") 
       

        const formData = new FormData(e.target);
        currentQuery = formData.get("search-input");

        if (!currentQuery) {
            iziToast.show({
                message: "Input is empty!",
                messageColor: "white",
                position: "topRight",
                backgroundColor: "red",
                close: false,
                progressBar: false,
            });
            return;
        }

        form.reset();
        page = 1; 
        fetchImages(currentQuery, page)
            .then((data) => {
                gallery.innerHTML = "";
                renderGallery(data);
                initializeLightbox();
                checkFetchButton();
                
            })
            .catch((err) => {
                console.error("Error:", err);
                gallery.innerHTML = "";
            });
    });

    fetchBtn.addEventListener("click", () => {
        page += 1;
        fetchImages(currentQuery, page)
            .then((data) => {
                renderGallery(data);
                initializeLightbox();
                checkFetchButton();
                 scrollPage() //! scroll
            })
            .catch((e) => {
                console.error("Error:", e);
            });
    });
}

//! Scrolling
function scrollPage() {
    const imageCard = document.querySelector(".image-card");

    if (imageCard) {
        const cardHeight = imageCard.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth"
        });
    }
}
//! End of scrolling

function checkFetchButton() {
    const totalDisplayedItems = document.querySelectorAll(".image-card").length;
    if (totalDisplayedItems >= totalHits) {
        iziToast.show({
             message: "We're sorry, but you've reached the end of search results.",
            messageColor: 'white',
            position: 'topRight',
            backgroundColor: 'blue',
            close: false,
            progressBar: false,
        })
        fetchBtn.style.display = "none";
    } else {
        fetchBtn.style.display = "block";
    }
}

function initializeLightbox() {
    if (lightbox) {
        lightbox.destroy()
    }
     lightbox = new SimpleLightbox(".gallery a", {
        captionDelay: 250,
    });
    lightbox.refresh();
}

main();

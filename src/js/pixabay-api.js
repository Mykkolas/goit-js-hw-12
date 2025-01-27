import axios from "axios";

const APIKEY = "48409892-84416e27ee3da12ba614fc4d7";
const fetchBtn = document.getElementById("fetch-btn")

export async function fetchImages(query, page) { 
    const options = {
        key: APIKEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page: page
    };
    try {
     const res =  await axios.get("https://pixabay.com/api/", {
        params: options
     },
        )
        fetchBtn.style.display = "block"        
       return res.data 
    }
    catch (err) {
        console.log(err);
    }
   
}

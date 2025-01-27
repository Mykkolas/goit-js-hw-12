import{a as B,i as u,S as v}from"./assets/vendor-BDaiwwc1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const I="48409892-84416e27ee3da12ba614fc4d7",$=document.getElementById("fetch-btn");async function f(e,o){const s={key:I,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o};try{const n=await B.get("https://pixabay.com/api/",{params:s});return $.style.display="block",n.data}catch(n){console.log(n)}}const C=document.querySelector(".gallery"),E=document.getElementById("fetch-btn");let b=0;const S=e=>{const{hits:o}=e;return b=e.totalHits,o.length===0&&(E.style.display="none",u.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",position:"topRight",backgroundColor:"red",close:!1,progressBar:!1})),o.map(({webformatURL:s,largeImageURL:n,tags:t,likes:r,views:a,comments:w,downloads:L})=>`
            <div class="image-card">
                <a href="${n}" target="_blank">
                    <img src="${s}" alt="${t}" loading="lazy" />
                </a>
                <div class="image-info">
                    <p><strong>Likes</strong> ${r}</p>
                    <p><strong>Views</strong> ${a}</p>
                    <p><strong>Comments</strong> ${w}</p>
                    <p><strong>Downloads</strong> ${L}</p>
                </div>
            </div>`).join("")},p=e=>{const o=S(e);C.insertAdjacentHTML("beforeend",o)},m=document.querySelector("form"),d=document.querySelector(".gallery"),g=document.getElementById("fetch-btn");let i="",c=1,l;function q(){m.addEventListener("submit",e=>{e.preventDefault();//! loading span
if(d.insertAdjacentHTML("beforebegin","<span class='loader'></span>"),i=new FormData(e.target).get("search-input"),!i){u.show({message:"Input is empty!",messageColor:"white",position:"topRight",backgroundColor:"red",close:!1,progressBar:!1});return}m.reset(),c=1,f(i,c).then(s=>{d.innerHTML="",p(s),y(),h()}).catch(s=>{console.error("Error:",s),d.innerHTML=""})}),g.addEventListener("click",()=>{c+=1,f(i,c).then(e=>{p(e),y(),h(),D();//! scroll
}).catch(e=>{console.error("Error:",e)})})}//! Scrolling
function D(){const e=document.querySelector(".image-card");if(e){const o=e.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}//! End of scrolling
function h(){document.querySelectorAll(".image-card").length>=b?(u.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"white",position:"topRight",backgroundColor:"blue",close:!1,progressBar:!1}),g.style.display="none"):g.style.display="block"}function y(){l&&l.destroy(),l=new v(".gallery a",{captionDelay:250}),l.refresh()}q();
//# sourceMappingURL=index.js.map

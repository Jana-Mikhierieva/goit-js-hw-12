import{a as y,S as b,i}from"./assets/vendor-CRwkH7JT.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();y.defaults.baseURL="https://pixabay.com";const f=async(s,e)=>{const a={params:{q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e,key:"45504583-80571ec5a383edfe03322cd8c"}};return await y.get("/api/",a)},L=s=>`
    <li class="gallery-card">
        <a class="gallery-link" href="${s.largeImageURL}">
            <img class="gallery-img" src="${s.webformatURL}" alt="${s.tags}" />
        </a>
        <div class="image-info">
            <p class="img-descr"><span class="text-descr">Likes</span><span class="quantity-descr">${s.likes}</span></p>
            <p class="img-descr"><span class="text-descr">Views</span><span class="quantity-descr">${s.views}</span></p>
            <p class="img-descr"><span class="text-descr">Comments</span><span class="quantity-descr">${s.comments}</span></p>
            <p class="img-descr"><span class="text-descr">Downloads</span><span class="quantity-descr">${s.downloads}</span></p>
        </div>
        </li>`,u=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),c=document.querySelector(".js-load-more");let d=1,l="",x=0;const v=new b(".js-gallery a",{captionsData:"alt",captionDelay:250,captions:!0,animationSpeed:300,close:!0}),h=document.querySelector(".loader"),g=document.querySelector(".loader-more");let m=0;const q=async s=>{try{if(s.preventDefault(),n.innerHTML="",l=u.elements.user_query.value.trim(),c.classList.add("is-hidden"),d=1,!l){i.error({title:"Error",message:"Please fill in the field!",position:"topRight",maxWidth:"400px",backgroundColor:"#daff00"});return}h.classList.remove("is-hidden");const e=await f(l,d);if(m+=e.data.hits.length,e.data.hits.length===0){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",maxWidth:"400px",backgroundColor:"#daff00"});return}const a=e.data.hits.map(t=>L(t)).join("");n.innerHTML=a,x=n.querySelector("li").getBoundingClientRect().height,c.classList.remove("is-hidden"),v.refresh()}catch(e){console.error(e),i.error({title:"Error",message:"Oops! Error! Try again later!",position:"topRight",maxWidth:"400px",backgroundColor:"#daff00"})}finally{u.reset(),h.classList.add("is-hidden")}},S=async s=>{try{d++,g.classList.remove("is-hidden");const e=await f(l,d);m+=e.data.hits.length;const a=e.data.hits.map(o=>L(o)).join("");n.insertAdjacentHTML("beforeend",a),scrollBy({top:x*2,behavior:"smooth"}),m>=e.data.totalHits&&(c.classList.add("is-hidden"),i.info({title:"Hello!",message:"We are sorry, but you have reached the end of search results!",position:"topRight",maxWidth:"400px",backgroundColor:"#daff00"}))}catch(e){console.error(e),i.error({title:"Error",message:"Oops! Error! Try again later!",position:"topRight",maxWidth:"400px",backgroundColor:"#daff00"})}finally{g.classList.add("is-hidden")}};u.addEventListener("submit",q);c.addEventListener("click",S);
//# sourceMappingURL=index.js.map

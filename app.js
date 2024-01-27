function valid() {
    function invalid(event) {
        event.target.setCustomValidity('Do Not Enter Numbers');
    }
    
    const img_search = document.getElementById('img-search');
    
    img_search.addEventListener('input', () => {
        if (!img_search.value.match(/^[a-zA-Z]+$/)) {
            img_search.setCustomValidity('Do Not Enter Numbers...');
        } else {
            img_search.setCustomValidity('');
        }
    });
}
valid();

const accessKey = "PiSCIm2HRwRbjGZhQPjTkfzOvCySm0mzsqWq-oPfjnk";
const searchForm = document.getElementById("search-form");//This is Form 
const imgSearch = document.getElementById("img-search");//This is input button
const search = document.getElementById("search"); //This is search button
const result = document.getElementById("search-result"); //This is search-result
const load = document.getElementById("load"); //This is load more button


let keyword = "";
let page = 1;
async function searchImages(){
    keyword = imgSearch.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`
    const response = await fetch(url); //This is for fetching url
    const data = await response.json();//This is for showing the data into json format
    if(page === 1){
        result.innerHTML = "";
    }
    const results = data.results;
    results.map((res)=>{
        const img = document.createElement("img");
        img.src = res.urls.small;
        const imgLink = document.createElement("a");
        imgLink.href = res.links.html;
        imgLink.target = "_blank";
        imgLink.appendChild(img);
        result.appendChild(imgLink);
    });
    load.style.display = "block";
}

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
});

load.addEventListener("click", (e) =>{
    e.preventDefault();
    page++;
    searchImages();
});
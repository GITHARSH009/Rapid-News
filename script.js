const Api_key="ef368ade7b534bb8b8da8102e369cbf9"
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchnews("India"));

async function fetchnews(query){

     const res=await fetch(`${url}${query}&apiKey=${Api_key}`);
     console.log(res.status)
     const data=await res.json();
     arrange(data.articles);
}

function arrange(articles){
     const cardsContainer=document.getElementById("card-container");
     const newsTemplate=document.getElementById("template-cards");

     cardsContainer.innerHTML="";

     articles.map((article)=>{
         if(article.urlToImage!==null){;
         const clone=newsTemplate.content.cloneNode(true);
         filldata(clone,article);
         cardsContainer.appendChild(clone);
         }
     });
}

function filldata(clone,arti){
    const newsImg=clone.querySelector("#imgi");
    const newsTitle=clone.querySelector("#news-title");
    const newsSouce=clone.querySelector("#news-source");
    const newsdesc=clone.querySelector("#news-desc");

    newsImg.src=arti.urlToImage;
    newsTitle.innerHTML=arti.title;
    newsdesc.innerHTML=arti.description;

    const date=new Date(arti.publishedAt).toLocaleDateString("en-US",{
        timeZone:"Asia/Jakarta",
    });

    newsSouce.innerHTML=`${arti.source.name}:${date}`;

    newsTitle.addEventListener("click",()=>{
       window.open(arti.url,"_blank");
    });
}


const search=document.getElementById("search");
const searchbtn=document.getElementById("searchbtn");

searchbtn.addEventListener("click",()=>{
    const searchword=search.value;
    if(searchword!==null && fetchnews(searchword)!==null){
        return fetchnews(searchword);
    }
})




//when the page loads, call the init function
window.addEventListener("DOMContentLoaded", init);

function init(){
  const urlParams = new URLSearchParams(window.location.search);
  //grab search=something from the url (it might not exist)
  const search = urlParams.get("search");
  //grab id=something from the url (it might not exist)
  const id = urlParams.get("id");
  const category = urlParams.get("category");

  if(search){ //if search has a value
    getSearchData();
  } else if(id){ //if id has a value
    getSingleArt();
  } else if (category){
    //category stuff

    getCategoryData(category)
  } else { // if neither is true, get data for the frontpage
    getFrontpageData();
  }
  getNavigation()
}

function getNavigation(){
  fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/categories")
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      data.forEach(addLink)
    })
}

// function addLink(oneItem){
// console.log(oneItem)
// document.querySelector("nav").innerHTML += oneItem.name
// if(oneItem.parent === 14 && oneItem.count > 0){
// const link = document.createElement("a");
// link.textContent=oneItem.name;
// link.setAttribute("href", "category.html?category="+oneItem.id)
// document.querySelector("nav").appendChild(link);
//  }
//}

function getSearchData(){
  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("search");

  fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/book?_embed&search="+search)
    .then(res=>res.json())
    .then(handleData)
}

function getFrontpageData(){
  fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/book?_embed")
    .then(res=>res.json())
    .then(handleData)
}

function getCategoryData(catId){
  console.log(catId)
  fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/book?_embed&categories="+catId)
    .then(res=>res.json())
    .then(handleData)
}

function getSingleBook(){
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  fetch("http://georgianadancu.com/wp-json/wp/v2/book/"+id)
    .then(res=>res.json())
  .then(showBook)

  function showBook(book){
    document.querySelector("article h1").textContent=book.title.rendered
  }
}

function handleData(myData){
  myData.forEach(showPost)
}

function showPost(post){
  const imgPath = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;

  const template = document.querySelector(".postTemplate").content;
  const postCopy = template.cloneNode(true);
  //3. textcontent & innerHTML
  const h1 = postCopy.querySelector("h1");
  h1.textContent=post.title.rendered;

  const img = postCopy.querySelector("img.cover");

  img.setAttribute("src", imgPath)
  img.setAttribute("alt", "Cover of the book " + post.title.rendered)

  const a = postCopy.querySelector("a");
  a.href="sub.html?id="+post.id

  const content = postCopy.querySelector("section");
  content.innerHTML=post.content.rendered;

  const publisher = postCopy.querySelector(".publisher");
  publisher.innerHTML=post.publisher;

  //4 append
  document.querySelector("#posts").appendChild(postCopy)
}

window.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    fetchJson();
}

function fetchJson() {

    const urlParams = new URLSearchParams(window.location.search);
    let search = urlParams.get("pod");
    console.log(search)


    fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/"+search)
           .then(res=>res.json())
           .then(data=>{
        console.log(data);
        data.forEach(showEachPost);
       });
}

function showEachPost(e) {
    console.log(e)
    const copiesContainer = document.querySelector('#templateCopiesContainer');
    const myTemplate = document.querySelector('.podTemplate').content;
    let myCopy = myTemplate.cloneNode(true);
    // populate the elements within the clone here
    //console.log(myCopy);
    //get h1 for each post
    let h1 = myCopy.querySelector("h1");
    h1.textContent = e.title.rendered;
    // get p = content for each post
    let description = myCopy.querySelector(".description");
    description.innerHTML = e.content.rendered;
    // get the event date
    let eventDate = myCopy.querySelector(".event_date");
    eventDate.innerHTML = e.date;

    copiesContainer.appendChild(myCopy);
}

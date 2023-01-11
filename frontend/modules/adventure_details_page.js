import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  console.log(params.get('adventure'));
  return params.get('adventure');

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`);    
    const data = await res.json();
    console.log(data)
    return data;
  } catch(err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let advName = document.getElementById("adventure-name");
  advName.textContent = adventure.name;
  let advSubtitle = document.getElementById("adventure-subtitle");
  advSubtitle.textContent = adventure.subtitle;
  let adventureContent = document.getElementById("adventure-content");
  adventureContent.textContent = adventure.content;

  adventure.images.forEach((ele) => {
    console.log(ele);
    let advImgContainer = document.createElement('div');
    let advImgGallery = document.getElementById("photo-gallery");
    advImgContainer.innerHTML = `
    <img src="${ele}" alt="Adventure Image" class="adventureImg activity-card-image mb-5">
    `;
    advImgGallery.append(advImgContainer);

  });

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  console.log(images)
  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;

let carouselInnerElem = document.querySelector(".carousel-inner")

images.forEach((ele) => {
  let div = document.createElement("div");
  div.className = "carousel-item";
  div.innerHTML = `
      <img src=${ele} class="d-block activity-card-image w-100" alt="Adventure images">
  `
  carouselInnerElem.append(div);
  console.log(carouselInnerElem.firstElementChild);
})

let firstEle = carouselInnerElem.firstElementChild;
firstEle.className = "carousel-item active";

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure)
  let soldOutPanel = document.getElementById("reservation-panel-sold-out");
  let availablePanel = document.getElementById("reservation-panel-available");
  document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;

  if(adventure.available == true) {
    soldOutPanel.style.display = "none";
    availablePanel.style.display ="block";

    

  } else {
    availablePanel.style.display ="none";
    soldOutPanel.style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("resInput").innerHTML = "none";
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons;


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let myForm = document.getElementById("myForm");
  myForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let data={
      name:myForm.elements["name"].value,
      date:new Date(myForm.elements["date"].value),
      person:myForm.elements["person"].value,
      adventure:adventure["id"]
    }
    console.log(data);
    try{
      const url=`${config.backendEndpoint}/reservations/new`;
      const res=await fetch(url,{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)
      });
     alert("success");
     window.location.reload();
    }
    catch(error){
      console.log(error);
      alert("failed");
 
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let banner = document.getElementById("reserved-banner");

  if (adventure.reserved == true) {
    banner.style.display = "block";
  } else {
    banner.style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

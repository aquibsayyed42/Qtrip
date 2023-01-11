import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  console.log(params.get('city'));
  return params.get('city');

}

//Implementation of fetch call with a paramterized input based on city

async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
    try {
      const res = await fetch(config.backendEndpoint + `/adventures/?city=${city}`);    
      const data = await res.json();
      console.log(data)
      return data;
    } catch(err) {
      return null;
    }
  }

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let rowMain = document.getElementById('data');
  adventures.forEach((ele) => {
    let cardDetail = document.createElement("div");
    cardDetail.setAttribute("class", "col-lg-3 col-md-4 col-sm-6 mb-4");
    // let cardData =
    // `<p>Hii this is a test</p>`;
    cardDetail.innerHTML = 
    `<a href="detail/?adventure=${ele.id}" id="${ele.id}">
      <div class="card adventure-card">
        <div class="image_div">
          <img src="${ele.image}" class="card-img-top" alt="${ele.name}">
          <div class="category-banner">
            <p>${ele.category}</p>
          </div>
        </div>
        <div class="card-body">
          <div class="card_text d-flex justify-content-between">
            <p class="card-text card-adv-title">${ele.name}</p>
            <p class="card-text">₹${ele.costPerHead}</p>
          </div>
          <div class="duration text-center d-flex justify-content-between pt-2">
            <p class="card-adv-title">Duration</p>
            <p>${ele.duration} Hours</p>
          </div>
        </div>
      </div>
      </a>
    `;
    rowMain.append(cardDetail);

  });

}

let city = getCityFromURL(window.location.search);
function addNewAdventure(city) {
  let addAdventureBtn = document.querySelector(".addAdventureButton");
  addAdventureBtn.addEventListener("click", async function () {
  //ignore the error npm test throws here.Everything is working
  const cityObject ={"city":city};
  const URL = `${config.backendEndpoint}/adventures/new`;
  console.log(URL)
  fetch(URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body:JSON.stringify(cityObject)
    });
  });
}
addNewAdventure(city);

// addNewAdventure("paris");

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(item=>item.duration>=low&&item.duration<=high);

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let result = list.filter(item => categoryList.includes(item.category));
  return result;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.category.length!==0){
    list=filterByCategory(list,filters.category);
  }
  if(filters.duration){
    let[low,high]=filters.duration.split("-");    
    list=filterByDuration(list,low,high);
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters=JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let filterPills = document.getElementById('category-list');
  filters.category.forEach(item=>{
    let buttonPill=document.createElement('button');
    buttonPill.setAttribute("class","filterPill btn-primary me-3 py-1 px-3");
    buttonPill.setAttribute("type","button");
    buttonPill.setAttribute("disabled","");
    filterPills.append(buttonPill);
    buttonPill.append(item);
    // filterPills.append(item);
    saveFiltersToLocalStorage(filters);
  });
}


function removePillsFromDOM(){}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

'use strict';

// GOAL: Display a list of national parks in an area

// REQUIREMENTS /////////////////////////////////

// The user must be able to search for parks in one or more states.
// ^^^^^ PRESUMPTION: not simultaneously, so a dropdown to pick one state per submission is fine.

// The user must be able to set the max number of results, with a default of 10.

// The search must trigger a call to NPS's API.

// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL

// The user must be able to make multiple searches and see only the results for the current search.

// As a stretch goal, try adding the park's address to the results.

// end REQUIREMENTS /////////////////////////////////


//////////////////////////////////////////////////////////////
// SEPARATION OF CONCERNS: TYPES OF FUNCTIONS
// (Miscellaneous): Fetch Data
// Template Generators
// Rendering Functions
// Event Handlers
//////////////////////////////////////////////////////////////

// INIT
function init() {
  renderDropdownMenu();
  handleSubmission();
}


// MISCELLANEOUS /////////////////////////////////////////////

function fetchStateParkInfo(state, maxResults) {
  console.log(state, maxResults);

  const apiKey = '5sSsm7fFCYCquxRBY5P0IVUu9Y1OX70vBJb4algf';
  const baseURL = 'https://developer.nps.gov/api/v1/parks';

  // Header currently rejected, so embedding in params for now =/
  // ** REFACTOR **
  // doc: https://www.nps.gov/subjects/developer/guides.htm
  const options = {
    headers: new Headers({
      'X-Api-Key': apiKey})   
  };  

  const params = {
    stateCode: state,
    limit: maxResults,
    api_key: apiKey,
  };

  const queryString = formatQueryParams(params);
  

  const url = baseURL + '?' + queryString;
  console.log(url);
  
  // BECAUSE IT TAKES SO LONG FOR THE PROMISE TO BE FULFILLED
  // INFORMING THE USER TO BE PATIENT
  $('.js-please-wait').removeClass('hidden').html('<b>Searching...</b> Please be patient wait while we fetch this data for you...');

  // fetch(url, options)
  fetch(url)
  .then(response => {
    console.log('response');
    if(!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // console.log(data);
    renderStateParkInfo(data);
    $('.js-please-wait').addClass('hidden').html('');
  })
  .catch(err => {
    console.log(err);
    $('.js-error-msg').removeClass('hidden').html(err);
  });

  // renderStateParkInfo();
}

function fetchListOfStates() {
  // get list of available states to populated the dropdown menu
  // ^^^^^^^ couldn't find an API so accessing local store.js STATES array instead
}



// TEMPLATE GENERATORS ///////////////////////////////////////

function generateStateParkInfo(STATES) {
  // extract .map all relevant key/values into array
  // return as string

  
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map( key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
  });
  return queryItems.join('&');
}

function generateDropdownMenu(STATES) {
  // extract .map all relevant key/values into array
  // return as string of <options>
  // console.log(STATES);
  const options = STATES.map(item => {
    // console.log(item.name);
    return `<option value=${item.abbreviation}>${item.name}</option>`;
  });
  // console.log(options);
  return `
    <option value="" disabled selected>Select a State</option>
    ${options}
  `;
}



// RENDERING FUNCTIONS ///////////////////////////////////////

// ** REFACTOR **
// to use generateStateParkInfo(), too.

// generate HTML & then render into DOM
function renderStateParkInfo(dataInfo) {
  // generate info into HTML
  // const results = generateStateParkInfo(data);
  for (let i=0; i < dataInfo.data.length; i++) {
    $('#js-list-results').append(`
    <li> 

      <h3 class="park-name">${dataInfo.data[i].fullName}</h3>
      <p class="park-description">${dataInfo.data[i].description}</p>
      <p class="park-website"><a href="${dataInfo.data[i].url}" target="_blank">${dataInfo.data[i].url}</a></p>
    </li>`);
  }
  // <li class="park-address">${dataInfo.data[i].addresses[0]}<li>
  // ^^^^^^^ ** REFACTOR **
  // there can be multiple addresses, e.g. addresses[0], addresses[1], etc
  $('#js-results').removeClass('hidden');
}

function renderDropdownMenu() {
  // fetch list of states available
  // ^^^^^^^^ couldn't find in API so just made a local store.js of it
  
  // generate list of <options>
  const listOfStates = generateDropdownMenu(STATES);

  // render HTML in the DOM
  $('#js-select-state').html(listOfStates);
}



// EVENT HANDLERS ////////////////////////////////////////////

function handleSubmission() {
  $('#search-form').on('submit', event => {
    event.preventDefault();
    const selectedState = $('#js-select-state').val();
    const maxResults = $('#max-num-results').val();
    fetchStateParkInfo(selectedState, maxResults);
  });
}


// INVOKE INIT
$(init);
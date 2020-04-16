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


function fetchStateParkInfo() {
  // const params
  // const url
  // get/fetch
  // renderStateParkInfo();
}

function fetchListOfStates() {
  // get list of available states to populated the dropdown menu
}


// TEMPLATE GENERATORS ///////////////////////////////////////

function generateStateParkInfo(STATES) {
  // extract .map all relevant key/values into array
  // return as string
  
}

function generateDropdownMenu(STATES) {
  // extract .map all relevant key/values into array
  // return as string of <options>
  console.log(STATES);
  const options = STATES.map(item => {
    // console.log(item.name);
    return `<option value=${item.abbreviation}>${item.name}</option>`;
  });
  console.log(options);
  return `
    <option value="" disabled selected>Select a State</option>
    ${options}
  `;
}


// RENDERING FUNCTIONS ///////////////////////////////////////

function renderStateParkInfo() {
  // generate info into HTML
  // render HTML into DOM

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

}


// INVOKE INIT
$(init);
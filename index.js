'use strict';

const api = 'BEqSM0CZgeioq5rGCTTjdABiKDd5cJpJdl9c5bJE';
const endpoint = 'https://developer.nps.gov/api/v1/parks';

function displayResults(responseJson) {
    //Adds elements to the page based on the results from the GET request
    $('.list-results').empty();
    $('.results').removeClass('hidden');
    console.log(responseJson.data.length);
    for (let i = 0; i<responseJson.data.length; i++) {
        $('.list-results').append(`
            <li><h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description}</p>
                <p>Link: <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
            </li>
        `);
    }

}

function createString(params) {
    //Creates the necessary string for the url GET request
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function getParksInfo(states, maxResults) {
    //Takes form info and returns corresponding information from the Parks API
    const params = {
        stateCode: states,
        limit: maxResults,
        api_key: api,
    }

    let query = createString(params);
    let url = endpoint + '?' + query;
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    //Watches for the form to be submitted and will log users values and pass them to later functions
    $('form').submit(event => {
        event.preventDefault();
        let states = $('#js-state-select').val().toLowerCase();
        let maxResults = $('#js-max-results').val();
        getParksInfo(states, maxResults);
    })
}

//jQuery to call the watchForm function when the page loads
$(watchForm);
'use strict';

const apiKey = 'jcYYYX9TJhvaUyeoCILGCUdID7yRdBZTXS52tb8m'; 
const resourceEndpoint = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.results ul').empty();
    for (let i = 0; i < responseJson.data.length; i++){
        $('.results ul').append(
            `<li><h3>${responseJson.data[i].name}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
            </li>`
        )};
  $('.results').removeClass('hidden');
};

function getParks(maxResults, states) {
    const params = {
        api_key: apiKey,
        limit: maxResults,
        stateCode: states
    };
    const queryString = formatQueryParams(params)
    const url = resourceEndpoint + '?' + queryString;

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
    $('form').submit(event => {
        event.preventDefault();
        const maxResults = $('#js-max-results').val();
        const states = $('#js-states').val();
        getParks(maxResults, states);
    });
}

$(watchForm);
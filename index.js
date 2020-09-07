'use strict';

const apiKey = 'jcYYYX9TJhvaUyeoCILGCUdID7yRdBZTXS52tb8m'; 
const resourceEndpoint = 'https://developer.nps.gov/api/v1/parks';
const states = [];
const stateCodes = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
};

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            return queryItems.join('&');
}

function formatStateCodes(states) {
    const stateCodes = states.join(',');
    return stateCodes;
}

function addState() {
    console.log(stateCodes[$('#js-states').val()])
    if (!stateCodes[$('#js-states').val()]) {
        $('form ul').append(
            `<li>Error</li>`
        )
    }
    else {
        $('form ul').append(
            `<li>${$('#js-states').val()}
            <button id="js-remove-state">Remove</button>
            <br>
            </li>`
        )
    }
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

function getParks(query, maxResults, states) {
    const params = {
        api_key: apiKey,
        q: query,
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
    $('form').on('click', '#js-add-state', function(event) {
        event.preventDefault();
        addState();
    });
    $('form').on('click', '#js-remove-state', function(event) {
        event.preventDefault();
        $(this).closest('li').remove();
    });
    $('form').submit(event => {
        event.preventDefault();
        const states = [];
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        states.push(stateCodes[$('#js-states').val()]);
        getParks(searchTerm, maxResults, states);
    });
}

$(watchForm);
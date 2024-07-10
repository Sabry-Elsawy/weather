
// Get DOM elements
let search = document.getElementById('search');
let searchbtn = document.getElementById('searchbtn');

// Object to store weather data
let weatherData = {};

// Function to fetch weather data
async function getData(searchCity) {
    // Fetch weather data from WeatherAPI
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4c20e5e094d74daea77203858241206&q=${searchCity}&days=3`);
    let result = await response.json();
    weatherData = result; // Store fetched data in weatherData object

    // Display weather information
    displayNow(); // Display current weather
    displayDay2(weatherData.forecast.forecastday); // Display forecast for day 2
    displayDay3(weatherData.forecast.forecastday); // Display forecast for day 3
}

// Initial data fetch for default city 'alex'
getData('Al Qahirah');

// Arrays for day and month names
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Event listener for input change (keyup event)
search.addEventListener('keyup', function() {
    getData(this.value); // Fetch data based on user input
});

// Function to display current weather
function displayNow() {
    let date = new Date(weatherData.current.last_updated); // Get date from weather data
    let cartiona = `
        <div class="today">
            <div class="today-head p-3 d-flex justify-content-between align-items-center">
                <p>${days[date.getDay()]}</p> <!-- Display day of the week -->
                <p>${monthNames[date.getMonth()]}</p> <!-- Display month name -->
            </div>
            <div class="name my-3 px-3 fw-semibold">
                ${weatherData.location.name} <!-- Display location name -->
            </div>
            <div class="temp px-3">
                <h1>
                    ${weatherData.current.temp_c}
                    <sup>o</sup>c
                </h1> <!-- Display current temperature -->
            </div>
            <div class="icon p-3">
                <img src="https:${weatherData.current.condition.icon}" alt="icon"> <!-- Display weather icon -->
                <h6>${weatherData.current.condition.text}</h6> <!-- Display weather condition text -->
            </div>
            <div class="property d-flex justify-content-around align-items-center py-4">
                <div>
                    <img src="images/icon-umberella.png" alt="">
                    <span>${weatherData.current.cloud}%</span> <!-- Display cloud percentage -->
                </div>
                <div>
                    <img src="images/icon-wind.png" alt="">
                    <span>${weatherData.current.wind_kph} km/h</span> <!-- Display wind speed -->
                </div>
                <div>
                    <img src="images/icon-compass.png" alt="">
                    <span>${weatherData.current.wind_dir}</span> <!-- Display wind direction -->
                </div>
            </div>
        </div>
    `;

    document.getElementById('pushNow').innerHTML = cartiona; // Insert HTML into specified element
}

// Function to display weather for day 2
function displayDay2(forecastDay) {
    let date = new Date(forecastDay[1].date); // Get date for day 2 from forecast data

    let cartiona = `
        <div class="forecast-day chan-col">
            <div class="forecast-head py-3">
                <p>${days[date.getDay()]}</p> <!-- Display day of the week -->
            </div>
            <div class="temp">
                <img src="https:${forecastDay[1].day.condition.icon}" class="w-25" alt=""> <!-- Display weather icon -->
                <h6>${forecastDay[1].day.maxtemp_c}
                    <sup>o</sup>
                    c
                </h6> <!-- Display maximum temperature -->
            </div>
            <h6>
                ${forecastDay[1].day.mintemp_c}
                <sup>o</sup>
                c
            </h6> <!-- Display minimum temperature -->
            <div class="temp-caption">
                <p>${forecastDay[1].day.condition.text}</p> <!-- Display weather condition text -->
            </div>
        </div>
    `;

    document.getElementById('pushDay2').innerHTML = cartiona; // Insert HTML into specified element
}

// Function to display weather for day 3
function displayDay3(forecastDay) {
    let date = new Date(forecastDay[2].date); // Get date for day 3 from forecast data

    let cartiona = `
        <div class="forecast-day">
            <div class="forecast-head py-3">
                <p>${days[date.getDay()]}</p> <!-- Display day of the week -->
            </div>
            <div class="temp">
                <img src="https:${forecastDay[2].day.condition.icon}" class="w-25" alt=""> <!-- Display weather icon -->
                <h6>${forecastDay[2].day.maxtemp_c}
                    <sup>o</sup>
                    c
                </h6> <!-- Display maximum temperature -->
            </div>
            <h6>
                ${forecastDay[2].day.mintemp_c}
                <sup>o</sup>
                c
            </h6> <!-- Display minimum temperature -->
            <div class="temp-caption">
                <p>${forecastDay[2].day.condition.text}</p> <!-- Display weather condition text -->
            </div>
        </div>
    `;

    document.getElementById('pushDay3').innerHTML = cartiona; // Insert HTML into specified element
}

// Event listener for button click (searchbtn)
searchbtn.addEventListener('click', function() {
    // Get user's current position
    navigator.geolocation.getCurrentPosition(pos => {
        let x = pos.coords.latitude; // Get latitude
        let y = pos.coords.longitude; // Get longitude
        getData(`${x},${y}`); // Fetch weather data based on coordinates
    });
});

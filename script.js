// Select every html element
const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit-btn');
const error = document.querySelector('.error-msg');
//
//
// add the addeventlistener for the form
//
//
form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);
//
//
// handlesubmit function is called when the form is submitted
function handleSubmit(e) {
  e.preventDefault();
  fetchWeather();
}
//
//
// function to get the weather data from the api
//
//
async function getWeatherData(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}`,
    {
      mode: 'cors',
    }
  );
  if (response.status === 400) {
    throwErrorMsg();
  } else {
    error.style.display = 'none';
    const weatherData = await response.json();
    const newData = processData(weatherData);
    displayData(newData);
    reset();
  }
}
//
//
// function if the location is not good
//
//
function throwErrorMsg() {
  error.style.display = 'block';
  if (error.classList.contains('fade-in')) {
    error.style.display = 'none';
    error.classList.remove('fade-in2');
    error.offsetWidth;
    error.classList.add('fade-in');
    error.style.display = 'block';
  } else {
    error.classList.add('fade-in');
  }
}
//
//
// Function for the data from the api i want
//
//
function processData(weatherData) {
  // grab all the data i want to display on the page
  const myData = {
    condition: weatherData.current.condition.text,
    feelsLike: {
      c: Math.round(weatherData.current.feelslike_c),
    },
    currentTemp: {
      c: Math.round(weatherData.current.temp_c),
    },
    wind: Math.round(weatherData.current.wind_mph),
    humidity: weatherData.current.humidity,
    location: weatherData.location.name.toUpperCase(),
  };
  myData['region'] = weatherData.location.country.toUpperCase();

  return myData;
}
//
//
// Function to display the data on the page
//
//
function displayData(newData) {
  const weatherInfo = document.getElementsByClassName('info');
  Array.from(weatherInfo).forEach((div) => {
    if (div.classList.contains('fade-in2')) {
      div.classList.remove('fade-in2');
      div.offsetWidth;
      div.classList.add('fade-in2');
    } else {
      div.classList.add('fade-in2');
    }
  });
  //
  document.querySelector('.condition').textContent = newData.condition;
  //
  document.querySelector(
    '.location'
  ).textContent = `${newData.location}, ${newData.region}`;
  //
  document.querySelector('.degrees').textContent = newData.currentTemp.c;
  //
  document.querySelector(
    '.humidity'
  ).textContent = `Humidity % : ${newData.humidity}`;
  //
  document.querySelector(
    '.wind-mph'
  ).textContent = `Wind speed : ${newData.wind} MPH`;
  //

  document.querySelector(
    '.feels-like'
  ).textContent = `Feels like : ${newData.feelsLike.c}`;
  //
}
//
//
// reset the form after submit
//
//
function reset() {
  form.reset();
}
//
//
// get location from user
//
//
function fetchWeather() {
  const input = document.querySelector('input[type="text"]');
  const userLocation = input.value;
  getWeatherData(userLocation);
}

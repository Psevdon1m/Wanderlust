const createVenueHTML = (name, location, iconSource, photosUrl) => {

  
    return `
    <div class="info-block">
    <h2 class="title">${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.country}</p>
    </div>
    <div class="img-block">
      <img class = "photo" src="${photosUrl}"/>
    </div>`;

};

const createWeatherHTML = (currentDay) => {
  return `<h2>${weekDays[new Date().getDay()]}</h2>
          <h2>Temperature: ${kelvinToCelsius(currentDay.main.temp)}&deg;C</h2>
      <h2>Feels like: ${kelvinToCelsius(currentDay.main.feels_like)}&deg;C</h2>
          <h2>Condition: ${currentDay.weather[0].description}</h2>
      <h2>Wind: ${currentDay.wind.speed}m/s</h2>
      
        <img src="https://openweathermap.org/img/wn/${
          currentDay.weather[0].icon
        }@2x.png">`
      
};

const kelvinToCelsius = (k) => (k - 273.15).toFixed(0);

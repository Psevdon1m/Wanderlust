// Foursquare API Info
const clientId = "3FXR0H1N1GKHKTJJ3N40J0WMWBMRBXOZC3RJTXBDWZVKRD1M";
const clientSecret = "MT52DYQ1KLJU3X0GC0ULHIO2MDKHIMZBQ4CCGME2VJHB2HD2";
const url = "https://api.foursquare.com/v2/venues/explore?near=";
const url2 =
  "https://api.foursquare.com/v2/venues/49eeaf08f964a52078681fe3/photos?";
const venueId = "49eeaf08f964a52078681fe3";

// OpenWeather Info
const openWeatherKey = "87a69c216920ff38f884c4ef0aad5d86";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Page Elements
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//current date
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();

today = `${yyyy}${mm}${dd}`;

//  AJAX functions:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=${today}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();

      const venues = jsonResponse.response.groups[0].items.map(
        (item) => item.venue
      );

      return venues;
    }
  } catch (error) {
    console.log(error);
  }
};

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

const getPhotos = async (venueId) => {
  const url2ToFetch = `https://api.foursquare.com/v2/venues/${venueId}/photos?limit=1&client_id=${clientId}&client_secret=${clientSecret}&v=${today}`;

  try {
    const response = await fetch(url2ToFetch);

    if (response.ok) {
      const jsonResponse = await response.json();

      const rawPhotos =
        jsonResponse.response.photos.items[0].prefix +
        "width320" +
        jsonResponse.response.photos.items[0].suffix;

      return rawPhotos;
    }
  } catch (error) {
    console.log(error);
  }
};

// Render functions
function getRandomNumber(min, max) {
  let step1 = max - min + 1;
  let step2 = Math.random() * step1;
  result = Math.floor(step2) + min;
  return result;
}

function createArrayOfNumebrs(start, end) {
  let myArr = [];
  for (let i = start; i <= end; i++) {
    myArr.push(i);
  }
  return myArr;
}

const renderVenues = (venues) => {
  let numArr = createArrayOfNumebrs(1, venues.length - 1);

  $venueDivs.forEach(($venue) => {
    
    let randomIndex = getRandomNumber(0, numArr.length - 1);
    let randomNumber = numArr[randomIndex];

    let venue = venues[randomNumber];
    numArr.splice(randomIndex, 1);
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;

    let photo = getPhotos(venue.id).then((photosUrl) => {
      let venueContent = createVenueHTML(
        venue.name,
        venue.location,
        venueImgSrc,
        photosUrl
      );
      
      $venue.append(venueContent);
    });
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  

  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

function removeElement(){
  let toRemove = document.getElementById('destination');
  toRemove.parentNode.removeChild(toRemove);
  console.log(toRemove.parentNode)
}


let counter = 0;

const executeSearch = () => {

    $venueDivs.forEach((venue) => venue.empty());
    // $weatherDiv.empty();
    // $destination.empty();
    $container.css("visibility", "visible");
    
    getVenues().then((venues) => {
      $destination.empty();
      return renderVenues(venues);
    });
    getForecast().then((forecast) => {
      $weatherDiv.empty();
      return renderForecast(forecast);
    });
    
    return false;
    
};


$submit.click(executeSearch);

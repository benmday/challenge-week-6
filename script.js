var APIkey = "be09ec00708d3598594b8a670c27e1d8";

var searchInput = $(".search-box").val();
var searchHistory = $(".search");

$("#print-weather").hide();

function weatherSearch() {
  const searchInput = $(".search-box").val();

  const cityConvert = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${APIkey}`;

  fetch(cityConvert)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const lon = data[0].lon;
      const lat = data[0].lat;

      const apiCall = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=${APIkey}&units=imperial`;

      fetch(apiCall)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          for (i = 0; i < 5; i++) {
            const dataList = data.list[i];
            var date = dataList.dt;
            var convertedDate = new Date(date * 1000);
            var icon = dataList.weather[0].icon;
            var temp = dataList.temp.max;
            var wind = dataList.speed;
            var hum = dataList.humidity;

            var weatherResults = $("#print-weather");

            var weatherData = `<div class=results id=card-${i + 1}>
                                        <h5>${convertedDate.toLocaleDateString()}</h5>
                                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" id="weather-img">
                                        <p><strong>Temp: </strong>${temp}°</p>
                                        <p><strong>Wind: </strong>${wind}/mph</p>
                                        <p><strong>Humidity: </strong>${hum}%</p> 
                                    </div>`;

            weatherResults.append(weatherData);
          }

          var cityName = `<h2>${data.city.name} 5-day forecast:</h2>`;
          $("#card-1").prepend(cityName);

          localStorage.setItem(searchInput, JSON.stringify(weatherData));
        });
    });
}

var searchButton = $("#search-button");

searchButton.click(search);

function search(e) {
  e.preventDefault();

  $("#card-1").remove();
  $("#card-2").remove();
  $("#card-3").remove();
  $("#card-4").remove();
  $("#card-5").remove();

  var searchInput = $(".search-box").val();
  var cityButton = $("<button>");

  if (!searchInput) {
    return window.alert("Please enter a city name");
  }

  $("#print-weather").show();

  weatherSearch();

  cityButton
    .text(searchInput)
    .addClass("city-button")
    .attr("id", $(".search-box").val());
  searchHistory.append(cityButton);

  $(".search-box").val("");

  var cityButtonID = $(document.getElementById(searchInput));

  cityButtonID.click(loadData);

  function loadData(e) {
    e.preventDefault();

    var weatherResults = $("#print-weather");

    $("#card-1").remove();
    $("#card-2").remove();
    $("#card-3").remove();
    $("#card-4").remove();
    $("#card-5").remove();

    var cityInfo = JSON.parse(localStorage.getItem(searchInput));

    console.log(cityInfo);

    weatherResults.append(cityInfo);
  }
}

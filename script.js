var APIkey = "be09ec00708d3598594b8a670c27e1d8";
const searchInput = $('.search-box').val();


function weatherSearch(){
    const searchInput = $('.search-box').val();

    const cityConvert = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${APIkey}`;

    fetch(cityConvert)
    .then((response) =>{

        return response.json();
    })
    .then((data) =>{
        console.log(data);

        const lon = data[0].lon;
        const lat = data[0].lat;

        console.log('lat: ' + lat);
        console.log('lon: ' + lon);

        const apiCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;

        fetch(apiCall)
        .then((response) =>{
            return response.json();
        })
        .then((data) =>{
            console.log(data);
        })
    })
}

function printWeather(data) {
   
    for(i=0; i<=40; i+8){
        const dataList = data.list[i];
        const weatherResults = $('#print-weather');
        const weatherData = `<div class=results'>
                                    <h3>${dataList.dt} ${dataList.weather[0].icon}</h3>
                                    <p>Temp: ${dataList.main.temp}</p>
                                    <p>Wind: ${dataList.wind.speed}</p>
                                    <p>Humidity: ${dataList.main.humidity}</p> 
                                </div>`;        

        weatherResults.append(weatherData);
    }

}


var searchButton = $('#search-button');

searchButton.click(search);

function search(e) {
    e.preventDefault();

    weatherSearch();

    const searchInput = $('.search-box').val();
    var searchHistory = $('.search'); 
    var cityButton = $('<button>');

    if(!searchInput){
        return window.alert('Please enter a city name');
    }
    
    cityButton.text(searchInput).addClass('city-button');
    searchHistory.append(cityButton);
    console.log(searchHistory);

    printWeather();
}


var APIkey = "be09ec00708d3598594b8a670c27e1d8";

function weatherSearch(){
    const searchInput = $('.search-box').val();

    const cityConvert = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${APIkey}`

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

var searchButton = $('#search-button');

searchButton.click(search);

function search(e) {
    e.preventDefault();
    console.log('success!')
    weatherSearch();
}



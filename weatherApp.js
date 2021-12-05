window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationA = document.querySelector(".location-timezone");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let degSection = document.querySelector(".degree-section");
    let degSpan = document.querySelector(".degree-section span");
    let tempHumidity = document.querySelector(".temperature-humidity");
    let dayMaxMin = document.querySelector('.temperature-maxmin');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let proxy = 'https://cors-anywhere.herokuapp.com/';
 
            //console.log("https://api.openweathermap.org/data/2.5/weather?lat=43.771815&lon=-79.6838764&appid=17e443ff35a9b00d00d9f98d295acc9f&units=metric");
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=17e443ff35a9b00d00d9f98d295acc9f&units=metric`;
            //console.log(api);
            fetch(api)
                .then(response => { 
                    return response.json();
            })
            .then(data => {
                //console.log(data);
                const {temp} = (data.main);
                const location = data.name;
                const iconNum = data.weather[0].id;
                const humid = data.main.humidity;
                const maxTemp = data.main.temp_max;
                const minTemp = data.main.temp_min;
                const country = data.sys.country;
                const desc = (data.weather[0].description).toUpperCase();
                locationA.textContent = `${location}, ${country}`;
                temperatureDegree.textContent = temp.toFixed(2);
                dayMaxMin.textContent = `MAX: ${maxTemp} ºC MIN: ${minTemp} ºC`;
                tempHumidity.textContent = `HUMIDITY: ${humid}%`;
                console.log(data.weather);
                temperatureDescription.textContent = `${desc}`;

                document.getElementById('myIcon').className = `wi wi-owm-${iconNum}`;


          

                

            });
        });
    }

}); 

    



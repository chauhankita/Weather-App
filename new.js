const apikey = "fc2220b8488e4ddbc65ad77c1afe16fc";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const icon = document.querySelector(".icon");

async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°c";
        document.querySelector("#humidityvalue").textContent = data.main.humidity;
        document.querySelector("#windvalue").textContent = Math.round(data.wind.speed);

        if (data.weather[0].main == "Clouds") {
            icon.src = "cloudy.png"
        }
        else if (data.weather[0].main === "Clear") {
            icon.src = "clear-sk.png"
        }
        else if (data.weather[0].main === "Snow") {
            icon.src = "snowball.png"
        }
        else if (data.weather[0].main === "Rain") {
            icon.src = "rain.png"
        }
        else if (data.weather[0].main === "Mist") {
            icon.src = "mist.png"
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});
searchbox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchbox.value);
    }
});

window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            let temperatureDescription = document.querySelector('.temperature-description');
            let temperatureDegree = document.querySelector('.temperature-degree');
            let locationTimezone = document.querySelector('.location-timezone');
            let weatherIcon = document.querySelector('.weather-icon');
            let temperatureSection = document.querySelector('.degree-section');
            let temperatureSpan = document.querySelector('.degree-section span');

            const appId = "eaeafe9d4353b761a26cffadea969d6c";

            const request = `https://api.openweathermap.org/data/2.5/weather?appid=${appId}&units=metric&lat=${lat}&lon=${lon}`;

            fetch(request)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const temperature = data.main.temp
                    let fahrenheit = temperature * 9 / 5 + 32;
                    const summary = data.weather[0].description;
                    const timezone = `${data.name}/${data.sys.country}`;
                    const icon = data.weather[0].icon;
                    const iconurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                    temperatureDegree.textContent = Math.round(temperature * 10) / 10;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = timezone;
                    weatherIcon.setAttribute("src", iconurl);

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.round(temperature * 10) / 10;
                        } else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.round(fahrenheit * 10) / 10;
                        }
                    });
                });
        });
    }
});
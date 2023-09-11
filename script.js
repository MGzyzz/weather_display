const apiKey = '3a46f5ce778d6bbc4ea04b15b96d846d'
const city = 'almaty'


$(document).ready(function() {
    $('.tab').click(function() {
        const tabName = $(this).data('tab');
        $('.tab-content').hide();
        $(`#${tabName}Tab`).show();

        if (tabName === 'current') {
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            $.ajax({
                url: currentWeatherUrl,
                method: 'GET',
                success: function(currentWeatherData) {
                    console.log(currentWeatherData)
                    const currentTab = $('#currentTab');
                    currentTab.html('<h2 class="mt-5">Текущая погода:</h2>');
                    currentTab.append(`<p>Температура: ${currentWeatherData.main.temp} °C</p>`);
                    currentTab.append(`<p>Влажность: ${currentWeatherData.main.humidity} %</p>`);
                    currentTab.append(`<p>Скорость ветра: ${currentWeatherData.wind.speed} м/с</p>`);
                    currentTab.append(`<p>Давление: ${currentWeatherData.main.pressure} hPa</p>`);
                    currentTab.append(`<p>Видимость: ${currentWeatherData.visibility} м</p>`);
                }
            })
        } else if (tabName === 'forecast') {
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=40`;
            $.ajax({
                url: forecastUrl,
                method: 'GET',
                success: function(forecastData) {
                    const forecastTab = $('#forecastTab');
                    forecastTab.html('<h2 class="mt-5">Прогноз погоды на неделю:</h2>');
                    const dailyForecast = {};
                    forecastData.list.forEach(forecast => {
                        const date = new Date(forecast.dt * 1000);
                        const day = date.getDate();
                        if (!dailyForecast[day]) {
                            dailyForecast[day] = forecast
                        }
                    });

                    for (const day in dailyForecast) {
                        const forecast = dailyForecast[day];
                        const date = new Date(forecast.dt * 1000);
                        const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'long' })
                        forecastTab.append('<hr>')
                        forecastTab.append(`<b>${dayOfWeek}:</b><br> <p>Температура: ${forecast.main.temp} °C`);
                        forecastTab.append(`<p>Влажность: ${forecast.main.humidity} %</p>`);
                        forecastTab.append(`<p>Скорость ветра: ${forecast.wind.speed} м/с</p>`);
                        forecastTab.append(`<p>Давление: ${forecast.main.pressure} hPa</p>`);
                        forecastTab.append(`<p>Видимость: ${forecast.visibility} м</p>`);
                    }
                }
            })
        }
    })
    $('.tab[data-tab="current"]').click();
})
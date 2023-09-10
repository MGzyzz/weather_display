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
                    const currentTab = $('#currentTab');
                    currentTab.html('<h2 class="mt-5">Текущая погода:</h2>');
                    currentTab.append(`<p>Температура: ${currentWeatherData.main.temp} °C</p>`);
                    currentTab.append(`<p>Влажность: ${currentWeatherData.main.humidity} %</p>`);
                    currentTab.append(`<p>Скорость ветра: ${currentWeatherData.wind.speed} м/с</p>`);
                }
            })
        } else if (tabName === 'forecast') {
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=40`;
            $.ajax({
                url: forecastUrl,
                method: 'GET',
                success: function(currentWeatherData) {
                    const currentTab = $('#forecastTab');
                    currentTab.html('<h2 class="mt-5">Прогноз погоды на неделю:</h2>');

                }
            })
        }
    })
})
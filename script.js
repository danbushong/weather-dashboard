


//what will happen when the page loads
$(document).ready(function () {

    function show(data) {
        




    }
    function showUV(data) {




    }
    function displayCities(data) {




    }
    function showForecast(data) {
        var forecast = data.list;



        var currentForecast = [];
        for (var i = 0; i < forecast.length; i++) {

            var currentObject = forecast[i];
            

            var dt_time = currentObject.dt_txt.split(' ')[1]

            if (dt_time === "12:00:00") {
                
                var main = currentObject.main;
                
                var temp = main.temp; 
                var humidity = main.humidity;
                var date = moment(currentObject.dt_txt).format('l'); 
                var icon = currentObject.weather[0].icon;
                var iconurl = "https://openweathermap.org/img/w/" + icon + ".png";

                let htmlTemplate = `
            <div class="col-sm currentCondition">
            <div class="card">
                <div class="card-body 5-day">
                    <p><strong>${date}</strong></p>
                    <div><img src=${iconurl} /></div>
                    <p>Temp: ${temp} °F</p>
                    <p>Humidity: ${humidity}%</p>
                </div>
            </div> 
        </div>`;
                currentForecast.push(htmlTemplate);
            }

        }
        $("#5-day-forecast").html(currentForecast.join(''));

    }








    //stored list on the side
    var localStored = localStorage.getItem("cityList");
    //if something is stored display it
    if (stored) {
        cityList = JSON.parse(stored)
    } else {
        cityList = []
    }

    //what happens when submit/search gets clicked
    $('#submitCity').click(function (event) {
        //stop it from submitting the page and reloading
        event.preventDefault();

        var city = $('#city').val();

        cityList.push(city);

        localStorage.setItem("cityList", JSON.stringify(cityList));

        displayCities(cityList);
    });

    if (city != "") {
        $.ajax({
            url: "api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=fd591006a7dae5562993f7f902a78b07",
            type: "GET",
            success: function (data) {
                var display = showForecast(data);
                $("#show").html(display);


            }

        })
        $.ajax({
            url: "api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=fd591006a7dae5562993f7f902a78b07",
            type: "GET",
            success: function (data) {
                var forecastDisplay = showForcast(data)


            }

        })
        $.ajax({
            url: "api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=fd591006a7dae5562993f7f902a78b07",
            type: "GET",
            success: function (data) {
                var forecastDisplay = showForcast(data)


            }

        })
    }









});



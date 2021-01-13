$(document).ready(function () {

    $(".h3").hide();
    $(".card").hide();

    // FUNCTIONS
    function show(data) {
        return "<h2>" + data.name + moment().format(' (MM/DD/YYYY)') + "</h2>" +
            `
        <p><strong>Temperature</strong>: ${data.main.temp} °F</p>
        <p><strong>Humidity</strong>: ${data.main.humidity}%</p>
        <p><strong>Wind Speed</strong>: ${data.wind.speed} MPH</p>
        `
    }


    function displayCities(cityList) {

        $('.city-list').empty();
        var list = localStorage.getItem("cityList");
        cityList = (JSON.parse(list));

        // add a new div to fit how many things are in local storage
        if (list) {
            for (var i = 0; i < cityList.length; i++) {
                var container = $("<button class=historyButton name=" + cityList[i] + ">" + cityList[i] + "</button>").click(function (event) {




                })
                //add to the top of list
                $('.city-list').prepend(container);
            }
            //this will make it so if a past location is clicked it will load the info for it using the text of the button
            $(".historyButton").on("click", function (event) {
                event.preventDefault();
                $(".h3").show();
                $(".card").show();

                //changes every button to say the text of the button clicked
                var city = $(this).text();
 

                if (city != '') {
                    //display current city information
                    $.ajax({
                        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&appid=fd591006a7dae5562993f7f902a78b07",
                        type: "GET",
                        success: function (data) {
                            var display = show(data);
                            $("#show").html(display);
                        }
                    });
                    //display 5 day forcast information
                    $.ajax({
                        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial" + "&appid=fd591006a7dae5562993f7f902a78b07",
                        type: "GET",
                        success: function (data) {
                            showForecast(data)

                        }
                    });


                } else {
                    $('#error').html('Please insert a city name:');
                }


            })


        }
    }



    //brings in all the data about austin
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
            <div class="badge">
                <div class="badge-body 5-day">
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


    //add stored to the page 
    var stored = localStorage.getItem("cityList")


    if (stored) {
        //load past searched cities
        cityList = JSON.parse(stored)

    }
    else {
        cityList = []
    }





    //puts it into the city list and then display current city and 5 day forcast
    $('#submitCity').click(function (event) {
        event.preventDefault();
        $(".h3").show();
        $(".card").show();
        //this is where the value of city gets stored in order to search the data
        var city = $('#city').val();

        cityList.push(city);

        localStorage.setItem("cityList", JSON.stringify(cityList));

        displayCities(cityList);

        if (city != '') {
            //display current city information
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&appid=fd591006a7dae5562993f7f902a78b07",
                type: "GET",
                success: function (data) {
                    var display = show(data);
                    $("#show").html(display);
                }
            });
            //display 5 day forcast information
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial" + "&appid=fd591006a7dae5562993f7f902a78b07",
                type: "GET",
                success: function (data) {
                    var forecastDisplay = showForecast(data)

                }
            });


        } else {
            $('#error').html('Please insert a city name:');
        }
    });

    displayCities(cityList);

});
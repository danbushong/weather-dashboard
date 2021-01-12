


//what will happen when the page loads
$(document).ready(function () {

    function show(data) {




    }
    function showUV(data) {




    }
    function displayCities(data) {




    }
    function showForecast(data) {






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
    
    if(city != ""){
        $.ajax({
            url: "api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial"+"&appid=fd591006a7dae5562993f7f902a78b07",
            type: "GET",
            success: function (data){
                var display = showForecast(data);
                


            }

        })
        $.ajax({
            url: "api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial"+"&appid=fd591006a7dae5562993f7f902a78b07",
            type: "GET",
            success: function (data){
                var forecastDisplay = showForcast(data)

            }
            
        })
        $.ajax({
            url: "api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial"+"&appid=fd591006a7dae5562993f7f902a78b07",
            type: "GET",
            success: function (data){
                var forecastDisplay = showForcast(data)


            }
            
        })
    }









});



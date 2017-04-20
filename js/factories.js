app.factory("jokeAPI", function($http){
  return {
    getData: function(){
      return $http.get("https://api.chucknorris.io/jokes/random")   
    }  
  };
});

app.factory("quoteAPI", function($http){
  var apiurl = "http://quotes.stormconsultancy.co.uk/random.json";
  return {
    getData: function(){
      return $http.get("http://quotes.stormconsultancy.co.uk/random.json")   
    }  
  };
});

app.factory("weatherAPI", function($http, $rootScope){
  return {
    getData: function(){
      return $http.get("http://api.openweathermap.org/data/2.5/weather?q="+$rootScope.city+"&appid=f4ef0931edd7df0498dd3b62d27c0ff6&units=metric")
      /*.then(function(response){
				$rootScope.des = response.data.weather[0].description.toUpperCase();
				var appendWeather = '<span class="white">'+ "Temperature in "+response.data.name+": " +'</span><br>'+' '+response.data.main.temp+'&deg;C <br>'+$rootScope.des+'<br>';
				$("#appendhere").append(appendWeather);
			}, function(error){
				var err = error.status===-1 ? "CORS issue." : "Error.";
				var appendWeather = '<span class="white">Error!:</span><br>'+' '+err+'<br>';
				$("#appendhere").append(appendWeather);
			});  */
    }  
  };
});
app.factory("jokeAPI", function($http){
  var apiurl = "https://api.chucknorris.io/jokes/random";
  return {
    getData: function(){
      $http.get(apiurl)
      .then(function(response){
		$("#appendhere").append(response.data.value+"<br>");
      }, function(error){
				console.log(error);
				var appendError = '<span class="white">Error!</span><br>';
				$("#appendhere").append(appendError);
			});    
    }  
  };
});

app.factory("quoteAPI", function($http){
  var apiurl = "http://quotes.stormconsultancy.co.uk/random.json";
  return {
    getData: function(){
      $http.get(apiurl)
      .then(function(response){
      	console.log(response);
		$("#appendhere").append(response.data.quote+" <br>-"+response.data.author+"<br>");
      }, function(error){
				console.log(error);
				var appendError = '<span class="white">Error!</span><br>';
				$("#appendhere").append(appendError);
			});    
    }  
  };
});

app.factory("weatherAPI", function($http, $rootScope){
  return {
    getData: function(){
      $http.get("http://api.openweathermap.org/data/2.5/weather?q="+$rootScope.city+"&appid=f4ef0931edd7df0498dd3b62d27c0ff6&units=metric")
      .then(function(response){
				$rootScope.des = response.data.weather[0].description.toUpperCase();
				var appendWeather = '<span class="white">'+ "Temperature in "+response.data.name+": " +'</span><br>'+' '+response.data.main.temp+'&deg;C <br>'+$rootScope.des+'<br>';
				$("#appendhere").append(appendWeather);
			}, function(error){
				var err = error.status===-1 ? "CORS issue." : "Error.";
				var appendWeather = '<span class="white">Error!:</span><br>'+' '+err+'<br>';
				$("#appendhere").append(appendWeather);
			});  
    }  
  };
});
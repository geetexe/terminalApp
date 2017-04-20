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
    }  
  };
});
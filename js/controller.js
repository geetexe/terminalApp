app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {
            if(event.which === 13) {
            	$(".window").animate({ scrollTop: $("#scr").height() }, 1000);
                scope.$apply(function(){
                	scope.UP = 0;
                	if(!scope.userInput==''){scope.historyLength++;}
                	if(scope.historyLength)
                		scope.targetInd = scope.historyLength - 1;
                	else
                		scope.targetInd = 0;
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            if(event.which === 38 || event.which === 40) {
	            	var ev = event.which===38?'UP':'DOWN';
	            	console.log("Event: "+ev);
	            	$(".window").animate({ scrollTop: $("#scr").height() }, 1000);
	                scope.$apply(function (){
	                	var arr = [];
	                	arr = scope.history;
	                    if(ev=='UP')
	                    {
	                    	if(scope.targetInd>-1)
	                    		scope.userInput = scope.history[scope.targetInd];
	                    	else
	                    		scope.userInput = scope.history[0];
	                    	scope.targetInd -= 1;
	                    	if(scope.targetInd < 0)
	                    		scope.targetInd = 0;		                    
		                    scope.UP = 1;	                    	
	                    }
	                    else
	                    {
	                    	if(scope.UP)
	                    	{
		                    	scope.targetInd  += 1;
		                    	if(scope.targetInd >= scope.historyLength)
		                    		scope.targetInd = scope.historyLength-1;
		                    	scope.userInput = scope.history[scope.targetInd];	                    		
	                    	}
	                    }	                    
	                });
	                event.preventDefault();
	                event.stopImmediatePropagation();          		
            }
        });
    };
});

app.controller("theader", function($scope){
	$scope.initHead = function(){
		$(".sidebar").toggleClass("active");
		$(".anim").toggleClass("click");
	}
});

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

app.controller("terminalController", function($scope,$http, jokeAPI, weatherAPI, $rootScope, quoteAPI){
	$scope.UP = 0;
	$scope.busy = 0;
	$scope.toggling = 0;
	$scope.history = [];
	$scope.historyLength = $scope.history.length;
	$scope.processInput = function()
	{
		if($scope.userInput == 'sudo joke'){
			$scope.busy=1;
			jokeAPI.getData();
		}
		if($scope.userInput == 'sudo quote'){
			$scope.busy=1;
			quoteAPI.getData();
		}
		if($scope.userInput!='')
			$scope.history.push($scope.userInput);
		if($scope.userInput === undefined)
			$scope.userInput = '';
		var appendthis = '<span class="console-user">geet</span><span>@</span><span class="red">w4rm4chn13:</span>'+' '+$scope.userInput+'<br>';
		$("#appendhere").append(appendthis);
		if($scope.userInput.indexOf("weather")>-1){
			var cin = ("sudo weather ").length;
			$rootScope.city = $scope.userInput.slice(cin,$scope.userInput.length);
			$scope.userInput = '';
			$scope.busy = 1;
			weatherAPI.getData();
		}
		if($scope.userInput.indexOf("flip")>-1){
			$scope.busy = 1;
			var startIndex = ("sudo flip ").length;
			var endIndex = $scope.userInput.length;
			var degrees = $scope.userInput.slice(startIndex,endIndex);
			var deg = Number(degrees);
			var c = "rotateY(" +deg+ "deg)";
			$("#scr").css("transform",c);
			var appendThis = '<span class="white">Rotated by </span><br>'+' '+deg+'<br>';
			$("#appendhere").append(appendThis);
		}
		if($scope.userInput == "whoami"){
			$scope.busy = 1;
			var appendId = '<span class="white">You\'re '+'Geet.</span><br>';
			$("#appendhere").append(appendId);
		}
		var bg = [
			"http://s1.picswalls.com/wallpapers/2015/09/20/beautiful-hd-wallpaper-2015_111526537_269.jpg",
			"https://s-media-cache-ak0.pinimg.com/originals/25/b7/f3/25b7f3b7fb56e6d0f457a1f02eb88782.jpg",
			"https://wallpprs.media/preview/negative-space_wallpprs.com_.jpg",
			"http://www.hdwallpapers.in/walls/amanda_seyfried_7-wide.jpg",
			"http://wallpaperclicker.com/storage/wallpaper/Beautiful-American-Hollywood-Actress-Anne-Hathaway-in-Blue-Dress-on-Sofa-HD-Photos-80766344.jpg",
			"http://wallpapercave.com/wp/AUMdHwh.jpg",
			"/images/bg.jpg"
		];
		if($scope.userInput == "sudo change bg"){
			$scope.busy = 1;
			var rnd = Math.floor((Math.random() * bg.length) + 1);
			if(rnd == bg.length)
				rnd = 0;
			$('.bg').css('background', 'url('+bg[rnd]+')');
			var appendId = '<span class="white">Background changed.</span><br>';
			$("#appendhere").append(appendId);
		}
		if($scope.userInput == "sudo blackout"){
			$scope.toggling++;
			var st = $scope.toggling%2==0? ' removed.':' applied.';
			$(".contain").toggleClass("vmc");
			
			var appendStat = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">Blackout'+' '+st+'</span><br>';
				$("#appendhere").append(appendStat);
			$scope.busy = 1;
		}
		if($scope.userInput == "help"){
			var sudohelp = "<span>sudo joke</span><br/><span>sudo change bg</span><br/><span>sudo blackout</span><br/><span>sudo weather [city]</span><span><br/><span>sudo flip [degrees (only digits)]</span><br/>";
			var appendStat = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">You can issue the following commands to the terminal:</span><br>'+sudohelp;
				$("#appendhere").append(appendStat);
			$scope.busy = 1;
		}
		else{
			if(!$scope.busy)
			{
				$scope.s1 = "Invalid command. Type 'help' for more info."
				var appenderror = '<span class="red">w4rm4chn13:</span>'+' '+$scope.s1+'<br>';
					$("#appendhere").append(appenderror);
			}
		}
		$scope.busy = 0;
		$scope.userInput= '';
	}
	
});

app.controller("sidemenucontroller", function($scope){
	$scope.logg = function(){
		$(".sidebar").toggleClass("active");
		$(".anim").toggleClass("click");
	}
});

app.controller("newController", function($scope){
	$scope.rating1 = '';
	var x = 0;
	var rating = 0;
	$(".rating > span").hover(function(){
		x = target.attr('class');
		$("#stat").text( x );
	});
	$(".rating").mouseleave(function(){
		if(!rating)
			x=0;
		$("#stat").text( '' );
	});

	$scope.statUpdate = function($event){
		$scope.rating1 = $event.path[0].className;
	}

	$scope.rate = function($event){
		var target = angular.element($event.currentTarget);
		rating = target.attr('class');
		target.css("color", "red");
		$('.'+rating).nextAll("span").css("color", "red");
		$('.'+rating).prevAll("span").css("color", "#000");
		$("#rating").text( "You've rated: "+rating );
		var w = rating*20 + "%";
		$(".progress").width(w);
		$(".cent").text(w);
	}
	
});

app.controller("myController", function($scope){
	$scope.name = 'Geet'
});